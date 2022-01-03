import React, { ReactNode } from "react";
import Box from "@mui/material/Box";

interface CourseSliderProps {
  children: ReactNode;
}

const CourseSlider: React.FC<CourseSliderProps> = ({ children }) => {
  return (
    <Box
      sx={{
        position: "relative",
        pb: 5,
        "& .slick-slide img": {
          height: "auto",
          width: "100%",
        },
        "& .slick-dots": {
          padding: "0 16px",
        },
        "& .slick-dots li": {
          width: "33%",
          height: "auto",
          margin: 0,
        },
        "& .slick-dots li button": {
          width: "90%",
          height: 4,
          position: "relative",
          "&:before": {
            width: "100%",
            height: 4,
            content: '""',
            fontSize: 0,
            backgroundColor: "primary.main",
            borderRadius: 30,
            opacity: 0.15,
          },
          "&:hover, &:focus": {
            "&:before": {
              opacity: 0.8,
            },
          },
        },
        "& .slick-dots li.slick-active button": {
          "&:before": {
            opacity: 0.8,
          },
        },
      }}
    >
      {children}
    </Box>
  );
};

export default CourseSlider;
