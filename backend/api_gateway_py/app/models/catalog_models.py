from __future__ import annotations

from typing import Optional
from app.models.base_models import BaseDbModel
from pydantic import BaseModel
from dataclasses import dataclass

# represent DB object t_catalog_item
@dataclass
class CatalogItem(BaseDbModel):   
    name: str
   