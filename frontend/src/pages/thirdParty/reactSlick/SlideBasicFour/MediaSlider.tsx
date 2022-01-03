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
          pb: { xs: 5, md: 0 },
        },
        "& .slick-slide img": {
          display: "inline-block",
        },
        "& .slick-dots": {
          bottom: { xs: 0, md: "auto" },
          top: { md: 0 },
          left: { md: "50%" },
          textAlign: { md: "left" },
          paddingLeft: { md: 5 },
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
