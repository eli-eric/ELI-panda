# ELI-panda

ELI oPerations And maiNtenance DAtabase

The project has three main sections:

### Database:

database(s) where we store ELI-PANDA data

### Backend:

API Gateway([FastAPI](https://fastapi.tiangolo.com/) - python) to access the database - for now it is one REST API but in latest production version it will have microservices architecture

### Frontend:

GUI to acces our data written in React with TypeScript

# Database

Here is everything about the databases.
For now we are using one PostgreSQL database.
Please use [PostgreSQL version 14](https://www.postgresql.org/about/news/postgresql-141-135-129-1114-1019-and-9624-released-2349/).

### Setup DB

After you finish local PostgreSQL engine installation, create new database(e.g. panda_dev) and run the [DB change script](https://github.com/eli-eric/ELI-panda/blob/main/database/postgresql/latest_schema_data.sql) to init the DB

### DB chnages

We will use change script to keep the database up to date - both schema and data(some required data to run the frontend correctly).
For now we will use only one script - but in the future we can split it to more migration scripts.

So we have a file database/postgresql/latest_schema_data.sql

Until the line: GRANT ALL ON SCHEMA panda TO postgres; is it init schmea script - first version

If we want to do some changes in the database we will add a script at the end of the file.

# Backend

We are using [FastAPI](https://fastapi.tiangolo.com/).
Preconfigured tempalte [fast-nano](https://github.com/rednafi/fastapi-nano)

Please follow the instructions in backend's [readme.md](https://github.com/eli-eric/ELI-panda/tree/main/backend/api_gateway_py#alternatively-run-the-app-locally) to run localy(debug)

If you run it localy for example on port 5001 - you can interact/see the documentaion on http://localhost:5001/docs

# Frontend

We are using React([create-react-app](https://create-react-app.dev/) and ready to go [Material UI Template](https://crema-next.herokuapp.com/dashboards/metrics) with TypeScript instead of pure Javascript.

Please follow the instructions in frontend's [readme.md](https://github.com/eli-eric/ELI-panda/tree/main/frontend)

# Docker

We will use [Docker](https://www.docker.com/get-started) for the deployment.

On the deployment server we have nginx web server wich is working like a reverse proxy and forward the requests like that:

http://panda.eli-beamlines.eu -> localhost:5000(docker container) - frontend
http://api.panda.eli-beamlines.eu -> localhost:5001(docker container) - backend

We can configure GitHub actions to automate build/test/deploy - for now Jiří Švácha will do that manualy and prepare these [Actions](https://github.com/eli-eric/ELI-panda/actions).
