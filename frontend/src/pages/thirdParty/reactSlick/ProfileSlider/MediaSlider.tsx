import React, { ReactNode } from "react";
import { Box } from "@mui/material";

interface MediaSliderProps {
  children: ReactNode;
}

const MediaSlider: React.FC<MediaSliderProps> = ({ children }) => {
  return (
    <Box
      sx={{
        maxWidth: 320,
        mx: "auto",
        border: (theme) => `solid 1px ${theme.palette.divider}`,
        borderRadius: 2.5,
        py: 10,
        "& .slick-slider": {
          pb: 5,
        },
        "& .slick-slide img": {
          display: "inline-block",
        },
        "& .slick-dots": {
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
