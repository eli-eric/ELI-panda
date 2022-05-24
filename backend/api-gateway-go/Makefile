# Main go commands
run:
	go run server.go

build:
	go build -v

install:
	go mod download && go mod verify

#if swag command not found run: export PATH=$PATH:$HOME/go/bin
swagger:
	swag init -g server.go 