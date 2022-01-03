import React from "react";
import AppCard from "@crema/core/AppCard";
import { alpha, Box } from "@mui/material";
import ViewGraph from "./ViewGraph";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { HeartCard } from "types/models/dashboards/HealthCare";

interface HeartRateProps {
  data: HeartCard;
}

const HeartRate: React.FC<HeartRateProps> = ({ data }) => {
  return (
    <AppCard sxStyle={{ backgroundColor: data.color }}>
      <Box
        sx={{
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            fontSize: 16,
            fontWeight: Fonts.BOLD,
          }}
        >
          {data.title}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: 1,
            mb: -10,
          }}
        >
          <Box
            sx={{
              width: { xs: 3 / 4, xl: 1 / 2 },
            }}
          >
            <ViewGraph data={data.graphData} />
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: (theme) => alpha(theme.palette.common.black, 0.04),
            margin: "0 -24px -20px",
            padding: { xs: "12px 24px", xl: "8px 24px" },
            fontSize: { xs: 20, xl: 24 },
            fontWeight: Fonts.BOLD,
          }}
        >
          {data.measurement}
          <Box
            sx={{
              fontSize: 16,
              ml: 2,
            }}
            component="span"
          >
            {data.unit}
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default HeartRate;
