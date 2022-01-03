import React from "react";
import AppCard from "@crema/core/AppCard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Fonts } from "../../../../shared/constants/AppEnums";

const PromoCard = () => {
  return (
    <AppCard sxStyle={{ height: 1, backgroundColor: "#0A8FDC" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: 1,
        }}
      >
        <Box
          sx={{
            mb: 2,
          }}
        >
          <img src={"/assets/images/dashboard/academy/promo.png"} alt="promo" />
        </Box>
        <Box
          component="p"
          sx={{
            mb: 2,
            fontSize: 14,
            fontWeight: Fonts.MEDIUM,
            color: "#fff",
          }}
        >
          Do you want to get
        </Box>
        <Box
          component="p"
          sx={{
            mb: 3,
            color: "#fff",
          }}
        >
          Better results?
        </Box>
        <Box>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              textTransform: "capitalize",
              "&:hover, &:focus": {
                backgroundColor: "#fff",
                color: "#000",
              },
            }}
          >
            Upgrade
          </Button>
        </Box>
      </Box>
    </AppCard>
  );
};

export default PromoCard;
