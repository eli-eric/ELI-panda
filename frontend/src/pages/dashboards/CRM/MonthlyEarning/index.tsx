import React from "react";
import EarningGraph from "./EarningGraph";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Categories from "./Categories";
import AppCard from "../../../../@crema/core/AppCard";
import { useIntl } from "react-intl";
import { EarningGraphData } from "types/models/dashboards/CRM";

interface MonthlyEarningProps {
  earningGraphData: EarningGraphData[];
}

export const MonthlyEarning: React.FC<MonthlyEarningProps> = ({
  earningGraphData,
}) => {
  const { messages } = useIntl();

  return (
    <AppCard
      sxStyle={{ height: 1 }}
      title={messages["dashboard.earningInMonth"]}
    >
      <Box
        sx={{
          "& text": {
            fill: (theme) => theme.palette.text.primary,
          },
        }}
      >
        <EarningGraph earningGraphData={earningGraphData} />
      </Box>
      <Divider />
      <Box
        sx={{
          pt: 3,
        }}
      >
        <List>
          {earningGraphData.map((category) => {
            if (category.name !== "") {
              return <Categories category={category} key={category.name} />;
            }
            return null;
          })}
        </List>
      </Box>
    </AppCard>
  );
};

export default MonthlyEarning;
