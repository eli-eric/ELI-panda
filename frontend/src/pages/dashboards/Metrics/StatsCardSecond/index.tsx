import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCard from "@crema/core/AppCard";

interface StatsCardSecondProps {
  icon: string;
  bgColor: string;
  text: any;
  value: string;
}

const StatsCardSecond: React.FC<StatsCardSecondProps> = ({
  icon,
  bgColor,
  text,
  value,
}) => {
  return (
    <AppCard
      sxStyle={{
        height: 1,
        textAlign: "center",
      }}
    >
      <Avatar
        sx={{
          padding: 3,
          display: "flex",
          mb: { xs: 4, xl: 6 },
          marginLeft: "auto",
          marginRight: "auto",
          height: { xs: 60 },
          width: { xs: 60 },
          backgroundColor: bgColor,
        }}
      >
        <img src={icon} alt="" />
      </Avatar>
      <Box
        component="h3"
        sx={{
          mb: 2,
          fontSize: 20,
          fontWeight: Fonts.MEDIUM,
        }}
      >
        {value}
      </Box>
      <Box
        component="p"
        sx={{
          mb: 2,
          color: "text.secondary",
          fontSize: 14,
        }}
      >
        {text}
      </Box>
    </AppCard>
  );
};

export default StatsCardSecond;
