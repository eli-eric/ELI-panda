import React from "react";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { Temperatures } from "types/models/dashboards/Widgets";

interface DayTemperatureProps {
  day: Temperatures;
}

const DayTemperature: React.FC<DayTemperatureProps> = ({ day }) => {
  return (
    <Box
      sx={{
        px: 4,
        textAlign: "center",
      }}
    >
      <Box
        component="span"
        sx={{
          mb: 3,
          display: "block",
          fontWeight: Fonts.MEDIUM,
          fontSize: 14,
          textTransform: "uppercase",
        }}
      >
        {day.day}
      </Box>
      <Box
        sx={{
          display: "inline-block",
        }}
      >
        <img src={day.image} alt="weather" />
      </Box>
    </Box>
  );
};

export default DayTemperature;
