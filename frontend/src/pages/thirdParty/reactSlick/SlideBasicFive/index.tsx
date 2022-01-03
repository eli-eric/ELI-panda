import React from "react";
import Slider from "react-slick";
import SlideItem from "./SlideItem";
import AppCard from "../../../../@crema/core/AppCard";
import MediaSlider from "./MediaSlider";
import { SlideBasic } from "../../../../@crema/services/db/thirdParty/reactSlick";

const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

interface SlideBasicFiveProps {
  slideBasicFive: SlideBasic[];
}

const SlideBasicFive: React.FC<SlideBasicFiveProps> = ({ slideBasicFive }) => {
  return (
    <AppCard sxStyle={{ height: "100%" }}>
      <MediaSlider>
        <Slider {...settings}>
          {slideBasicFive.map((slide, index) => (
            <SlideItem key={index} slide={slide} />
          ))}
        </Slider>
      </MediaSlider>
    </AppCard>
  );
};

export default SlideBasicFive;
