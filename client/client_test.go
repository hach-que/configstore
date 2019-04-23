package server

import (
	"context"
	fmt "fmt"
	"io"
	"os"
	"strings"
	"time"

	timestamp "github.com/golang/protobuf/ptypes/timestamp"
	"github.com/rs/xid"
	"google.golang.org/grpc"

	"testing"

	"gotest.tools/assert"
)

var ctx context.Context
var configstore *Configstore
var configstore2 *Configstore

func TestMain(m *testing.M) {
	conn, err := grpc.Dial("127.0.0.1:13389", grpc.WithInsecure())
	if err != nil {
		fmt.Printf("%v", err)
		fmt.Println()
		return
	}
	defer conn.Close()

	ctx = context.Background()
	configstore, err = ConnectToConfigstore(conn)
	if err != nil {
		fmt.Printf("%v", err)
		fmt.Println()
		return
	}
	configstore2, err = ConnectToConfigstore(conn)
	if err != nil {
		fmt.Printf("%v", err)
		fmt.Println()
		return
	}
	os.Exit(m.Run())
}

func TestUInt64Storage(t *testing.T) {
	resp, err := configstore.IntegerTests.Client().Create(ctx, &CreateIntegerTestRequest{
		Entity: &IntegerTest{
			Key:         CreateTopLevel_IntegerTest_IncompleteKey(&PartitionId{}),
			UnsignedInt: uint64(18446744073709551615),
		},
	})
	assert.NilError(t, err)
	assert.Assert(t, resp.Entity.Key.Path[0].GetName() != "")
	assert.Equal(t, resp.Entity.UnsignedInt, uint64(18446744073709551615))

	resp2, err := configstore.IntegerTests.Client().Get(ctx, &GetIntegerTestRequest{
		Key: resp.Entity.Key,
	})
	assert.NilError(t, err)
	assert.Equal(t, resp2.Entity.Key.Path[0].GetName(), resp.Entity.Key.Path[0].GetName())
	assert.Equal(t, resp2.Entity.UnsignedInt, uint64(18446744073709551615))
}

func TestNilKeyStorage(t *testing.T) {
	resp, err := configstore.NilKeyTests.Client().Create(ctx, &CreateNilKeyTestRequest{
		Entity: &NilKeyTest{
			Key:        CreateTopLevel_NilKeyTest_IncompleteKey(&PartitionId{}),
			NilKeyTest: nil,
		},
	})
	assert.NilError(t, err)
	assert.Assert(t, resp.Entity.Key.Path[0].GetName() != "")
	assert.Assert(t, resp.Entity.NilKeyTest == nil)

	resp2, err := configstore.NilKeyTests.Client().Get(ctx, &GetNilKeyTestRequest{
		Key: resp.Entity.Key,
	})
	assert.NilError(t, err)
	assert.Equal(t, resp2.Entity.Key.Path[0].GetName(), resp.Entity.Key.Path[0].GetName())
	assert.Assert(t, resp2.Entity.NilKeyTest == nil)
}

func TestKeyStorage(t *testing.T) {
	resp, err := configstore.NilKeyTests.Client().Create(ctx, &CreateNilKeyTestRequest{
		Entity: &NilKeyTest{
			Key:        CreateTopLevel_NilKeyTest_IncompleteKey(&PartitionId{}),
			NilKeyTest: CreateTopLevel_NilKeyTest_NameKey(&PartitionId{}, "Hello World"),
		},
	})
	assert.NilError(t, err)
	assert.Assert(t, resp.Entity.Key.Path[0].GetName() != "")
	assert.Assert(t, resp.Entity.NilKeyTest.Path[0].GetName() != "")

	resp2, err := configstore.NilKeyTests.Client().Get(ctx, &GetNilKeyTestRequest{
		Key: resp.Entity.Key,
	})
	assert.NilError(t, err)
	assert.Assert(t, resp2.Entity.Key != nil, "entity key was nil")
	assert.Assert(t, resp2.Entity.Key.Path != nil, "entity key path was nil")
	assert.Assert(t, resp2.Entity.Key.Path[0] != nil, "entity key path[0] was nil")
	assert.Equal(t, resp2.Entity.Key.Path[0].GetName(), resp.Entity.Key.Path[0].GetName())
	assert.Assert(t, resp2.Entity.NilKeyTest != nil, "entity nilkeytest was nil")
	assert.Assert(t, resp2.Entity.NilKeyTest.Path != nil, "entity nilkeytest path was nil")
	assert.Assert(t, resp2.Entity.NilKeyTest.Path[0] != nil, "entity nilkeytest path[0] was nil")
	assert.Equal(t, resp2.Entity.NilKeyTest.Path[0].GetName(), resp.Entity.NilKeyTest.Path[0].GetName())
}

