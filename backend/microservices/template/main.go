package main

import (
	"flag"
	"fmt"
	"log"
	"net"

	pb "panda/microservices/template-service/proto"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

var (
	port = flag.Int("port", 50050, "The microservice port")
)

// server is used to implement Template service.
type server struct {
	pb.UnimplementedTemplateServiceServer
}

//

func main() {
	flag.Parse()

	log.Printf("Microservice starting: %v", pb.TemplateService_ServiceDesc.ServiceName)

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	reflection.Register(s)
	pb.RegisterTemplateServiceServer(s, &server{})

	log.Printf("Microservice %v listening at %v", pb.TemplateService_ServiceDesc.ServiceName, lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}

}
