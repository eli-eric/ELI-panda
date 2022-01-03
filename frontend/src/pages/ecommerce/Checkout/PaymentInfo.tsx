import React, { useState } from "react";
import AppCard from "../../../@crema/core/AppCard";
import { Box } from "@mui/material";
import { Fonts } from "../../../shared/constants/AppEnums";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const PaymentInfo = () => {
  const [paymentMode, setPaymentMode] = useState("CARD");
  return (
    <AppCard
      sxStyle={{ mt: 6 }}
      footerStyle={{ marginTop: 2.5 }}
      title={
        <Box sx={{ fontSize: 16, fontWeight: Fonts.BOLD }}>Payment Info</Box>
      }
      footer={
        <Button variant="contained" color="primary" fullWidth>
          Place Order
        </Button>
      }
    >
      <Box>
        <Box onClick={() => setPaymentMode("COD")} className="pointer">
          <Checkbox
            checked={paymentMode === "COD"}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<RadioButtonCheckedIcon />}
            color="primary"
          />
          <Box component="span" sx={{ fontSize: 14, fontWeight: Fonts.MEDIUM }}>
            COD
          </Box>
        </Box>
        {paymentMode === "COD" ? (
          <Box sx={{ ml: 3, mb: 4, color: "text.secondary" }}>
            Cash on delivery
          </Box>
        ) : null}
      </Box>
      <Box>
        <Box onClick={() => setPaymentMode("CARD")} className="pointer">
          <Checkbox
            checked={paymentMode === "CARD"}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<RadioButtonCheckedIcon />}
            color="primary"
          />
          <Box component="span" sx={{ fontSize: 14, fontWeight: Fonts.MEDIUM }}>
            CARD
          </Box>
        </Box>
        {paymentMode === "CARD" ? (
          <Box sx={{ ml: 3, color: "text.secondary" }}>
            <TextField
              margin="dense"
              fullWidth
              id="user-name"
              label="Full Name"
              type="search"
              variant="outlined"
            />
            <TextField
              margin="dense"
              fullWidth
              id="card-number"
              label="Card Number"
              type="search"
              variant="outlined"
            />
            <Box sx={{ display: "flex" }}>
              <TextField
                margin="dense"
                id="expiry-date"
                label="Expiry Date"
                type="search"
                style={{ marginRight: 20 }}
                variant="outlined"
              />
              <TextField
                margin="dense"
                id="card-cvv"
                label="CVV"
                type="password"
                variant="outlined"
              />
            </Box>
          </Box>
        ) : null}
      </Box>
      <Box>
        <Box onClick={() => setPaymentMode("PAYPAL")} className="pointer">
          <Checkbox
            checked={paymentMode === "PAYPAL"}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<RadioButtonCheckedIcon />}
            color="primary"
          />
          <Box component="span" sx={{ fontSize: 14, fontWeight: Fonts.MEDIUM }}>
            PAYPAL
          </Box>
        </Box>
        {paymentMode === "PAYPAL" ? (
          <Box sx={{ ml: 2, color: "text.secondary" }}>
            <TextField
              margin="dense"
              fullWidth
              id="paypal-email"
              label="PayPal email address"
              type="search"
              variant="outlined"
            />
          </Box>
        ) : null}
      </Box>
    </AppCard>
  );
};

export default PaymentInfo;