func TestIndexFetch(t *testing.T) {
	testID := xid.New()

	resp, err := configstore.IndexTests.Create(context.Background(), &IndexTest{
		Key:            CreateTopLevel_IndexTest_IncompleteKey(&PartitionId{}),
		StringField:    testID.String(),
		Int64Field:     int64(1),
		Uint64Field:    uint64(1),
		BooleanField:   true,
		DoubleField:    float64(0.2),
		TimestampField: nil,
		BytesField:     nil,
		KeyField:       nil,
	})
	assert.NilError(t, err)
	assert.Assert(t, resp.Key.Path[0].GetName() != "")

	o2 := configstore.IndexTests.GetByString(testID.String())
	assert.Assert(t, resp == o2)

	o2 = configstore.IndexTests.GetByStringFnv(Fnv64a(testID.String()))
	assert.Assert(t, resp == o2)
}

func TestCreate(t *testing.T) {
	resp, err := configstore.Users.Client().Create(ctx, &CreateUserRequest{
		Entity: &User{
			Key:          CreateTopLevel_User_IncompleteKey(&PartitionId{}),
			EmailAddress: "hello@example.com",
			PasswordHash: "what",
		},
	})
	assert.NilError(t, err)
	assert.Assert(t, resp.Entity.Key.Path[0].GetName() != "")
	assert.Equal(t, resp.Entity.EmailAddress, "hello@example.com")
	assert.Equal(t, resp.Entity.PasswordHash, "what")
}

func TestCreateWithTimestamp(t *testing.T) {
	resp, err := configstore.Users.Client().Create(ctx, &CreateUserRequest{
		Entity: &User{
			Key:          CreateTopLevel_User_IncompleteKey(&PartitionId{}),
			EmailAddress: "hello@example.com",
			PasswordHash: "what",
			DateLastLoginUtc: &timestamp.Timestamp{
				Seconds: 1,
				Nanos:   123,
			},
		},
	})
	assert.NilError(t, err)
	assert.Assert(t, resp.Entity.Key.Path[0].GetName() != "")
	assert.Equal(t, resp.Entity.EmailAddress, "hello@example.com")
	assert.Equal(t, resp.Entity.PasswordHash, "what")
	assert.Equal(t, resp.Entity.DateLastLoginUtc.Seconds, int64(1))
	assert.Equal(t, resp.Entity.DateLastLoginUtc.Nanos, int32(123))
}

func TestList(t *testing.T) {
	_, err := configstore.Users.Client().List(ctx, &ListUserRequest{
		Limit: 10,
	})
	assert.NilError(t, err)
}

func TestCreateThenGet(t *testing.T) {
	resp, err := configstore.Users.Client().Create(ctx, &CreateUserRequest{
		Entity: &User{
			Key:          CreateTopLevel_User_IncompleteKey(&PartitionId{}),
			EmailAddress: "hello@example.com",
			PasswordHash: "what",
		},
	})
	assert.NilError(t, err)
	assert.Assert(t, resp.Entity.Key.Path[0].GetName() != "")
	assert.Equal(t, resp.Entity.EmailAddress, "hello@example.com")
	assert.Equal(t, resp.Entity.PasswordHash, "what")

	resp2, err := configstore.Users.Client().Get(ctx, &GetUserRequest{
		Key: resp.Entity.Key,
	})
	assert.NilError(t, err)
	assert.Equal(t, resp2.Entity.Key.Path[0].GetName(), resp.Entity.Key.Path[0].GetName())
	assert.Equal(t, resp2.Entity.EmailAddress, "hello@example.com")
	assert.Equal(t, resp2.Entity.PasswordHash, "what")
}

