import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { green, red } from "@mui/material/colors";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCard from "../../../../@crema/core/AppCard";
import { CoinData } from "types/models/dashboards/Crypto";

interface CoinStatsProps {
  icon: string;
  bgColor: string;
  data: CoinData;
  heading: any;
}

const CoinStats: React.FC<CoinStatsProps> = ({
  icon,
  bgColor,
  data,
  heading,
}) => {
  return (
    <AppCard
      sxStyle={{
        borderRadius: 4,
      }}
      className="card-hover"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            p: 3,
            fontSize: { xs: 30, md: 48 },
            height: { xs: 46, md: 50, xl: 60 },
            width: { xs: 46, md: 50, xl: 60 },
            backgroundColor: bgColor,
          }}
        >
          <img alt="" src={icon} />
        </Avatar>

        <Box
          sx={{
            position: "relative",
            ml: 4,
          }}
        >
          <Box
            component="p"
            sx={{
              fontSize: 14,
              color: "text.secondary",
              mb: 2,
            }}
          >
            {heading}
          </Box>
          <Box
            component="h3"
            sx={{
              display: "inline-block",
              fontWeight: Fonts.MEDIUM,
              fontSize: 17,
              mr: 3,
            }}
          >
            ${data.price}
          </Box>
          <Box
            component="span"
            sx={{
              fontSize: 16,
              fontWeight: Fonts.MEDIUM,
              color: data.increment > 0.0 ? green[500] : red[500],
            }}
          >
            {data.increment}%
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default CoinStats;
