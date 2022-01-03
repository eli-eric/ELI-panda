import React from "react";
import Box from "@mui/material/Box";
import StaticsGraph from "./StaticsGraph";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCard from "@crema/core/AppCard";
import { ReportCards } from "types/models/dashboards/Ecommerce";

interface ReportCardProps {
  data: ReportCards;
}

const ReportCard: React.FC<ReportCardProps> = ({ data }) => {
  return (
    <AppCard className="card-hover">
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            flex: 1,
            pr: 3,
          }}
        >
          <Box
            component="h3"
            sx={{
              mb: 0.5,
              fontSize: 20,
            }}
          >
            {data.value}
          </Box>
          <Box
            component="p"
            sx={{
              color: "#737989",
            }}
          >
            {data.type}
          </Box>
        </Box>
        <Box
          sx={{
            minWidth: 160,
          }}
        >
          <StaticsGraph
            id={data.id}
            graphData={data.graphData}
            growth={data.growth}
            strokeColor={data.strokeColor}
          />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontWeight={Fonts.BOLD}
            color={data.strokeColor}
          >
            {data.growth > 0 ? (
              <ArrowUpwardIcon style={{ color: data.strokeColor }} />
            ) : (
              <ArrowDownwardIcon style={{ color: data.strokeColor }} />
            )}
            {data.growth}
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default ReportCard;