func TestWatchThenCreate(t *testing.T) {
	watcher, err := configstore.Users.Client().Watch(ctx, &WatchUserRequest{})
	assert.NilError(t, err)

	mutex := make(chan bool, 1)
	timeout := make(chan bool, 1)

	testID := xid.New()

	var watchError error
	go func() {
		for {
			change, err := watcher.Recv()
			if err == io.EOF {
				break
			}
			if err != nil {
				watchError = err
			}
			if change.Type == WatchEventType_Created &&
				change.Entity.PasswordHash == testID.String() {
				mutex <- true
			}
		}
	}()

	resp, err := configstore.Users.Client().Create(ctx, &CreateUserRequest{
		Entity: &User{
			Key:          CreateTopLevel_User_IncompleteKey(&PartitionId{}),
			EmailAddress: "hello@example.com",
			PasswordHash: testID.String(),
		},
	})
	assert.NilError(t, err)
	assert.Assert(t, resp.Entity.Key.Path[0].GetName() != "")
	assert.Equal(t, resp.Entity.EmailAddress, "hello@example.com")
	assert.Equal(t, resp.Entity.PasswordHash, testID.String())

	go func() {
		time.Sleep(20 * time.Second)
		timeout <- true
	}()

	select {
	case <-mutex:
		assert.NilError(t, watchError)
	case <-timeout:
		assert.Assert(t, false, "timed out waiting for watch event")
	}
}

func TestStore(t *testing.T) {
	user, err := configstore.Users.Create(ctx, &User{
		Key:          CreateTopLevel_User_IncompleteKey(&PartitionId{}),
		EmailAddress: "hello@example.com",
		PasswordHash: "v",
	})
	assert.NilError(t, err)

	time.Sleep(1 * time.Second)

	_, ok := configstore2.Users.GetAndCheck(user.Key)
	assert.Equal(t, ok, true)

	_, err = configstore.Users.Delete(ctx, user.Key)
	assert.NilError(t, err)

	time.Sleep(1 * time.Second)

	_, ok = configstore2.Users.GetAndCheck(user.Key)
	assert.Equal(t, ok, false)
}

func TestCreateThenUpdateThenGet(t *testing.T) {
	resp, err := configstore.Users.Client().Create(ctx, &CreateUserRequest{
		Entity: &User{
			Key:          CreateTopLevel_User_IncompleteKey(&PartitionId{}),
			EmailAddress: "hello@example.com",
			PasswordHash: "what",
		},
	})
	assert.NilError(t, err)
	assert.Assert(t, resp.Entity.Key.Path[0].GetName() != "")
	assert.Equal(t, resp.Entity.EmailAddress, "hello@example.com")
	assert.Equal(t, resp.Entity.PasswordHash, "what")

	resp.Entity.EmailAddress = "update@example.com"

	resp2, err := configstore.Users.Client().Update(ctx, &UpdateUserRequest{
		Entity: resp.Entity,
	})
	assert.NilError(t, err)
	assert.Equal(t, resp2.Entity.Key.Path[0].GetName(), resp.Entity.Key.Path[0].GetName())
	assert.Equal(t, resp2.Entity.EmailAddress, "update@example.com")
	assert.Equal(t, resp2.Entity.PasswordHash, "what")

	resp3, err := configstore.Users.Client().Get(ctx, &GetUserRequest{
		Key: resp.Entity.Key,
	})
	assert.NilError(t, err)
	assert.Equal(t, resp3.Entity.Key.Path[0].GetName(), resp2.Entity.Key.Path[0].GetName())
	assert.Equal(t, resp3.Entity.EmailAddress, "update@example.com")
	assert.Equal(t, resp3.Entity.PasswordHash, "what")
}

func TestCreateThenDeleteThenGet(t *testing.T) {
	resp, err := configstore.Users.Client().Create(ctx, &CreateUserRequest{
		Entity: &User{
			Key:          CreateTopLevel_User_IncompleteKey(&PartitionId{}),
			EmailAddress: "hello@example.com",
			PasswordHash: "what",
		},
	})
	assert.NilError(t, err)
	assert.Assert(t, resp.Entity.Key.Path[0].GetName() != "")
	assert.Equal(t, resp.Entity.EmailAddress, "hello@example.com")
	assert.Equal(t, resp.Entity.PasswordHash, "what")

	resp2, err := configstore.Users.Client().Delete(ctx, &DeleteUserRequest{
		Key: resp.Entity.Key,
	})
	assert.NilError(t, err)
	assert.Equal(t, resp2.Entity.Key.Path[0].GetName(), resp.Entity.Key.Path[0].GetName())
	assert.Equal(t, resp2.Entity.EmailAddress, "hello@example.com")
	assert.Equal(t, resp2.Entity.PasswordHash, "what")

	_, err = configstore.Users.Client().Get(ctx, &GetUserRequest{
		Key: resp.Entity.Key,
	})
	assert.Assert(t, err != nil)
	assert.Assert(t, strings.Contains(fmt.Sprintf("%v", err), "code = NotFound"))
}
