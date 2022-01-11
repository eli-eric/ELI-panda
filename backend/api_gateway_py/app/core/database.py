import psycopg

from app.core import config


def dbConnection():
    return psycopg.connect(
        f"host={config.DB_HOST} dbname={config.DB_DATABASE} user={config.DB_USERNAME} password={config.DB_PASSWORD}"
    )

def updateDbSchemaAndBaseData() -> bool:

    with dbConnection() as conn:
        with conn.cursor() as cur:
            cur.execute(open("database/latest_schema_data.sql", "r").read())

    return True