from app.core import config
import psycopg


def dbConnection():
    return psycopg.connect(
        f"host={config.DB_HOST} dbname={config.DB_DATABASE} user={config.DB_USERNAME} password={config.DB_PASSWORD}"
    )