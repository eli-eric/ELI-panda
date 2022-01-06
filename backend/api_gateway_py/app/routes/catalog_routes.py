from __future__ import annotations
from typing import Any
from app.models.catalog_models import CatalogItem, CatalogItemResponse
from fastapi import APIRouter, Depends

from app.services.catalog_service import get_all_items
from app.core.auth import get_current_user


router = APIRouter()
apiUrl = "/catalog-items/"


@router.get(apiUrl,response_model=CatalogItemResponse ,tags=["catalog"])
async def get_all_catalog_items(auth: Depends = Depends(get_current_user),) -> dict[str, Any]:
    return get_all_items(auth)

