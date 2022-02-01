from __future__ import annotations

from typing import Any
from app.models.base_models import GridPagingModelResponse

from fastapi import APIRouter, Depends

from app.core.auth import get_current_user
from app.models.catalog_models import CatalogItemPagingResponse
from app.services.catalog_service import get_catalog_items_with_paging

router = APIRouter()
apiUrl = "/catalog-items/"


@router.get(apiUrl, response_model=GridPagingModelResponse, tags=["catalog"])
async def get_all_catalog_items_paged(
    auth: Depends = Depends(get_current_user),
    pageSize: int = 10,
    pageNumber: int = 0,
    searchPattern: str = None,
    orderByName:
    int = None,  # 1 means to order by ASC , 2 means to order by DESC, other values or null means not to sort
) -> dict[str, Any]:

    if searchPattern == "":
        searchPattern = None

    if searchPattern is not None:
        searchPattern = "%" + searchPattern + "%"

    result = get_catalog_items_with_paging(auth, pageSize, pageNumber, searchPattern, orderByName)

    return {
        "TotalCount": result.TotalCount,
        "Data": result.Data,
    }
