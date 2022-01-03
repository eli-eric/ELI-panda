import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

interface CourseSliderProps {
  children: any;
}

const CourseSlider: React.FC<CourseSliderProps> = ({ children }) => {
  return (
    <Box
      sx={{
        position: "relative",
        "& .slideRoot": {
          paddingBottom: 0,
          mx: { sm: -3 },
          "& .slick-slide": {
            "&  img": {
              height: "auto",
            },
          },
          "& .slick-prev, & .slick-next": {
            top: -25,
            "&:before": {
              color: (theme) => theme.palette.text.primary,
            },
          },
          "& .slick-prev": {
            right: 32,
            left: "auto",
          },
          "& .slick-next": {
            right: 10,
          },
        },
      }}
    >
      {children}
    </Box>
  );
};

export default CourseSlider;

CourseSlider.propTypes = {
  children: PropTypes.node.isRequired,
};
