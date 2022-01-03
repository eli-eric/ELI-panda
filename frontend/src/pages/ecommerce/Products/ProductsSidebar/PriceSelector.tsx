import React from "react";
import Slider from "@mui/material/Slider";
import { Box } from "@mui/material";
import { Fonts } from "../../../../shared/constants/AppEnums";
import styled from "@emotion/styled";

const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";
const PriceSlider = styled(Slider)(() => ({
  color: "primary.main",
  height: 8,
  padding: "10px 0",
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    boxShadow: iOSBoxShadow,
    "&:focus, &:hover, &.Mui-active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: -6,
    backgroundColor: "unset",
    color: "text.primary",
    "&:before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
      // color: theme.palette.mode === "dark" ? "#fff" : "#000",
    },
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#bfbfbf",
    height: 8,
    width: 1,
    "&.MuiSlider-markActive": {
      opacity: 1,
      backgroundColor: "currentColor",
    },
  },
}));

const PriceSelector = () => {
  const [value, setValue] = React.useState<number[]>([50, 400]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  return (
    <>
      <PriceSlider value={value} max={500} onChange={handleChange} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            fontWeight: Fonts.MEDIUM,
          }}
        >
          $ {value[0]}
        </Box>
        <Box
          sx={{
            fontWeight: Fonts.MEDIUM,
          }}
        >
          $ {value[1]}
        </Box>
      </Box>
    </>
  );
};

export default PriceSelector;
