# Main go commands
run:
	go run server.go

build:
	go build -v

install:
	go mod download && go mod verify

#protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative proto/systems-service.proto