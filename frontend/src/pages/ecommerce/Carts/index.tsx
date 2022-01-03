import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

import { AppGridContainer } from "../../../@crema";
import CartTable from "./CartTable";
import AppCard from "../../../@crema/core/AppCard";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import { Fonts } from "../../../shared/constants/AppEnums";
import { getCartItems } from "../../../redux/actions";
import OrderSummary from "../OrderSummary";
import AppAnimate from "../../../@crema/core/AppAnimate";
import { AppState } from "../../../redux/store";

const Carts = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { cartItems } = useSelector<AppState, AppState["ecommerce"]>(
    ({ ecommerce }) => ecommerce
  );

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  return (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <Box>
        <Box
          component="h2"
          sx={{
            color: "text.primary",
            fontWeight: Fonts.BOLD,
            mb: 6,
            fontSize: 16,
          }}
        >
          <IntlMessages id="sidebar.ecommerce.cart" />
        </Box>
        <AppGridContainer>
          <Grid item xs={12} md={8}>
            <AppCard
              contentStyle={{ px: 0 }}
              footer={
                <Box
                  sx={{
                    mt: 4,
                    width: 1,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      history.push("/ecommerce/products");
                    }}
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      history.push("/ecommerce/checkout");
                    }}
                  >
                    Checkout
                  </Button>
                </Box>
              }
            >
              <CartTable cartItems={cartItems} />
            </AppCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <OrderSummary cartItems={cartItems} />
          </Grid>
        </AppGridContainer>
      </Box>
    </AppAnimate>
  );
};

export default Carts;
