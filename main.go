package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"

	"cloud.google.com/go/firestore"

	"github.com/jhump/protoreflect/desc/protoprint"
	"github.com/jhump/protoreflect/dynamic"
	"google.golang.org/grpc"

	firebase "firebase.google.com/go"
)

type emptyServerInterface interface {
}

func main() {
	ctx := context.Background()

	// Generate the schema and gRPC types based on schema.json
	_, services, fileBuilder, fileDesc, schema, _, kindNameMap, messageMap, watchTypeEnumValues, err := generate()
	if err != nil {
		log.Fatalln(err)
	}

	// Emit the testclient protobuf specification
	printer := new(protoprint.Printer)
	protoFile, err := os.Create("testclient/testclient.proto")
	if err != nil {
		log.Fatalln(err)
	}
	defer protoFile.Close()
	fmt.Println("writing testclient/testclient.proto...")
	err = printer.PrintProtoFile(fileDesc, protoFile)
	if err != nil {
		log.Fatalln(err)
	}

	// Connect to Firestore using Application Default Credentials
	conf := &firebase.Config{ProjectID: os.Getenv("GOOGLE_CLOUD_PROJECT_ID")}
	app, err := firebase.NewApp(ctx, conf)
	if err != nil {
		log.Fatalln(err)
	}
	client, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}
	defer client.Close()

	// Serve the configstore gRPC server
	lis, err := net.Listen("tcp", ":13389")
	if err != nil {
		log.Fatalln(err)
	}
	grpcServer := grpc.NewServer()
	emptyServer := new(emptyServerInterface)
	for _, service := range services {
		// kindSchema := kindMap[service]
		kindName := kindNameMap[service]

		grpcServer.RegisterService(
			&grpc.ServiceDesc{
				ServiceName: fmt.Sprintf("%s.%s", schema.Name, service.GetName()),
				HandlerType: (*emptyServerInterface)(nil),
				Methods: []grpc.MethodDesc{
					{
						MethodName: "List",
						Handler: func(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
							messageFactory := dynamic.NewMessageFactoryWithDefaults()

							requestMessageDescriptor := messageMap[fmt.Sprintf("List%sRequest", kindName)]
							in := messageFactory.NewDynamicMessage(requestMessageDescriptor)
							if err := dec(in); err != nil {
								return nil, err
							}

							startBytes, err := in.TryGetFieldByName("start")
							if err != nil {
								return nil, err
							}
							limit, err := in.TryGetFieldByName("limit")
							if err != nil {
								return nil, err
							}

							if limit.(uint32) == 0 {
								return nil, fmt.Errorf("limit must be greater than 0, or omitted")
							}

							var start interface{}
							if startBytes != nil {
								if len(startBytes.([]byte)[:]) > 0 {
									start = string(startBytes.([]byte)[:])
								}
							}

							var snapshots []*firestore.DocumentSnapshot
							if limit == nil && start == nil {
								snapshots, err = client.Collection(kindName).Documents(ctx).GetAll()
							} else if limit == nil {
								ref := client.Doc(start.(string))
								snapshots, err = client.Collection(kindName).OrderBy(firestore.DocumentID, firestore.Asc).StartAfter(ref.ID).Documents(ctx).GetAll()
							} else if start == nil {
								snapshots, err = client.Collection(kindName).Limit(int(limit.(uint32))).Documents(ctx).GetAll()
							} else {
								ref := client.Doc(start.(string))
								snapshots, err = client.Collection(kindName).OrderBy(firestore.DocumentID, firestore.Asc).StartAfter(ref.ID).Limit(int(limit.(uint32))).Documents(ctx).GetAll()
							}

							if err != nil {
								return nil, err
							}

							var entities []*dynamic.Message
							for _, snapshot := range snapshots {
								entity, err := convertSnapshotToDynamicMessage(
									messageFactory,
									messageMap[kindName],
									snapshot,
								)
								if err != nil {
									return nil, err
								}
								entities = append(entities, entity)
							}

							responseMessageDescriptor := messageMap[fmt.Sprintf("List%sResponse", kindName)]
							out := messageFactory.NewDynamicMessage(responseMessageDescriptor)
							out.SetFieldByName("entities", entities)

							if limit != nil {
								if uint32(len(entities)) < limit.(uint32) {
									out.SetFieldByName("moreResults", false)
								} else {
									// TODO: query to see if there really are more results, to make this behave like datastore
									out.SetFieldByName("moreResults", true)
									last := snapshots[len(snapshots)-1]
									out.SetFieldByName("next", []byte(last.Ref.Path))
								}
							} else {
								out.SetFieldByName("moreResults", false)
							}

							return out, nil
						},
					},
					{
						MethodName: "Get",
						Handler: func(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
							messageFactory := dynamic.NewMessageFactoryWithDefaults()

							requestMessageDescriptor := messageMap[fmt.Sprintf("Get%sRequest", kindName)]
							in := messageFactory.NewDynamicMessage(requestMessageDescriptor)
							if err := dec(in); err != nil {
								return nil, err
							}

							id, err := in.TryGetFieldByName("id")
							if err != nil {
								return nil, err
							}

							snapshot, err := client.Collection(kindName).Doc(id.(string)).Get(ctx)
							if err != nil {
								return nil, err
							}

							entity, err := convertSnapshotToDynamicMessage(
								messageFactory,
								messageMap[kindName],
								snapshot,
							)
							if err != nil {
								return nil, err
							}

							responseMessageDescriptor := messageMap[fmt.Sprintf("Get%sResponse", kindName)]
							out := messageFactory.NewDynamicMessage(responseMessageDescriptor)
							out.SetFieldByName("entity", entity)

							return out, nil
						},
					},
					{
						MethodName: "Update",
						Handler: func(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
							messageFactory := dynamic.NewMessageFactoryWithDefaults()

							requestMessageDescriptor := messageMap[fmt.Sprintf("Update%sRequest", kindName)]
							in := messageFactory.NewDynamicMessage(requestMessageDescriptor)
							if err := dec(in); err != nil {
								return nil, err
							}

							entity, err := in.TryGetFieldByName("entity")
							if err != nil {
								return nil, err
							}

							if entity == nil {
								return nil, fmt.Errorf("entity must not be nil")
							}

							id, data, err := convertDynamicMessageIntoIDAndDataMap(
								messageFactory,
								messageMap[kindName],
								entity.(*dynamic.Message),
							)

							if id == "" {
								return nil, fmt.Errorf("entity must be set")
							}

							_, err = client.Collection(kindName).Doc(id).Set(ctx, data)
							if err != nil {
								return nil, err
							}

							responseMessageDescriptor := messageMap[fmt.Sprintf("Update%sResponse", kindName)]
							out := messageFactory.NewDynamicMessage(responseMessageDescriptor)
							out.SetFieldByName("entity", entity)

							return out, nil
						},
					},
					{
						MethodName: "Create",
						Handler: func(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
							messageFactory := dynamic.NewMessageFactoryWithDefaults()

							requestMessageDescriptor := messageMap[fmt.Sprintf("Create%sRequest", kindName)]
							in := messageFactory.NewDynamicMessage(requestMessageDescriptor)
							if err := dec(in); err != nil {
								return nil, err
							}

							entity, err := in.TryGetFieldByName("entity")
							if err != nil {
								return nil, err
							}

							if entity == nil {
								return nil, fmt.Errorf("entity must not be nil")
							}

							id, data, err := convertDynamicMessageIntoIDAndDataMap(
								messageFactory,
								messageMap[kindName],
								entity.(*dynamic.Message),
							)

							if id != "" {
								return nil, fmt.Errorf("entity must be nil / empty / unset")
							}

							ref, _, err := client.Collection(kindName).Add(ctx, data)
							if err != nil {
								return nil, err
							}

							// set the ID back
							entity.(*dynamic.Message).SetFieldByName("id", ref.ID)

							responseMessageDescriptor := messageMap[fmt.Sprintf("Create%sResponse", kindName)]
							out := messageFactory.NewDynamicMessage(responseMessageDescriptor)
							out.SetFieldByName("entity", entity)

							return out, nil
						},
					},
					{
						MethodName: "Delete",
						Handler: func(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
							messageFactory := dynamic.NewMessageFactoryWithDefaults()

							requestMessageDescriptor := messageMap[fmt.Sprintf("Delete%sRequest", kindName)]
							in := messageFactory.NewDynamicMessage(requestMessageDescriptor)
							if err := dec(in); err != nil {
								return nil, err
							}

							id, err := in.TryGetFieldByName("id")
							if err != nil {
								return nil, err
							}

							snapshot, err := client.Collection(kindName).Doc(id.(string)).Get(ctx)
							if err != nil {
								return nil, err
							}

							entity, err := convertSnapshotToDynamicMessage(
								messageFactory,
								messageMap[kindName],
								snapshot,
							)
							if err != nil {
								return nil, err
							}

							_, err = client.Collection(kindName).Doc(id.(string)).Delete(ctx)
							if err != nil {
								return nil, err
							}

							responseMessageDescriptor := messageMap[fmt.Sprintf("Delete%sResponse", kindName)]
							out := messageFactory.NewDynamicMessage(responseMessageDescriptor)
							out.SetFieldByName("entity", entity)

							return out, nil
						},
					},
				},
				Streams: []grpc.StreamDesc{
					{
						StreamName:    "Watch",
						ServerStreams: true,
						ClientStreams: false,
						Handler: func(srv interface{}, stream grpc.ServerStream) error {
							messageFactory := dynamic.NewMessageFactoryWithDefaults()

							snapshots := client.Collection(kindName).Snapshots(ctx)
							for true {
								snapshot, err := snapshots.Next()
								if err != nil {
									return err
								}
								for _, change := range snapshot.Changes {
									entity, err := convertSnapshotToDynamicMessage(
										messageFactory,
										messageMap[kindName],
										change.Doc,
									)
									if err != nil {
										return err
									}

									responseMessageDescriptor := messageMap[fmt.Sprintf("Watch%sEvent", kindName)]
									out := messageFactory.NewDynamicMessage(responseMessageDescriptor)
									switch change.Kind {
									case firestore.DocumentAdded:
										out.SetFieldByName("type", watchTypeEnumValues.Created.GetNumber())
									case firestore.DocumentModified:
										out.SetFieldByName("type", watchTypeEnumValues.Updated.GetNumber())
									case firestore.DocumentRemoved:
										out.SetFieldByName("type", watchTypeEnumValues.Deleted.GetNumber())
									}
									out.SetFieldByName("entity", entity)
									out.SetFieldByName("oldIndex", change.OldIndex)
									out.SetFieldByName("newIndex", change.NewIndex)

									stream.SendMsg(out)
								}
							}

							return nil
						},
					},
				},
				Metadata: fileBuilder.GetName(),
			},
			emptyServer,
		)
	}
	fmt.Println("running server on port 13389...")
	grpcServer.Serve(lis)
}
