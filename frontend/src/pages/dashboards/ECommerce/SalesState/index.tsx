import React from "react";
import { Box, Typography } from "@mui/material";
import AppCard from "@crema/core/AppCard";
import { SalesStateData } from "types/models/dashboards/Ecommerce";

interface SalesStateProps {
  state: SalesStateData;
}

const SalesState: React.FC<SalesStateProps> = (props) => {
  const { bgColor, icon, type, value } = props.state;

  return (
    <AppCard
      sxStyle={{
        backgroundColor: bgColor,
        height: 1,
      }}
      className="card-hover"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            mr: 4,
            alignSelf: "flex-start",
            "& img": {
              display: "block",
              width: { xs: "auto", lg: 50, xl: "auto" },
            },
          }}
        >
          <img src={icon} alt="icon" />
        </Box>
        <Box
          sx={{
            flex: 1,
            color: "white",
          }}
        >
          <Typography
            component="h3"
            variant="inherit"
            sx={{
              color: "inherit",
            }}
          >
            {value}
          </Typography>
          <Box
            sx={{
              mt: 0.5,
            }}
            component="p"
          >
            {type}
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default SalesState;
