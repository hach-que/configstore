package main

import (
	"fmt"
	"reflect"
	"time"

	dpb "github.com/golang/protobuf/protoc-gen-go/descriptor"
	"github.com/jhump/protoreflect/desc"
	"github.com/jhump/protoreflect/dynamic"

	"cloud.google.com/go/firestore"
)

func getTopLevelParent(ref *firestore.DocumentRef) *firestore.CollectionRef {
	var lastCollection *firestore.CollectionRef
	for ref != nil {
		lastCollection = ref.Parent
		ref = lastCollection.Parent
	}
	return lastCollection
}

func convertDocumentRefToKey(
	messageFactory *dynamic.MessageFactory,
	ref *firestore.DocumentRef,
	common *commonMessageDescriptors,
) (*dynamic.Message, error) {
	lastCollection := getTopLevelParent(ref)
	if lastCollection == nil {
		return nil, fmt.Errorf("ref has no top level parent")
	}

	partitionID := messageFactory.NewDynamicMessage(common.PartitionId)
	partitionID.SetFieldByName("namespace", lastCollection.Path[0:(len(lastCollection.Path)-len(lastCollection.ID)-1)])

	var reversePaths []*dynamic.Message
	for ref != nil {
		pathElement := messageFactory.NewDynamicMessage(common.PathElement)
		pathElement.SetFieldByName("kind", ref.Parent.ID)
		pathElement.SetFieldByName("name", ref.ID)

		reversePaths = append(reversePaths, pathElement)

		ref = ref.Parent.Parent
	}

	var paths []*dynamic.Message
	for i := len(reversePaths) - 1; i >= 0; i-- {
		paths = append(paths, reversePaths[i])
	}

	key := messageFactory.NewDynamicMessage(common.Key)
	key.SetFieldByName("partitionId", partitionID)
	key.SetFieldByName("path", paths)

	return key, nil
}

func convertKeyToDocumentRef(
	client *firestore.Client,
	key *dynamic.Message,
) (*firestore.DocumentRef, error) {
	partitionID := key.GetFieldByName("partitionId")
	namespaceRaw := partitionID.(*dynamic.Message).GetFieldByName("namespace")
	namespace := namespaceRaw.(string)

	firestoreTestCollection := client.Collection("Test")
	firestoreNamespace := firestoreTestCollection.Path[0:(len(firestoreTestCollection.Path) - len(firestoreTestCollection.ID) - 1)]

	if namespace == "" {
		namespace = firestoreNamespace
	}
	if namespace != firestoreNamespace {
		return nil, fmt.Errorf("namespace must be either omitted, or match '%s' for this Firestore-backed entity", firestoreNamespace)
	}

	pathsRaw := key.GetFieldByName("path")
	pathsArray, ok := pathsRaw.([]interface{})
	if !ok {
		return nil, fmt.Errorf("key path is not expected array of path elements")
	}
	var paths []*dynamic.Message
	for idx, e := range pathsArray {
		pe, ok := e.(*dynamic.Message)
		if !ok {
			return nil, fmt.Errorf("key path is not expected array of path elements (element %d)", idx)
		} else {
			paths = append(paths, pe)
		}
	}

	var ref *firestore.DocumentRef
	for _, pathElement := range paths {
		if ref == nil {
			ref = client.Collection(pathElement.GetFieldByName("kind").(string)).
				Doc(pathElement.GetFieldByName("name").(string))
		} else {
			ref = ref.Collection(pathElement.GetFieldByName("kind").(string)).
				Doc(pathElement.GetFieldByName("name").(string))
		}
	}
	if ref == nil {
		return nil, fmt.Errorf("inbound key did not contain any path components: namespace '%s'", namespace)
	}

	return ref, nil
}

