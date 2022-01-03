import React from "react";
import AppCard from "../../../@crema/core/AppCard";
import { Box } from "@mui/material";
import { Fonts } from "../../../shared/constants/AppEnums";
import Divider from "@mui/material/Divider";
import { useIntl } from "react-intl";
import AppAnimate from "../../../@crema/core/AppAnimate";
import { CartItems } from "../../../types/models/ecommerce/EcommerceApp";

const getTotalPrice = (cartItems: CartItems[]) => {
  let total = 0;
  cartItems.map((data) => {
    total = total + (+data.mrp - +data.discount) * +data.count;
    return data;
  });
  return total;
};

interface OrderSummaryProps {
  cartItems: CartItems[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cartItems }) => {
  const { messages } = useIntl();
  const totalPrice = getTotalPrice(cartItems);
  return (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <AppCard
        title={
          <Box fontSize={16} fontWeight={Fonts.BOLD}>
            {messages["ecommerce.orderSummary"]}
          </Box>
        }
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            fontWeight: Fonts.MEDIUM,
            mt: 2,
            mb: 4,
          }}
        >
          <Box sx={{ color: "text.secondary" }}>Grand Total: </Box>
          <Box>${totalPrice}</Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            fontWeight: Fonts.MEDIUM,
            mb: 4,
          }}
        >
          <Box sx={{ color: "text.secondary" }}>Discount: </Box>
          <Box>$4</Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            fontWeight: Fonts.MEDIUM,
            mb: 4,
          }}
        >
          <Box sx={{ color: "text.secondary" }}>Shipping Charge: </Box>
          <Box>$4</Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            fontWeight: Fonts.MEDIUM,
            mb: 4,
          }}
        >
          <Box sx={{ color: "text.secondary" }}>Estimated Tax: </Box>
          <Box>$1</Box>
        </Box>

        <Divider />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            fontWeight: Fonts.MEDIUM,
            my: 4,
          }}
        >
          <Box sx={{ color: "text.secondary" }}>Order Total: </Box>
          <Box>${totalPrice + 1}</Box>
        </Box>
      </AppCard>
    </AppAnimate>
  );
};

export default OrderSummary;
