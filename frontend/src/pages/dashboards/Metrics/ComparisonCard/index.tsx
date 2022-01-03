import React from "react";
import ActiveUsersGraph from "./ActiveUsersGraph";
import ExtraRevenueGraph from "./ExtraRevenueGraph";
import TrafficRaiseGraph from "./TrafficRaiseGraph";
import LessOrdersGraph from "./LessOrdersGraph";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCard from "@crema/core/AppCard";

interface ComparisonCardProps {
  data: any;
  text: any;
  bgColor: string;
  headingColor: string;
  valueColor: string;
  type: string;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({
  data,
  text,
  bgColor = "",
  headingColor = "",
  valueColor = "",
  type = "",
}) => {
  const onGetGraph = () => {
    switch (type) {
      case "activeUsers":
        return <ActiveUsersGraph data={data.graphData} />;

      case "extraRevenue":
        return <ExtraRevenueGraph data={data.graphData} />;

      case "trafficRaise":
        return <TrafficRaiseGraph data={data.graphData} />;

      case "lessOrders":
        return <LessOrdersGraph data={data.graphData} />;

      default:
        return <ActiveUsersGraph data={data.graphData} />;
    }
  };

  return (
    <AppCard
      sxStyle={{
        backgroundColor: bgColor,
      }}
      contentStyle={{ padding: 0 }}
    >
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Box
          sx={{
            py: 5,
            px: 6,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <Box
            component="p"
            sx={{
              mb: 4,
              color: headingColor,
              fontWeight: Fonts.BOLD,
              fontSize: 16,
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
            position: "relative",
            mb: -4,
            pt: 4,
          }}
        >
          {onGetGraph()}
        </Box>
      </Box>
    </AppCard>
  );
};

export default ComparisonCard;
