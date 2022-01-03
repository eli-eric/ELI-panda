import React, { JSXElementConstructor, ReactElement } from "react";
import { momentLocalizer } from "react-big-calendar";
import events from "../events";
import moment from "moment";
import { StyledCalendar } from "../calandar.style";

interface ColoredDateCellWrapperProps {
  children?: ReactElement<any, string | JSXElementConstructor<any>>;
}

// @ts-ignore
const ColoredDateCellWrapper: React.FC<ColoredDateCellWrapperProps> = ({
  children,
}) =>
  React.cloneElement(React.Children.only(children) as any, {
    style: {
      backgroundColor: "lightblue",
    },
  });
const localizer = momentLocalizer(moment);
const BasicCalendar = () => {
  return (
    <StyledCalendar
      events={events}
      step={60}
      showMultiDayTimes
      defaultDate={new Date(2019, 10, 1)}
      components={{
        timeSlotWrapper: ColoredDateCellWrapper,
      }}
      localizer={localizer}
    />
  );
};

export default BasicCalendar;
