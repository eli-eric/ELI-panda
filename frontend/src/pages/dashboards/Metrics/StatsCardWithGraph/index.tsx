import React from "react";
import IncomeGraph from "./IncomeGraph";
import WebTrafficGraph from "./WebTrafficGraph";
import RevenueGrowthGraph from "./RevenueGrowthGraph";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCard from "@crema/core/AppCard";
import {
  IncomeLastYear,
  RevenueGrowthData,
  WebsiteTrafficData,
} from "types/models/dashboards/Metrics";

interface StatsCardWithGraphProps {
  data: IncomeLastYear | WebsiteTrafficData | RevenueGrowthData;
  text: any;
  bgColor?: string;
  headingColor: string;
  valueColor: string;
  type: string;
}

const StatsCardWithGraph: React.FC<StatsCardWithGraphProps> = ({
  data,
  text,
  bgColor,
  headingColor,
  valueColor,
  type,
}) => {
  const onGetGraph = () => {
    switch (type) {
      case "incomeGraph":
        return <IncomeGraph data={data.graphData} />;

      case "trafficGraph":
        return <WebTrafficGraph data={data.graphData} />;

      case "revenueGrowth":
        return <RevenueGrowthGraph data={data.graphData} />;

      default:
        return <IncomeGraph data={data.graphData} />;
    }
  };

  return (
    <AppCard
      sxStyle={{
        backgroundColor: bgColor,
        height: 1,
      }}
    >
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <Box
            component="p"
            sx={{
              color: headingColor,
              fontSize: 16,
              fontWeight: Fonts.BOLD,
              mb: { xs: 4, md: 6 },
            }}
          >
            {text}
          </Box>
          <Box
            component="h3"
            sx={{
              color: valueColor,
              fontSize: 20,
              fontWeight: Fonts.MEDIUM,
            }}
          >
            {data.value}
          </Box>
        </Box>
        <Box
          sx={{
            pl: -10,
            mr: -8,
            mb: -10,
          }}
        >
          {onGetGraph()}
        </Box>
      </Box>
    </AppCard>
  );
};

export default StatsCardWithGraph;