func convertDocumentRefToMetaKey(
	ref *firestore.DocumentRef,
) (*Key, error) {
	lastCollection := getTopLevelParent(ref)
	if lastCollection == nil {
		return nil, fmt.Errorf("ref has no top level parent")
	}

	partitionID := &PartitionId{
		Namespace: lastCollection.Path[0:(len(lastCollection.Path) - len(lastCollection.ID) - 1)],
	}

	var reversePaths []*PathElement
	for ref != nil {
		pathElement := &PathElement{
			Kind: ref.Parent.ID,
			IdType: &PathElement_Name{
				Name: ref.ID,
			},
		}

		reversePaths = append(reversePaths, pathElement)
		ref = ref.Parent.Parent
	}

	var paths []*PathElement
	for i := len(reversePaths) - 1; i >= 0; i-- {
		paths = append(paths, reversePaths[i])
	}

	return &Key{
		PartitionId: partitionID,
		Path:        paths,
	}, nil
}

func convertMetaKeyToDocumentRef(
	client *firestore.Client,
	key *Key,
) (*firestore.DocumentRef, error) {
	if key == nil || key.PartitionId == nil {
		return nil, fmt.Errorf("key or key partition ID is nil; if the caller wants to allow nil keys, it must check to see if the input key is nil first")
	}

	namespace := key.PartitionId.Namespace

	firestoreTestCollection := client.Collection("Test")
	firestoreNamespace := firestoreTestCollection.Path[0:(len(firestoreTestCollection.Path) - len(firestoreTestCollection.ID) - 1)]

	if namespace == "" {
		namespace = firestoreNamespace
	}
	if namespace != firestoreNamespace {
		return nil, fmt.Errorf("namespace must be either omitted, or match '%s' for this Firestore-backed entity", firestoreNamespace)
	}

	var ref *firestore.DocumentRef
	for _, pathElement := range key.Path {
		if ref == nil {
			ref = client.Collection(pathElement.Kind).
				Doc(pathElement.GetName())
		} else {
			ref = ref.Collection(pathElement.Kind).
				Doc(pathElement.GetName())
		}
	}
	if ref == nil {
		return nil, fmt.Errorf("inbound key did not contain any path components: namespace '%s'", namespace)
	}

	return ref, nil
}

func convertSnapshotToDynamicMessage(
	messageFactory *dynamic.MessageFactory,
	messageDescriptor *desc.MessageDescriptor,
	snapshot *firestore.DocumentSnapshot,
	common *commonMessageDescriptors,
) (*dynamic.Message, error) {
	key, err := convertDocumentRefToKey(
		messageFactory,
		snapshot.Ref,
		common,
	)
	if err != nil {
		return nil, err
	}

	out := messageFactory.NewDynamicMessage(messageDescriptor)
	out.SetFieldByName("key", key)

	for name, value := range snapshot.Data() {
		fd := out.FindFieldDescriptorByName(name)
		if fd == nil {
			// extra data not specified in the schema any more
			// we can safely ignore this
			continue
		}

		var err error
		if value == nil {
			out.TryClearFieldByName(name)
		} else {
			if fd.GetType() == dpb.FieldDescriptorProto_TYPE_UINT64 {
				// these are stored as int64 in firestore, as firestore
				// does not support uint64 natively
				switch value.(type) {
				case int64:
					err = out.TrySetFieldByName(name, uint64(value.(int64)))
					break
				default:
					err = fmt.Errorf("unexpected firestore value for uint64 field")
					break
				}
			} else if fd.GetType() == dpb.FieldDescriptorProto_TYPE_MESSAGE {
				switch fd.GetMessageType().GetName() {
				case "Key":
					switch value.(type) {
					case *firestore.DocumentRef:
						key, err := convertDocumentRefToKey(
							messageFactory,
							value.(*firestore.DocumentRef),
							common,
						)
						if err == nil {
							err = out.TrySetFieldByName(name, key)
						}
						break
					default:
						err = fmt.Errorf("expected key in Firestore for key type, but got something else")
						break
					}
					break
				case "Timestamp":
					switch value.(type) {
					case time.Time:
						timestampMessage := messageFactory.NewDynamicMessage(common.Timestamp)
						timestampMessage.SetFieldByName("seconds", int64(value.(time.Time).Unix()))
						timestampMessage.SetFieldByName("nanos", int32(value.(time.Time).Nanosecond()))
						err = out.TrySetFieldByName(name, timestampMessage)
						break
					default:
						err = fmt.Errorf("expected timestamp in Firestore for timestamp type, but got something else")
						break
					}
					break
				default:
					err = out.TrySetFieldByName(name, value)
					break
				}
			} else {
				err = out.TrySetFieldByName(name, value)
			}
		}

		if err != nil {
			fmt.Printf("warning: encountered error while retrieving data from field '%s' on entity of kind '%s' with ID '%s' from Firestore: %v\n", name, snapshot.Ref.Parent.ID, snapshot.Ref.ID, err)
		}
	}

	return out, nil
}

