import React from "react";
import { Box, lighten } from "@mui/material";

interface MediaSliderProps {
  children: any;
}

const MediaSlider: React.FC<MediaSliderProps> = ({ children }) => {
  return (
    <Box
      sx={{
        "& .slick-slider": {
          pb: 5,
        },
        "& .slick-slide img": {
          display: "inline-block",
        },
        "& .slick-dots": {
          bottom: 0,
          "& li": {
            width: 10,
            height: 10,
            "& button": {
              width: 10,
              height: 10,
              padding: 0,
            },
            "& button:before": {
              fontSize: 0,
              backgroundColor: (theme) =>
                lighten(theme.palette.common.black, 0.5),
              width: 10,
              height: 10,
              borderRadius: "50%",
            },
          },
        },
      }}
    >
      {children}
    </Box>
  );
};

export default MediaSlider;
