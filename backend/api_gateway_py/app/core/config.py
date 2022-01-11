import os

from dotenv import load_dotenv

load_dotenv("./.env")

# databse settings
DB_HOST = os.environ["DB_HOST"]
DB_USERNAME = os.environ["DB_USERNAME"]
DB_PASSWORD = os.environ["DB_PASSWORD"]
DB_DATABASE = os.environ["DB_DATABASE"]

DB_AUTO_UPDATE_SCHEMA_AND_BASE_DATA_ON_START =  bool(os.environ["DB_AUTO_UPDATE_SCHEMA_AND_BASE_DATA_ON_START"])

# Auth configs.
API_SECRET_KEY = os.environ["API_SECRET_KEY"]
API_ALGORITHM = os.environ["API_ALGORITHM"]
API_ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.environ["API_ACCESS_TOKEN_EXPIRE_MINUTES"]
)  # infinity
