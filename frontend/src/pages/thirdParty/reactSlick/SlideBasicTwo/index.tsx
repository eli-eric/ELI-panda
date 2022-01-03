import React from "react";
import Slider from "react-slick";
import AppCard from "../../../../@crema/core/AppCard";
import SlideItem from "./SlideItem";
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

interface SlideBasicTwoProps {
  slideBasicTwo: SlideBasic[];
}

const SlideBasicTwo: React.FC<SlideBasicTwoProps> = ({ slideBasicTwo }) => {
  return (
    <AppCard sxStyle={{ height: "100%" }}>
      <MediaSlider>
        <Slider {...settings}>
          {slideBasicTwo.map((slide, index) => (
            <SlideItem key={index} slide={slide} />
          ))}
        </Slider>
      </MediaSlider>
    </AppCard>
  );
};

export default SlideBasicTwo;