func convertDynamicMessageIntoRefAndDataMap(
	client *firestore.Client,
	messageFactory *dynamic.MessageFactory,
	messageDescriptor *desc.MessageDescriptor,
	message *dynamic.Message,
	currentSnapshot *firestore.DocumentSnapshot,
	schemaKind *SchemaKind,
) (*firestore.DocumentRef, map[string]interface{}, error) {
	keyRaw, err := message.TryGetFieldByName("key")
	if err != nil {
		return nil, nil, err
	}

	keyCon, ok := keyRaw.(*dynamic.Message)
	if !ok {
		return nil, nil, fmt.Errorf("key of unexpected type")
	}

	key, err := convertKeyToDocumentRef(
		client,
		keyCon,
	)
	if err != nil {
		return nil, nil, err
	}

	m := make(map[string]interface{})

	for _, fieldDescriptor := range message.GetKnownFields() {
		if fieldDescriptor.GetName() == "key" {
			continue
		}
		field := message.GetField(fieldDescriptor)

		switch field.(type) {
		case uint64:
			// We store uint64 as int64 inside Firestore, as Firestore
			// does not support uint64 natively
			m[fieldDescriptor.GetName()] = int64(field.(uint64))
			break
		case *dynamic.Message:
			dm := field.(*dynamic.Message)
			switch dm.GetMessageDescriptor().GetName() {
			case "Key":
				partitionIDFd := dm.GetMessageDescriptor().FindFieldByName("partitionId")
				pathFd := dm.GetMessageDescriptor().FindFieldByName("path")

				if dm.HasField(partitionIDFd) && dm.HasField(pathFd) {
					nkey, err := convertKeyToDocumentRef(
						client,
						dm,
					)
					if err != nil {
						return nil, nil, fmt.Errorf("error on field '%s': %v", fieldDescriptor.GetName(), err)
					}
					m[fieldDescriptor.GetName()] = nkey
				} else {
					m[fieldDescriptor.GetName()] = nil
				}
				break
			case "Timestamp":
				m[fieldDescriptor.GetName()] = field
				break
			default:
				return nil, nil, fmt.Errorf("field '%s' contained unknown protobuf message", fieldDescriptor.GetName())
			}
		default:
			m[fieldDescriptor.GetName()] = field
			break
		}
	}

	if currentSnapshot != nil {
		for _, field := range schemaKind.Fields {
			if field.Readonly {
				// Verify that the property hasn't changed.
				if reflect.DeepEqual(m[field.Name], currentSnapshot.Data()[field.Name]) {
					return nil, nil, fmt.Errorf("readonly field '%s' contains mutated value", field.Name)
				}
			}
		}
	}

	return key, m, nil
}

