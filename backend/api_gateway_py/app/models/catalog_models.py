from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from typing import List

from pydantic import BaseModel


# represent DB object from f_get_catalog_items_paged function
@dataclass
class CatalogItemPaged:
    ID:int
    Name: str
    Category:str
    Manufacturer:str
    Availability:str
    Facility:str
    EstimatedPrice:str
    Note:str
    TypicalAvailableInDays:int
    SupportedToDate:datetime

class CatalogItemPagingResponse:
    Data: List[CatalogItemResponse]
    TotalCount: int = 0


class CatalogItemResponse:
    id:int
    Name: str
    Category:str
    Manufacturer:str
    Availability:str
    Facility:str
    EstimatedPrice:str
    Note:str
    TypicalAvailableInDays:int
    SupportedToDate:datetime
