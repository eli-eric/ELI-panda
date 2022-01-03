import React from "react";
import { Box } from "@mui/material";
import OrderPlaced from "./OrderPlaced";
import AddressInfo from "./AddressInfo";
import { addresses } from "../../../@crema/services/db/ecommerce/ecommerceData";
import { useSelector } from "react-redux";
import ItemsList from "./ItemsList";
import AppAnimate from "../../../@crema/core/AppAnimate";
import { AppState } from "../../../redux/store";
import { CartItems } from "types/models/ecommerce/EcommerceApp";

export const getTotalPrice = (cartItems: CartItems[]) => {
  let total = 0;
  cartItems.map((data) => {
    total = total + (+data.mrp - +data.discount) * +data.count;
    return data;
  });
  return total;
};

const Confirmation = () => {
  const { cartItems } = useSelector<AppState, AppState["ecommerce"]>(
    ({ ecommerce }) => ecommerce
  );
  return (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <Box>
        <OrderPlaced cartItems={cartItems} />
        <AddressInfo address={addresses[0]} />
        <ItemsList cartItems={cartItems} />
      </Box>
    </AppAnimate>
  );
};

export default Confirmation;
