import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { AppGridContainer } from "../../../@crema";
import AppCard from "../../../@crema/core/AppCard";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import { Fonts } from "../../../shared/constants/AppEnums";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../../redux/actions";
import OrderSummary from "../OrderSummary";
import DeliveryAddress from "./DeliveryAddress";
import PaymentInfo from "./PaymentInfo";
import { AppState } from "../../../redux/store";

import AppAnimate from "../../../@crema/core/AppAnimate";

const Checkout = () => {
  const dispatch = useDispatch();
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
          sx={{
            // component: 'h2',
            color: "text.primary",
            fontWeight: Fonts.BOLD,
            mb: 6,
            fontSize: 16,
          }}
        >
          <IntlMessages id="sidebar.ecommerce.checkout" />
        </Box>
        <AppGridContainer>
          <Grid item xs={12} md={8}>
            <AppCard
              title={
                <Box sx={{ fontSize: 16, fontWeight: Fonts.BOLD }}>
                  Delivery Address
                </Box>
              }
            >
              <DeliveryAddress />
            </AppCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <OrderSummary cartItems={cartItems} />
            <PaymentInfo />
          </Grid>
        </AppGridContainer>
      </Box>
    </AppAnimate>
  );
};

export default Checkout;
