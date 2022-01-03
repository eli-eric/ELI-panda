import React from "react";
import { alpha, Box } from "@mui/material";
import Slider from "react-slick";
import GridItem from "../../Products/ProductListing/ProductGrid/GridItem";
import ecommerce from "../../../../@crema/services/db/ecommerce/ecommerceData";
import MediaSlider from "./MediaSlider";

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,

  responsive: [
    {
      breakpoint: 1536,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 980,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const SimilarProduct = () => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          alpha(theme.palette.background.default, 0.6),
        mt: 2,
      }}
    >
      <MediaSlider>
        <Slider {...settings}>
          {ecommerce.map((item, index) => (
            <Box key={index} sx={{ px: 3, py: 3, height: "100%" }}>
              <GridItem item={item} />
            </Box>
          ))}
        </Slider>
      </MediaSlider>
    </Box>
  );
};

export default SimilarProduct;
