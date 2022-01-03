import React from "react";
import EarningGraph from "./EarningGraph";
import Box from "@mui/material/Box";
import Categories from "./Categories";
import AppCard from "@crema/core/AppCard";
import { useIntl } from "react-intl";
import { EarningInMonthData } from "types/models/dashboards/Metrics";

interface EarningInMonthProps {
  data: EarningInMonthData[];
}

const EarningInMonth: React.FC<EarningInMonthProps> = ({ data }) => {
  const { messages } = useIntl();
  return (
    <AppCard
      title={messages["dashboard.earningInMonth"]}
      footer={<Categories data={data} />}
      sxStyle={{ height: 1 }}
    >
      <Box
        sx={{
          my: 3,
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          "& .recharts-wrapper": {
            width: "260px !important",
            height: "260px !important",
            alignSelf: "center",
            "& .recharts-surface": {
              width: "260px !important",
              height: "260px !important",
            },
          },
        }}
      >
        <EarningGraph data={data} />
      </Box>
    </AppCard>
  );
};

export default EarningInMonth;
