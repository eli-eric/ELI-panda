import React from "react";
import { momentLocalizer } from "react-big-calendar";
import events from "../events";
import moment from "moment";
import { StyledCalendar } from "../calandar.style";
import Box from "@mui/material/Box";

const localizer = momentLocalizer(moment);

const Selectable = () => {
  return (
    <div className="app-calendar app-cul-calendar">
      <Box sx={{ mb: 3 }}>
        Click an event to see more info, or drag the mouse over the calendar to
        select a date/time range.
      </Box>
      <StyledCalendar
        selectable
        events={events}
        localizer={localizer}
        defaultView="week"
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={new Date(2019, 10, 12)}
        onSelectEvent={(event) => alert(event)}
        onSelectSlot={(slotInfo) =>
          alert(
            `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
              `\nend: ${slotInfo.end.toLocaleString()}` +
              `\naction: ${slotInfo.action}`
          )
        }
      />
    </div>
  );
};

export default Selectable;
