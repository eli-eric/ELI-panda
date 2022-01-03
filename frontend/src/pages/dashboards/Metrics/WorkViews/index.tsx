import React from "react";
import WorkViewsGraph from "./WorkViewsGraph";
import IntlMessages from "@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCard from "@crema/core/AppCard";
import { WorkViewsData } from "types/models/dashboards/Metrics";

interface WorkViewsProps {
  data: WorkViewsData;
}

const WorkViews: React.FC<WorkViewsProps> = ({ data }) => {
  return (
    <AppCard
      sxStyle={{ height: 1 }}
      contentStyle={{ display: "flex", flexDirection: "column" }}
    >
      <Box
        component="h3"
        sx={{
          mb: 1,
          color: "secondary.main",
          fontSize: 20,
          fontWeight: Fonts.MEDIUM,
        }}
      >
        {data.views}
      </Box>
      <Box
        component="p"
        sx={{
          color: "text.secondary",
          fontSize: 14,
          fontWeight: Fonts.REGULAR,
        }}
      >
        <IntlMessages id="dashboard.workViews" />
      </Box>

      <Box
        sx={{
          mt: "auto",
        }}
      >
        <WorkViewsGraph data={data.graphData} />
      </Box>
    </AppCard>
  );
};

export default WorkViews;
