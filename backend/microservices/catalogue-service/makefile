proto:
	protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative proto/catalogue-service.proto

run:
	go run .

build:
	go build

grpcurl:
	grpcurl -plaintext -d '{"id":1235}' localhost:50052 microservices.CatalogueService.GetCatalogueItemByID
	grpcurl -plaintext -d '{"id":666}' localhost:50052 microservices.CatalogueService.GetCatalogueItemByID