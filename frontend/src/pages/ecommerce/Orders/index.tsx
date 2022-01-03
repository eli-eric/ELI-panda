import React, { useEffect, useState } from "react";
import OrderTable from "./OrderTable";
import AppsContainer from "../../../@crema/core/AppsContainer";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { getRecentOrders } from "../../../redux/actions";
import { Button, Hidden } from "@mui/material";
import AppsHeader from "../../../@crema/core/AppsContainer/AppsHeader";
import AppsContent from "../../../@crema/core/AppsContainer/AppsContent";
import AppsPagination from "../../../@crema/core/AppsPagination";
import Box from "@mui/material/Box";
import AppInfoView from "../../../@crema/core/AppInfoView";
import AppSearchBar from "../../../@crema/core/AppSearchBar";
import { AppState } from "../../../redux/store";

const Orders = () => {
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const { recentOrders, orderCount } = useSelector<
    AppState,
    AppState["ecommerce"]
  >(({ ecommerce }) => ecommerce);
  const [page, setPage] = useState(0);
  const [search, setSearchQuery] = useState("");

  const onPageChange = (
    event: React.ChangeEvent<unknown> | null,
    value: number
  ) => {
    setPage(value);
  };
  useEffect(() => {
    dispatch(getRecentOrders(search, page));
  }, [dispatch, search, page]);

  const onSearchOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };
  return (
    <>
      <AppsContainer title={messages["eCommerce.recentOrders"]} fullView>
        <AppsHeader>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            width={1}
            justifyContent="space-between"
          >
            <AppSearchBar
              iconPosition="right"
              overlap={false}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                onSearchOrder(event)
              }
              placeholder={messages["common.searchHere"] as string}
            />
            <Box display="flex" flexDirection="row" alignItems="center">
              <Button variant="contained" color="primary">
                Add Order
              </Button>

              <Hidden smDown>
                <AppsPagination
                  rowsPerPage={10}
                  count={orderCount}
                  page={page}
                  onPageChange={onPageChange}
                />
              </Hidden>
            </Box>
          </Box>
        </AppsHeader>

        <AppsContent
          sx={{
            paddingTop: 2.5,
            paddingBottom: 2.5,
          }}
        >
          <OrderTable orderData={recentOrders} />
        </AppsContent>

        <Hidden smUp>
          <AppsPagination
            rowsPerPage={10}
            count={orderCount}
            page={page}
            onPageChange={onPageChange}
          />
        </Hidden>
      </AppsContainer>
      <AppInfoView />
    </>
  );
};

export default Orders;
