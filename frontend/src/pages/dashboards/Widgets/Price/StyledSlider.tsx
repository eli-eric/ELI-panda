import React from "react";
import Slider from "@mui/material/Slider";

interface SliderProps {
  [x: string]: any;
}

const StyledSlider: React.FC<SliderProps> = ({ rest }) => {
  return (
    <Slider
      sx={{
        root: {
          color: "#E53E3E",
          height: 10,
          padding: "13px 0",
        },
        thumb: {
          height: 27,
          width: 27,
          backgroundColor: "#fff",
          border: "1px solid currentColor",
          marginTop: -10,
          marginLeft: -13,
          boxShadow: "#ebebeb 0px 2px 2px",
          "&:focus,&:hover,&$active": {
            boxShadow: "#ccc 0px 2px 3px 1px",
          },
          "& .bar": {
            // display: inline-block !important;
            height: 9,
            width: 1,
            backgroundColor: "currentColor",
            marginLeft: 1,
            marginRight: 1,
          },
        },
        active: {},
        valueLabel: {
          left: "calc(-50% + 4px)",
        },
        track: {
          height: 10,
        },
        rail: {
          color: "#d8d8d8",
          opacity: 1,
          height: 10,
          borderRadius: 6,
        },
      }}
      {...rest}
    />
  );
};

export default StyledSlider;
