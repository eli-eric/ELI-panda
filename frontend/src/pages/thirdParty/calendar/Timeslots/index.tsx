import React from "react";
import { momentLocalizer } from "react-big-calendar";
import events from "../events";
import moment from "moment";
import { StyledCalendar } from "../calandar.style";

const localizer = momentLocalizer(moment);

interface TimeslotsProps {
  [x: string]: any;
}

const Timeslots: React.FC<TimeslotsProps> = (props) => {
  return (
    <StyledCalendar
      {...props}
      events={events}
      localizer={localizer}
      step={15}
      timeslots={8}
      defaultView="week"
      defaultDate={new Date(2019, 10, 12)}
    />
  );
};

export default Timeslots;
