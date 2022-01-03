import React from "react";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IntlMessages from "@crema/utility/IntlMessages";
import DayTemperature from "./DayTemperature";
import { teal } from "@mui/material/colors";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCard from "@crema/core/AppCard";
import { Temperatures } from "types/models/dashboards/Widgets";

interface TemperatureCardProps {
  temperatures: Temperatures[];
}

const TemperatureCard: React.FC<TemperatureCardProps> = ({ temperatures }) => {
  return (
    <AppCard
      sxStyle={{ height: 1 }}
      contentStyle={{ padding: 0, display: "flex", flexDirection: "column" }}
    >
      <Box
        sx={{
          py: 5,
          px: 6,
          color: "primary.contrastText",
          flex: 1,
          backgroundColor: teal[500],
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            component="h3"
            sx={{
              fontWeight: Fonts.BOLD,
              fontSize: 16,
            }}
          >
            <IntlMessages id="dashboard.newYork" />
          </Box>
          <Box
            sx={{
              ml: "auto",
            }}
          >
            <SearchIcon
              sx={{
                cursor: "pointer",
                display: "block",
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            py: 4,
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Box
            component="h1"
            sx={{
              fontWeight: Fonts.MEDIUM,
              fontSize: { xs: 24, sm: 36, md: 64, xl: 96 },
            }}
          >
            -32<sup>0</sup>
          </Box>
          <Box
            component="p"
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: 14,
            }}
          >
            <img
              style={{
                marginRight: 12,
              }}
              src={"/assets/images/weather/weather1.png"}
              alt="weather"
            />
            <IntlMessages id="dashboard.heavySnow" />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          py: 5,
          px: 6,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {temperatures.map((day) => {
          return <DayTemperature key={day.id} day={day} />;
        })}
      </Box>
    </AppCard>
  );
};

export default TemperatureCard;
