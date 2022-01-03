import React from "react";
import { Box } from "@mui/material";

interface CalendarWrapperProp {
  children: any;
}

const CalendarWrapper: React.FC<CalendarWrapperProp> = ({ children }) => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        position: "relative",
        "& .PrivatePickersToolbar-root": {
          display: "none",
        },
        "& > div": {
          minWidth: 100,
          height: "100%",
          "& > div": {
            height: "100%",
            "& > div, & .MuiCalendarPicker-root": {
              height: "100%",
              maxHeight: 360,
              width: "100%",
            },
          },
        },
        "& .PrivatePickersFadeTransitionGroup-root": {
          height: "100%",
          "& > div": {
            height: "100%",
            "& > div": {
              justifyContent: "space-around",
            },
          },
        },
        "& .PrivatePickersSlideTransition-root": {
          height: "calc(100% - 40px)",
          "& > div": {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            "& > div": {
              justifyContent: "space-around",
            },
          },
        },
        "& .MuiButtonBase-root": {
          padding: "3px",
          color: "text.primary",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default CalendarWrapper;
