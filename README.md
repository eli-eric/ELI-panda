# ELI-panda

ELI oPerations And maiNtenance DAtabase

The project has two main sections:

### Backend:

API Gateway - [Echo](https://echo.labstack.com/) - High performance, extensible, minimalist Go web framework - for now it is one classic REST API but in one of the future versions it will have microservices architecture

### Frontend:

GUI to acces our data written in [React](https://reactjs.org/) using [TypeScript](https://reactjs.org/docs/static-type-checking.html#typescript)


# Database

We will use microservices. So we are able to mix technologies. For some microservices we will use [PostgreSQL](https://www.postgresql.org/) and for example for the Systems microservice we will use graph database [neo4j](https://neo4j.com/)

More details will be part of each backend project - now in the one API Gateway backend go project - [Backend](https://github.com/eli-eric/ELI-panda/tree/main/backend/api-gateway-go)


# Backend

Please follow the instructions in backend's [readme.md](https://github.com/eli-eric/ELI-panda/tree/main/backend/api-gateway-go) 

# Frontend

We are using React([create-react-app](https://create-react-app.dev/) and ready to go [Material UI Template](https://crema-next.herokuapp.com/dashboards/metrics) with TypeScript instead of pure Javascript.

Please follow the instructions in frontend's [readme.md](https://github.com/eli-eric/ELI-panda/tree/main/frontend)

# Docker

We will use [Docker](https://www.docker.com/get-started) for the deployment.

On the deployment server we have nginx web server wich is working like a reverse proxy and forward the requests like that:

http://panda.eli-beamlines.eu -> localhost:5000(docker container) - frontend
http://api.panda.eli-beamlines.eu -> localhost:1323(docker container) - backend

We can configure GitHub actions to automate build/test/deploy - for now Jiří Švácha will do that manualy and prepare these [Actions](https://github.com/eli-eric/ELI-panda/actions).
