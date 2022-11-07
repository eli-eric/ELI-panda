package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net"

	pb "panda/microservices/catalogueService/proto"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

var (
	port        = flag.Int("port", 50010, "The microservice port")
	serviceName = flag.String("serviceName", "SystemsService", "Name of the microservice")
)

// server is used to implement Systems service.
type server struct {
	pb.UnimplementedCatalogueServiceServer
}

//
func (s *server) GetCatalogueItemByID(ctx context.Context, in *pb.IDRequest) (*pb.CatalogueItemResponse, error) {

	id := in.GetId()

	log.Printf("Result: %v", id)
	return &pb.CatalogueItemResponse{Name: "Test", CatalogueNumber: "11111"}, nil
}

func main() {
	flag.Parse()

	log.Printf("Microservice starting: %v", *serviceName)

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	reflection.Register(s)
	pb.RegisterCatalogueServiceServer(s, &server{})

	log.Printf("Microservice %v listening at %v", *serviceName, lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}

}
