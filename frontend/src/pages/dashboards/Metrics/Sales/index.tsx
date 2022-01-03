import React from "react";
import SalesGraph from "./SalesGraph";
import IntlMessages from "@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCard from "@crema/core/AppCard";
import { useIntl } from "react-intl";
import { SalesData } from "types/models/dashboards/Metrics";

interface SalesProps {
  data: SalesData;
}

const Sales: React.FC<SalesProps> = ({ data }) => {
  const { messages } = useIntl();
  return (
    <AppCard
      title={messages["dashboard.salesToday"]}
      sxStyle={{ height: 1 }}
      contentStyle={{ display: "flex", flexDirection: "column" }}
    >
      <Box
        component="h2"
        sx={{
          mb: 2,
          color: "text.secondary",
          fontWeight: Fonts.MEDIUM,
          fontSize: { xs: 24, md: 38, xl: 36 },
        }}
      >
        {data.salesToday}
      </Box>
      <Box
        component="p"
        sx={{
          color: "secondary.main",
          fontSize: 14,
        }}
      >
        {data.salesYesterday} <IntlMessages id="common.yesterday" />
      </Box>
      <Box
        sx={{
          mt: "auto",
        }}
      >
        <SalesGraph data={data.salesGraphData} />
      </Box>
    </AppCard>
  );
};

export default Sales;
