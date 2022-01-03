import React, { useEffect, useState } from "react";
import AppsHeader from "../../../../@crema/core/AppsContainer/AppsHeader";
import ProductHeader from "../ProductHeader";
import { useDispatch, useSelector } from "react-redux";
import { VIEW_TYPE } from "../../../../redux/reducers/Ecommerce";
import ProductGrid from "./ProductGrid/index";

import ProductList from "./ProductList";
import AppsContent from "../../../../@crema/core/AppsContainer/AppsContent";
import { alpha, Box, Hidden } from "@mui/material";
import { useThemeContext } from "../../../../@crema/utility/AppContextProvider/ThemeContextProvider";
import { onGetEcommerceData, setFilters } from "../../../../redux/actions";
import AppsFooter from "../../../../@crema/core/AppsContainer/AppsFooter";
import AppsPagination from "../../../../@crema/core/AppsPagination";
import { AppState } from "../../../../redux/store";

const ProductListing = () => {
  const dispatch = useDispatch();
  const { theme } = useThemeContext();
  const [page, setPage] = useState<number>(0);

  const { viewType, ecommerceList, filterData } = useSelector<
    AppState,
    AppState["ecommerce"]
  >(({ ecommerce }) => ecommerce);

  const list = ecommerceList,
    total = ecommerceList.length;
  const { loading } = useSelector<AppState, AppState["common"]>(
    ({ common }) => common
  );

  useEffect(() => {
    dispatch(onGetEcommerceData({ ...filterData, page }));
  }, [dispatch, filterData, page]);

  const onPageChange = (value: number) => {
    setPage(value);
  };

  const searchProduct = (title: string) => {
    dispatch(setFilters({ ...filterData, title }));
  };
  return (
    <>
      <AppsHeader>
        <ProductHeader
          list={list}
          viewType={viewType}
          page={page}
          totalProducts={total}
          onPageChange={onPageChange}
          onSearch={searchProduct}
        />
      </AppsHeader>

      <AppsContent
        style={{
          backgroundColor: alpha(theme.palette.background.default, 0.6),
        }}
      >
        <Box
          sx={{
            width: "100%",
            flex: 1,
            display: "flex",
            py: 2,
            px: 4,
            height: 1,
            "& > div": {
              width: "100%",
            },
          }}
        >
          {viewType === VIEW_TYPE.GRID ? (
            <ProductGrid ecommerceList={list} loading={loading} />
          ) : (
            <ProductList ecommerceList={list} loading={loading} />
          )}
        </Box>
      </AppsContent>
      <Hidden smUp>
        {list.length > 0 ? (
          <AppsFooter>
            <AppsPagination
              count={total}
              rowsPerPage={10}
              page={page}
              onPageChange={(
                event: React.MouseEvent<HTMLButtonElement> | null,
                page: number
              ) => onPageChange(page)}
            />
          </AppsFooter>
        ) : null}
      </Hidden>
    </>
  );
};

export default ProductListing;
