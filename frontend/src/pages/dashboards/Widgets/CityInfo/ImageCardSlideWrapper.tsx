import React from "react";
import { Box } from "@mui/material";

interface ImageCardSlideWrapperProp {
  children: any;
}

const ImageCardSlideWrapper: React.FC<ImageCardSlideWrapperProp> = ({
  children,
}) => {
  return (
    <Box
      sx={{
        height: "100%",
        "& .imageCardSlide": {
          position: "relative",
          paddingBottom: 0,
          height: "100%",
          "& .slick-list, & .slick-track, & .slick-slide > div": {
            height: "100%",
          },
          "& .slick-dots": {
            bottom: 30,
          },
          "& .slick-dots li": {
            mx: 1.5,
          },
          "& .slick-dots li button": {
            width: { xs: 10, xl: 14 },
            height: { xs: 10, xl: 14 },
          },
          "& .slick-dots li button:before": {
            color: "transparent",
            border: "solid 2px #fff",
            opacity: 1,
            borderRadius: "50%",
            width: { xs: 10, xl: 14 },
            height: { xs: 10, xl: 14 },
          },
          "& .slick-dots li.slick-active button:before": {
            backgroundColor: (theme) => theme.palette.primary.main,
            borderColor: (theme) => theme.palette.primary.main,
          },
          "& .slick-prev": {
            top: 32,
            left: 36,
            zIndex: 3,
          },
          "& .slick-next": {
            top: 32,
            right: 36,
            zIndex: 3,
          },
        },
      }}
    >
      {children}
    </Box>
  );
};

export default ImageCardSlideWrapper;
