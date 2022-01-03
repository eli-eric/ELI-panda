import React from "react";
import Slider from "react-slick";
import AppCard from "../../../../@crema/core/AppCard";
import MediaSlider from "./MediaSlider";
import SlideItem from "./SlideItem";
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

interface SlideBasicThreeProps {
  slideBasicThree: SlideBasic[];
}

const SlideBasicThree: React.FC<SlideBasicThreeProps> = ({
  slideBasicThree,
}) => {
  return (
    <AppCard sxStyle={{ height: "100%" }}>
      <MediaSlider>
        <Slider {...settings}>
          {slideBasicThree.map((slide, index) => (
            <SlideItem key={index} slide={slide} />
          ))}
        </Slider>
      </MediaSlider>
    </AppCard>
  );
};

export default SlideBasicThree;
