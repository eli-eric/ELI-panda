import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCard from "../../../../@crema/core/AppCard";

interface StatsCardProps {
  icon: string;
  bgColor?: string;
  heading: any;
  data: {
    count: string;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, data, heading }) => {
  return (
    <AppCard
      className="card-hover"
      sxStyle={{
        borderRadius: 4,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ fontSize: { xs: 36, md: 48 } }}>
          <Avatar
            sx={{
              height: { xs: 50, md: 60 },
              width: { xs: 50, md: 60 },
              backgroundColor: "transparent",
            }}
          >
            <img src={icon} alt="icon" />
          </Avatar>
        </Box>
        <Box
          sx={{
            ml: 4,
          }}
        >
          <Box
            component="h3"
            sx={{
              fontWeight: Fonts.MEDIUM,
              fontSize: 18,
            }}
          >
            {data.count}
          </Box>
          <Box
            component="p"
            sx={{
              color: "text.secondary",
            }}
          >
            {heading}
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default StatsCard;
