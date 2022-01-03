import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCard from "@crema/core/AppCard";

interface StatsCardProps {
  icon: string;
  bgColor: string;
  text: any;
  value: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
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
          display: "flex",
          p: { xs: 3, xl: 4 },
          mb: { xs: 4, md: 5 },
          mx: "auto",
          height: 60,
          width: 60,
          backgroundColor: bgColor,
        }}
      >
        <img src={icon} alt="" />
      </Avatar>
      <Box
        component="p"
        sx={{
          color: "text.secondary",
          mb: 2,
          fontSize: 14,
        }}
      >
        {text}
      </Box>
      <Box
        component="h3"
        sx={{
          fontWeight: Fonts.MEDIUM,
          fontSize: 20,
        }}
      >
        {value}
      </Box>
    </AppCard>
  );
};

export default StatsCard;
