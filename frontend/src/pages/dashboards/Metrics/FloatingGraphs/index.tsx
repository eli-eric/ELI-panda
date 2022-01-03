import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import GraphFile from "./GraphFile";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { green } from "@mui/material/colors";
import AppCard from "@crema/core/AppCard";
import { MetricsFloatingChildData } from "types/models/dashboards/Metrics";

interface FloatingGraphsProps {
  data: MetricsFloatingChildData;
  title: any;
}

const FloatingGraphs: React.FC<FloatingGraphsProps> = ({ data, title }) => {
  return (
    <AppCard sxStyle={{ height: 1, textAlign: "center" }}>
      <Box
        component="p"
        sx={{
          mb: 3,
          color: "text.secondary",
          fontSize: 14,
        }}
      >
        {title}
      </Box>
      <Box
        component="h3"
        sx={{
          fontWeight: Fonts.MEDIUM,
          fontSize: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="span"
          sx={{
            px: 3,
          }}
        >
          {data.value}
        </Box>
        {data.change > 0 ? (
          <Box
            component="span"
            sx={{
              display: "flex",
              alignItems: "center",
              color: green[500],
              fontWeight: Fonts.MEDIUM,
              mt: 1,
              fontSize: 16,
            }}
          >
            <Box
              component="span"
              sx={{
                fontWeight: Fonts.LIGHT,
                fontSize: 14,
              }}
            >
              <ArrowUpwardIcon />
            </Box>
            <Box
              component="span"
              sx={{
                ml: 1,
                mb: 1,
              }}
            >
              {data.change}
            </Box>
          </Box>
        ) : (
          <Box
            component="span"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "secondary.main",
              fontWeight: Fonts.MEDIUM,
              mt: 1,
              fontSize: 16,
            }}
          >
            <Box
              component="span"
              sx={{
                fontWeight: Fonts.LIGHT,
                fontSize: 14,
              }}
            >
              <ArrowDownwardIcon />
            </Box>
            <Box
              component="span"
              sx={{
                ml: 1,
                mb: 1,
              }}
            >
              {data.change}
            </Box>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          m: -8,
          mt: -2,
        }}
      >
        <GraphFile
          data={data.graphData}
          strokeColor={data.strokeColor}
          areaColor={data.areaColor}
        />
      </Box>
    </AppCard>
  );
};

export default FloatingGraphs;
