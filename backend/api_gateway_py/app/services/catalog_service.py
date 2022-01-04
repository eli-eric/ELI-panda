from __future__ import annotations

from typing import Any, List
from app.models.catalog_models import CatalogItem
from app.core.database import dbConnection
from fastapi.exceptions import HTTPException
from fastapi import Depends


from psycopg.rows import TupleRow, class_row


def get_all_items(auth:Depends) -> dict[str, Any]:
       
    response: dict[str, Any] = {
        "data": [1,'test']
    }

    # todo DB logic here - will return List of CatalogItem 
            

    return response

