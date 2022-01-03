import React from "react";
import AppCard from "@crema/core/AppCard";
import MapChart from "../../Widgets/CountryMap/MapChart";
import { Box } from "@mui/material";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppSelect from "@crema/core/AppSelect";
import { useIntl } from "react-intl";
import { EarningData } from "types/models/dashboards/Analytics";

interface Props {
  earningData: EarningData[];
}

const EarningByCountry: React.FC<Props> = ({ earningData }) => {
  const handleSelectionType = (data: string) => {
    console.log("data: ", data);
  };

  const { messages } = useIntl();
  return (
    <AppCard
      sxStyle={{ height: 1 }}
      title={messages["dashboard.analytics.earningByCountries"]}
      action={
        <AppSelect
          menus={[
            messages["dashboard.thisWeek"],
            messages["dashboard.lastWeeks"],
            messages["dashboard.lastMonth"],
          ]}
          defaultValue={messages["dashboard.thisWeek"]}
          onChange={handleSelectionType}
        />
      }
    >
      <Box
        sx={{
          height: 224,
          "& .map-chart": {
            width: "100%",
            height: "100%",
          },
        }}
      >
        <MapChart />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {earningData.map((data) => (
          <Box
            sx={{
              px: 4.5,
              mb: 2,
            }}
            key={data.id}
          >
            <Box
              component="p"
              sx={{
                mb: 1,
                fontWeight: Fonts.MEDIUM,
                fontSize: 20,
              }}
            >
              ${data.amount}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                component="span"
                sx={{
                  height: { xs: 8, xl: 10 },
                  width: { xs: 8, xl: 10 },
                  borderRadius: "50%",
                  display: "block",
                  backgroundColor: data.color,
                  p: 1,
                  mr: 2,
                }}
              />
              <Box
                component="p"
                sx={{
                  color: "text.secondary",
                  fontSize: 14,
                  textTransform: "capitalize",
                }}
              >
                {data.country}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </AppCard>
  );
};

export default EarningByCountry;
