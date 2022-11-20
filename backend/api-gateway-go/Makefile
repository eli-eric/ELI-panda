# Main go commands
run:
	go run server.go

build:
	go build -v

install:
	go mod download && go mod verify

db-local-up:
	docker-compose -f docker/docker-compose-databases-local.yml up -d

db-local-down:
	docker-compose -f docker/docker-compose-databases-local.yml down