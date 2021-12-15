# ELI-panda
ELI oPerations And maiNtenance DAtabase

The project has three main sections:

### Database:
database(s) where we store ELI-PANDA data

### Backend:
API Gateway([FastAPI](https://fastapi.tiangolo.com/) - python) to access the database - for now it is one REST API but in latest production version it will have microservices architecture

### Frontend:
 GUI to acces our data written in React using [Next.js](https://nextjs.org/) framework

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


# Frontend

We will use react framework [Next.js](https://nextjs.org/) and ready to go [Material UI Template](https://crema-next.herokuapp.com/dashboards/metrics)

We are waiting for finalize the purchase. Expected 16.12.2021

# Docker

We will use Docker for the production(for now dev) deployment. 