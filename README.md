# ELI-panda
ELI oPerations And maiNtenance DAtabase

The project has three main sections:

### database - database(s) where we store ELI-PANDA data

## backend - API Gateway(FastAPI - python) to access the database - for now it is one REST API but in latest production version it will have microservices architecture

## frontend - GUI to acces our data written in React using Nextjs framework

# database
Here is everything about the databases.
For now we are using one PostgreSQL database. 
Please use PostgreSQL version 14.

## DB chnages

We will use change script to keep the database up to date - both schema and data(some required data to run the frontend correctly).
For now we will use only one script - but in the future we can split it to more migration scripts.

So we have a file database/postgresql/latest_schema_data.sql

Until the line: GRANT ALL ON SCHEMA panda TO postgres; is it init schmea script - first version

If we want to do some changes in the database we will add a script at the end of the file.

# backend

We are using FastAPI. Preconfigured tempalte https://github.com/rednafi/fastapi-nano


# frontend