#!/bin/sh

echo "Loading local enviroment for the backend from .venv"
source .venv/bin/activate
echo "Running development server...s"
make dev