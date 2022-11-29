## PANDA API GATEWAY OpenAPI specification

If we want to change the OAS (OpenAPI sepcification) for the PANDA API Gateway we are doing it here.

We are using multiple files aproach.

The final OAS file (../panda-gateway.yaml) presented within on-line documentation has to be processed by the swagger-cli.

Install swagger cli

`npm install -g swagger-cli`

Bundle final OAS

`swagger-cli bundle panda-gateway.yaml --outfile ../panda-gateway.yaml --type yaml`
