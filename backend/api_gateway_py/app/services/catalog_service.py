from __future__ import annotations

from typing import Any, List

from fastapi import Depends
from fastapi.exceptions import HTTPException
from psycopg.rows import TupleRow, class_row

from app.core.auth import AuthUser, get_current_user
from app.core.database import dbConnection
from app.models.catalog_models import CatalogItemPaged, CatalogItemPagingResponse, CatalogItemResponse


def get_all_items(auth: AuthUser) -> dict[str, Any]:

    response: dict[str, Any] = {"data": [1, "test"]}

    # todo DB logic here - will return List of CatalogItem

    return response

def get_catalog_items_with_paging(
    auth: AuthUser,
    pageSize: int,
    pageNumber: int,
    searchPattern: str | None,
    orderByName: int | None,
) -> CatalogItemPagingResponse:

    result = CatalogItemPagingResponse()
    result.Data = []

    # Connect to an existing database
    with dbConnection() as conn:
        # Open a cursor to perform database operations
        with conn.cursor(row_factory=class_row(CatalogItemPaged)) as cur:

            # get data
            cur.execute(
                """
            select * from panda.f_get_catalog_items_paged(%s,%s,%s,%s)
            """,
                (
                    pageSize,
                    pageNumber,
                    searchPattern,                    
                    orderByName,
                ),
            )
            # return all the data from the SQL query as a List of CatalogItemPaged and transform it to the CatalogItemResponse
            dbData = cur.fetchall()
            for dbRow in dbData:
                resData = CatalogItemResponse()                
                resData.id = dbRow.ID
                resData.Name = dbRow.Name
                resData.Category = dbRow.Category
                resData.Availability = dbRow.Availability
                resData.Facility = dbRow.Facility
                resData.EstimatedPrice = dbRow.EstimatedPrice
                resData.Manufacturer = dbRow.Manufacturer
                resData.Note = dbRow.Note
                resData.SupportedToDate = dbRow.SupportedToDate
                resData.TypicalAvailableInDays = dbRow.TypicalAvailableInDays
                result.Data.append(resData)

        with conn.cursor() as cur:
            # get total rows without paging
            cur.execute(
                """
            select "Count" from panda.f_get_catalog_items_count(%s)
            """,
                (
                    searchPattern,
                ),
            )            
            result.TotalCount = cur.fetchone()[0]

    return result
