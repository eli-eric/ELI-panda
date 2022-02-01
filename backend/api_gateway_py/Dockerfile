# https://github.com/tiangolo/uvicorn-gunicorn-fastapi-docker

FROM python:3.9

# set environment variables
ENV PYTHONWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

ENV DB_HOST = "172.17.0.1"
ENV DB_USERNAME = "postgres"
ENV DB_PASSWORD = "EliMachapuchare6993"
ENV DB_DATABASE = "panda_dev"
ENV API_SECRET_KEY="09d25e094faa6ca2556c818166sdfs7898sdfd6556errejnhgn65465f6f0f4caa6cf63b88e8d3e7"
ENV API_ALGORITHM="HS256"
ENV API_ACCESS_TOKEN_EXPIRE_MINUTES="5256000000"


# set working directory
WORKDIR /code

# copy dependencies
COPY requirements.txt /code/

# install dependencies
RUN pip install -r requirements.txt

# copy project
COPY ./app /code/app

CMD ["gunicorn", "app.main:app", "--workers", "2", "--worker-class", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:6969"]
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]