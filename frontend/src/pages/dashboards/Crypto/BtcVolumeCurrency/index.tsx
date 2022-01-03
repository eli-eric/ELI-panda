import React from "react";
import BtcGraph from "./BtcGraph";
import { Box } from "@mui/material";
import AppCard from "../../../../@crema/core/AppCard";
import { useIntl } from "react-intl";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { BtcChartData } from "types/models/dashboards/Crypto";

interface BtcGraphProps {
  data: BtcChartData[];
}

const BtcVolumeCurrency: React.FC<BtcGraphProps> = ({ data }) => {
  const { messages } = useIntl();
  return (
    <AppCard
      sxStyle={{ height: 1 }}
      title={messages["dashboard.btcVolumeByCurency"]}
    >
      <BtcGraph data={data} />
      <Box
        sx={{
          pl: { xl: 5 },
          pt: 5,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          mb: -4,
        }}
      >
        {data.map((item) => {
          return (
            <Box
              key={item.id}
              sx={{
                px: 3,
                flex: 1,
                mb: 4,
              }}
            >
              <Box
                component="h3"
                sx={{
                  fontSize: 18,
                  fontWeight: Fonts.SEMI_BOLD,
                  color: item.color,
                }}
              >
                {item.value}
              </Box>
              <Box
                component="span"
                sx={{
                  color: "text.secondary",
                  fontSize: 14,
                }}
              >
                {item.name}
              </Box>
            </Box>
          );
        })}
      </Box>
    </AppCard>
  );
};

export default BtcVolumeCurrency;
