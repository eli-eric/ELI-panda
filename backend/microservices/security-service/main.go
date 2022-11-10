package main

import (
	"context"
	"flag"
	"log"
	"strconv"

	pb "panda/microservices/systems-service/proto"

	"github.com/neo4j/neo4j-go-driver/v4/neo4j"
)

var (
	port = flag.Int("port", 50020, "The microservice port")
)

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

	log.Printf("Microservice starting: %v", pb.SystemsService_ServiceDesc.ServiceName)

	log.Printf("Microservice %v listening at %v", pb.SystemsService_ServiceDesc.ServiceName, lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}

}
