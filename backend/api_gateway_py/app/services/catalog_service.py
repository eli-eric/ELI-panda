from __future__ import annotations

from typing import Any, List

from fastapi import Depends
from fastapi.exceptions import HTTPException
from psycopg.rows import TupleRow, class_row

from app.core.auth import AuthUser, get_current_user
from app.core.database import dbConnection
from app.models.catalog_models import CatalogItem


def get_all_items(auth: AuthUser) -> dict[str, Any]:

    response: dict[str, Any] = {"data": [1, "test"]}

    # todo DB logic here - will return List of CatalogItem

    return response
