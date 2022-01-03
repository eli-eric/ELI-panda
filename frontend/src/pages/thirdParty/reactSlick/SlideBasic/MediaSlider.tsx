import React, { ReactNode } from "react";
import { Box } from "@mui/material";

interface MediaSliderProps {
  children: ReactNode;
}

const MediaSlider: React.FC<MediaSliderProps> = ({ children }) => {
  return (
    <Box
      sx={{
        "& .slick-slider": {
          pb: 5,
        },
        "& .slick-slide img": {
          width: "100%",
          borderRadius: 2.5,
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
              backgroundColor: "primary.main",
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
