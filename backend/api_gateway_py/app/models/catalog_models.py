from __future__ import annotations

from dataclasses import dataclass
from typing import Optional

from pydantic import BaseModel

from app.models.base_models import BaseDbModel


# represent DB object t_catalog_item
@dataclass
class CatalogItem(BaseDbModel):
    name: str


class CatalogItemResponse(BaseModel):
    id: int
    name: str
