package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net"
	"strconv"

	pb "panda/microservices/catalogue-service/proto"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"

	"github.com/neo4j/neo4j-go-driver/v4/neo4j"
)

var (
	port        = flag.Int("port", 50051, "The microservice port")
	serviceName = flag.String("serviceName", "SystemsService", "Name of the microservice")
)
var neo4jDriver neo4j.Driver

// server is used to implement Systems service.
type server struct {
	pb.UnimplementedSystemsServiceServer
}

//
func (s *server) DeleteRelationshipByID(ctx context.Context, in *pb.IDRequest) (*pb.MessageResponse, error) {

	id := in.GetId()
	session := neo4jDriver.NewSession(neo4j.SessionConfig{})
	defer session.Close()
	summary, err := session.WriteTransaction(func(tx neo4j.Transaction) (interface{}, error) {

		records, err := tx.Run(`MATCH(parent:System)-[r:HAS_SUBSYSTEM]->(child:System) WHERE id(r)=$id DELETE r`, map[string]interface{}{
			"id": id,
		})
		if err != nil {
			return nil, err
		}
		resultSummary, err := records.Consume()
		if err != nil {
			return nil, err
		}

		return resultSummary, nil
	})

	if err != nil {
		return nil, err
	}

	resultMessage := ""
	if summary != nil {
		rs := summary.(neo4j.ResultSummary)

		resultMessage += strconv.Itoa(rs.Counters().RelationshipsDeleted()) + " relationship(s) deleted"
	}

	log.Printf("Result: %v", resultMessage)
	return &pb.MessageResponse{Message: resultMessage}, nil
}

func main() {
	flag.Parse()

	log.Printf("Microservice starting: %v", *serviceName)
	neo4jUri := "bolt://127.0.0.1:7687"
	useConsoleLogger := func(level neo4j.LogLevel) func(config *neo4j.Config) {
		return func(config *neo4j.Config) {
			config.Log = neo4j.ConsoleLogger(level)
		}
	}
	var neo4err error
	neo4jDriver, neo4err = neo4j.NewDriver(neo4jUri, neo4j.BasicAuth("neo4j", "fw34-sdRF", ""), useConsoleLogger(neo4j.ERROR))

	if neo4err != nil {
		log.Fatalf("failed to connect to the neo4j: %v", neo4err)
	}
	// Handle driver lifetime based on your application lifetime requirements  driver's lifetime is usually
	// bound by the application lifetime, which usually implies one driver instance per application
	defer neo4jDriver.Close()

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	reflection.Register(s)
	pb.RegisterSystemsServiceServer(s, &server{})

	log.Printf("Microservice %v listening at %v", *serviceName, lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}

}
