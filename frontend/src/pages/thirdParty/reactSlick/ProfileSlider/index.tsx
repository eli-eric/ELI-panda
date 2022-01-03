import React from "react";
import AppCard from "@crema/core/AppCard";
import Slider from "react-slick";
import ProfileItem from "./ProfileItem";
import MediaSlider from "./MediaSlider";
import { ProfileSlide } from "../../../../@crema/services/db/thirdParty/reactSlick";

const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

interface ProfileSliderProps {
  profile: ProfileSlide[];
}

const ProfileSlider: React.FC<ProfileSliderProps> = ({ profile }) => {
  return (
    <AppCard
      sxStyle={{
        height: "100%",
      }}
    >
      <MediaSlider>
        <Slider {...settings}>
          {profile.map((profile, index) => {
            return <ProfileItem key={index} profile={profile} />;
          })}
        </Slider>
      </MediaSlider>
    </AppCard>
  );
};

export default ProfileSlider;