func convertMetaEntityToRefAndDataMap(
	client *firestore.Client,
	entity *MetaEntity,
	schema *SchemaKind,
) (*firestore.DocumentRef, map[string]interface{}, error) {
	key, err := convertMetaKeyToDocumentRef(
		client,
		entity.Key,
	)
	if err != nil {
		return nil, nil, err
	}

	m := make(map[string]interface{})

	for _, value := range entity.Values {
		name := ""
		for _, field := range schema.Fields {
			if field.Id == value.Id {
				name = field.Name
				break
			}
		}
		if name == "" {
			// field not found?
			continue
		}

		switch value.Type {
		case ValueType_double:
			m[name] = value.DoubleValue
			break
		case ValueType_int64:
			m[name] = value.Int64Value
			break
		case ValueType_string:
			m[name] = value.StringValue
			break
		case ValueType_timestamp:
			m[name] = value.TimestampValue
			break
		case ValueType_boolean:
			m[name] = value.BooleanValue
			break
		case ValueType_bytes:
			m[name] = value.BytesValue
			break
		case ValueType_key:
			if value.KeyValue == nil {
				m[name] = nil
			} else {
				ref, err := convertMetaKeyToDocumentRef(
					client,
					value.KeyValue,
				)
				if err != nil {
					return nil, nil, err
				}
				m[name] = ref
			}
			break
		case ValueType_uint64:
			// We store uint64 as int64 inside Firestore, as Firestore
			// does not support uint64 natively
			m[name] = int64(value.Uint64Value)
			break
		default:
			// todo, log?
			break
		}
	}

	// TODO: implement readonly safety
	/*
		if currentSnapshot != nil {
			for _, field := range schemaKind.Fields {
				if field.Readonly {
					// Verify that the property hasn't changed.
					if reflect.DeepEqual(m[field.Name], currentSnapshot.Data()[field.Name]) {
						return nil, nil, fmt.Errorf("readonly field '%s' contains mutated value", field.Name)
					}
				}
			}
		}
	*/

	return key, m, nil
}

func convertSnapshotToMetaEntity(kindInfo *SchemaKind, snapshot *firestore.DocumentSnapshot) (*MetaEntity, error) {
	key, err := convertDocumentRefToMetaKey(snapshot.Ref)
	if err != nil {
		return nil, fmt.Errorf("error while converting firestore ref to meta key: %v", err)
	}
	entity := &MetaEntity{
		Key: key,
	}
	for key, value := range snapshot.Data() {
		for _, field := range kindInfo.Fields {
			if field.Name == key {
				f := &Value{
					Id:   field.Id,
					Type: field.Type,
				}
				switch field.Type {
				case ValueType_double:
					switch v := value.(type) {
					case float64:
						f.DoubleValue = v
					default:
						f.DoubleValue = 0
					}
				case ValueType_int64:
					switch v := value.(type) {
					case int64:
						f.Int64Value = v
					default:
						f.Int64Value = 0
					}
				case ValueType_uint64:
					switch v := value.(type) {
					case int64:
						f.Uint64Value = uint64(v)
					default:
						f.Uint64Value = 0
					}
				case ValueType_string:
					switch v := value.(type) {
					case string:
						f.StringValue = v
					default:
						f.StringValue = ""
					}
				case ValueType_timestamp:
					switch v := value.(type) {
					case []byte:
						f.TimestampValue = v
					default:
						f.TimestampValue = nil
					}
				case ValueType_boolean:
					switch v := value.(type) {
					case bool:
						f.BooleanValue = v
					default:
						f.BooleanValue = false
					}
				case ValueType_bytes:
					switch v := value.(type) {
					case []byte:
						f.BytesValue = v
					default:
						f.BytesValue = nil
					}
				case ValueType_key:
					switch v := value.(type) {
					case *firestore.DocumentRef:
						f.KeyValue, err = convertDocumentRefToMetaKey(v)
						if err != nil {
							f.KeyValue = nil
							fmt.Printf("error while converting firestore ref to meta key: %v", err)
						}
					default:
						f.KeyValue = nil
					}
				default:
					return nil, fmt.Errorf("field type %d not supported in convertSnapshotToMetaEntity", field.Type)
				}
				entity.Values = append(entity.Values, f)
				break
			}
		}
	}
	return entity, nil
}
