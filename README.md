# ELI-PANDA 

### (ELI oPerations And maiNtenance DAtabase)

The premise that good maintenance practices are fundamental to success is beyond question. In accordance with IMPULSE Project requirements, ELI facilities had an obligation to create a joint spare parts database. The essential intention behind this requirement had several purposes, such as: to build up a relevant database in order to minimize possible downtime for user experiments, to determine which spare parts must be stocked in advance, to make cost-effective maintenance decisions.

## Backend

API Gateway - the only way how to access data in PANDA database.

More information in backend's [readme.md](https://github.com/eli-eric/ELI-panda/tree/main/backend/api-gateway-go) 

## Frontend

GUI to access the data. Written in [NEXT.JS](https://nextjs.org/) using [React](https://reactjs.org/), [TypeScript](https://reactjs.org/docs/static-type-checking.html#typescript), [TailwindCSS](https://tailwindcss.com/), [NextAuth](https://next-auth.js.org/)


Please follow the instructions in frontend's [readme.md](https://github.com/eli-eric/ELI-panda/tree/main/frontend/ui-main-app)

## Databases

We are using multiple databases. For some services we will use [PostgreSQL](https://www.postgresql.org/) and for example for the Systems we will use graph database [neo4j](https://neo4j.com/)

## Docker, CI/CD

We are using [Docker](https://www.docker.com/get-started) for the deployment now.

On the deployment server we have nginx web server wich is working like a reverse proxy and forward the requests like that:

http://panda.eli-beamlines.eu -> localhost:5000(docker container) - frontend
http://api.panda.eli-beamlines.eu -> localhost:50000(docker container) - backend

We are using GitHub actions to automate build/test/deploy.


