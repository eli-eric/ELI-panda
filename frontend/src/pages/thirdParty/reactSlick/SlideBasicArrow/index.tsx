import React from "react";
import Slider from "react-slick";
import Box from "@mui/material/Box";
import AppCard from "../../../../@crema/core/AppCard";
import MediaSlider from "./MediaSlider";
import { SlideBasic } from "../../../../@crema/services/db/thirdParty/reactSlick";

const settings = {
  dots: true,
  arrows: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

interface SlideBasicArrowProps {
  slideBasicArrow: SlideBasic[];
}

const SlideBasicArrow: React.FC<SlideBasicArrowProps> = ({
  slideBasicArrow,
}) => {
  return (
    <AppCard>
      <MediaSlider>
        <Slider {...settings}>
          {slideBasicArrow.map((slide, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                maxHeight: { xs: 260, md: 320 },
                minHeight: { xs: 250, md: 310 },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  "& img": {
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                  },
                }}
              >
                <img src={slide.srcImg} alt={slide.title} />
              </Box>
            </Box>
          ))}
        </Slider>
      </MediaSlider>
    </AppCard>
  );
};

export default SlideBasicArrow;
