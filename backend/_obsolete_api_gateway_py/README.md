<div align="center">

![logo](https://user-images.githubusercontent.com/30027932/134270064-baecfbec-b3e7-4cb7-a07e-c11a58526260.png)

[![Mentioned in Awesome <INSERT LIST NAME>](https://awesome.re/mentioned-badge-flat.svg)](https://github.com/mjhea0/awesome-fastapi#boilerplate)
[![License](https://img.shields.io/cocoapods/l/AFNetworking?style=flat-square)](https://github.com/rednafi/think-asyncio/blob/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/follow/rednafi?style=flat-square)](https://twitter.com/rednafi)

</div>

## Description

This is a minimalistic and extensible [FastAPI](https://fastapi.tiangolo.com/) template that incorporates divisional pattern architecture with [divisional folder structure](https://exploreflask.com/en/latest/blueprints.html#divisional). It's suitable for developing small to medium sized API oriented micro-services. The architecture is similar to what you'd get with Flask's [Blueprint](https://exploreflask.com/en/latest/blueprints.html).

## Features

- It uses [FastAPI](https://fastapi.tiangolo.com/) framework for API development. FastAPI is a modern, highly performant, web framework for building APIs with Python 3.6+.

- The APIs are served with [Gunicorn](https://gunicorn.org/) server with multiple [Uvicorn](https://www.uvicorn.org/) workers. Uvicorn is a lightning-fast "ASGI" server. It runs asynchronous Python web code in a single process.

- Simple reverse-proxying with [Caddy](https://caddyserver.com/docs/).

- OAuth2 (with hashed password and Bearer with JWT) based authentication

- [CORS (Cross Origin Resource Sharing)](https://fastapi.tiangolo.com/tutorial/cors/) enabled.

- Flask inspired divisional folder structure better decoupling and encapsulation. This is suitable for small to medium backend development.

- Dockerized using [python:3.9-slim-bullseye](https://github.com/docker-library/python/blob/bb68424de76756a2d3dc817f87b1f8640112461f/3.8/bullseye/Dockerfile) and optimized for size and functionality.

## Quickstart

### Setup

- Clone the repo. On your workspace directory, run:

  ```
  git clone https://github.com/rednafi/fastapi-nano.git
  ```

- Head over to the `fastapi-nano` directory.

### Run the App in Containers

To run the application using Docker, make sure you've got [Docker](https://www.docker.com/) and [Docker Compose V2](https://docs.docker.com/compose/cli-command/) installed on your system. From the project's root dirctory, run:

```bash
docker compose up -d
```

### Alternatively, Run the App Locally

If you want to run the application locally, without using Docker, then:

- Create a virtual environment in the root directory. Here I'm using Python's built-in venv in a Unix system. Run:

  ```bash
  python3.9 -m venv .venv
  ```

- Activate the environment. Run:

  ```bash
  source .venv/bin/activate
  ```

- Go to the folder created by cookie-cutter (default is **fastapi-nano**).

- Install the dependencies. Run:

  ```bash
  pip install -r requirements.txt && pip install -r requirements-dev.txt
  ```

- Start the application. Run:

  ```bash
  uvicorn app.main:app --port 5001 --reload
  ```

### Check the APIs

- To play around with the APIs, go to the following link on your browser:

  ```
  http://localhost:5001/docs
  ```

  This will take you to an UI like below:

  ![Screenshot from 2020-06-21 22-15-18](https://user-images.githubusercontent.com/30027932/85229723-5b721880-b40d-11ea-8f03-de36c07a3ce5.png)

- Press the `authorize` button on the right and add _username_ and _password_. The APIs use OAuth2 (with hashed password and Bearer with JWT) based authentication.

<div align="center">
✨ 🍰 ✨
</div>
