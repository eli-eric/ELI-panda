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
            transition: "all 0.4s ease",
            "& button": {
              width: 10,
              height: 10,
              padding: 0,
              transition: "all 0.4s ease",
            },
            "& button:before": {
              fontSize: 0,
              backgroundColor: "primary.main",
              width: 10,
              height: 10,
              borderRadius: "50%",
              transition: "all 0.4s ease",
            },
            "&.slick-active": {
              width: 20,
              "& button": {
                width: 20,
              },
              "& button:before": {
                width: 20,
                borderRadius: 10,
              },
            },
          },
        },
        "& .slick-prev, & .slick-next": {
          backgroundColor: (theme) => theme.palette.common.white,
          width: 30,
          height: 30,
          borderRadius: "50%",
          display: "flex !important",
          alignItems: "center",
          justifyContent: "center",
          "&:hover, &:focus": {
            backgroundColor: (theme) => theme.palette.common.white,
          },
          "&:before": {
            color: (theme) => theme.palette.common.black,
            fontSize: 0,
            backgroundImage: `url('/assets/images/arrow-prev.svg')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            width: 20,
            height: 20,
            display: "block",
            mr: 1,
          },
        },
        "& .slick-next": {
          right: 15,
          zIndex: 1,
          "&:before": {
            backgroundImage: `url('/assets/images/arrow-next.svg')`,
            mr: 0,
            ml: 0.75,
          },
        },
        "& .slick-prev": {
          left: 15,
          zIndex: 1,
        },
      }}
    >
      {children}
    </Box>
  );
};

export default MediaSlider;
