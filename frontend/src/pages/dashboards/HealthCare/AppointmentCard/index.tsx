import React from "react";
import AppCard from "@crema/core/AppCard";
import { Box } from "@mui/material";
import Graph from "./Graph";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { AppointmentCards } from "types/models/dashboards/HealthCare";

interface AppointmentCardProps {
  data: AppointmentCards;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ data }) => {
  return (
    <AppCard sxStyle={{ backgroundColor: data.color }} className="card-hover">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          color: "white",
        }}
      >
        <Box
          sx={{
            width: 1 / 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box>
            <img src={data.icon} alt={data.name} />
          </Box>
          <Box
            sx={{
              py: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            {data.name}
          </Box>
          <Box
            sx={{
              fontSize: 20,
              fontWeight: Fonts.BOLD,
            }}
          >
            {data.value}
          </Box>
        </Box>
        <Box
          sx={{
            width: 1 / 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowUpwardIcon
              sx={{
                fontSize: 18,
                marginRight: 2,
              }}
            />
            <Box>{data.chartValue}</Box>
          </Box>
          <Box
            sx={{
              fontSize: 12,
              mb: 3,
              fontWeight: Fonts.BOLD,
              textAlign: "right",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            {data.chartTime}
          </Box>
          <Graph data={data.chartData} />
        </Box>
      </Box>
    </AppCard>
  );
};

export default AppointmentCard;
