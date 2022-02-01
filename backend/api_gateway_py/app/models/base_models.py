from dataclasses import dataclass
from typing import Any,List

from pydantic import BaseModel


@dataclass
class BaseDbModel:
    """
    Represent base model created from some database object.

    We use it in psycopg in the cursor constructor like that:
    with conn.cursor(row_factory=class_row(BaseDbModel)) as cur:
    """

    # in most of the DB tables we have id as a primary key
    id: int

class GridPagingModelResponse(BaseModel):
    Data: List[Any]
    TotalCount: int = 0