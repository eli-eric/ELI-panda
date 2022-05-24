# How to run this backend localy

1. install go 1.18 or above https://go.dev/dl/
2. run(to get required packages): go mod download && go mod verify
3. run(to run webapi localy) go run server.go

The server is running localy on port 1323

# Optionaly to update OpenAPI(Swagger) docs:

1. run(to install swagger tool) go install github.com/swaggo/swag/cmd/swag@latest
2. run(to generate swagger docs) swag init -g server.go

OpenAPI docs is then available on http://{host} (http://localhost:1323/)
