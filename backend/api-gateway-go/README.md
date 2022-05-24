# How to run this backend localy

1. install go 1.18 or above https://go.dev/dl/
2. to get required packages execute: make install
3. to run webapi localy execute: make dev

The server is running localy on port :1323

# Optionaly to update OpenAPI(Swagger) docs:

1. run(to install swagger tool) go install github.com/swaggo/swag/cmd/swag@latest
2. run(to generate swagger docs) make swagger

OpenAPI docs is then available on root API address: http://{host} (http://localhost:1323/)
