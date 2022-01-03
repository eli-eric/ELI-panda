import React from "react";
import { momentLocalizer } from "react-big-calendar";
import events from "../events";
import moment from "moment";
import { StyledCalendar } from "../calandar.style";
import Box from "@mui/material/Box";

const localizer = momentLocalizer(moment);

const Popup = () => {
  return (
    <Box className="app-calendar app-cul-calendar">
      <Box sx={{ mb: 3 }}>
        Click the +x more link on any calendar day that cannot fit all the days
        events to see an inline popup of all the events.
      </Box>
      <StyledCalendar
        popup
        localizer={localizer}
        events={events}
        defaultDate={new Date(2019, 10, 1)}
      />
    </Box>
  );
};

export default Popup;
