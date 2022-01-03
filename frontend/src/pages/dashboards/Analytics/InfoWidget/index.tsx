import React from "react";
import AppCard from "@crema/core/AppCard";
import { Box } from "@mui/material";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { InfoWidgets } from "types/models/dashboards/Analytics";

interface Props {
  data: InfoWidgets;
}

const InfoWidget: React.FC<Props> = ({ data }) => {
  return (
    <AppCard
      sxStyle={{ height: 1, backgroundColor: data.bgColor }}
      contentStyle={{ px: 2 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            mb: 4,
            "& img": {
              height: { xs: 60, md: 70, xl: 80 },
              width: { xs: 60, md: 70, xl: 80 },
            },
          }}
        >
          <img src={data.icon} alt="icon" />
        </Box>
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Box
            component="h3"
            sx={{
              color: "text.primary",
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
            {data.details}
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default InfoWidget;
