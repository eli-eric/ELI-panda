import React from "react";
import AppCard from "@crema/core/AppCard";
import { useIntl } from "react-intl";
import Slider from "react-slick";
import CourseItem from "./CourseItem";
import CourseSlider from "./CourseSlider";
import { RelatedCoursesData } from "types/models/dashboards/Academy";

interface RelatedCoursesProps {
  relatedCourses: RelatedCoursesData[];
}

const RelatedCourses: React.FC<RelatedCoursesProps> = ({ relatedCourses }) => {
  const { messages } = useIntl();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <AppCard sxStyle={{ height: 1 }} title={messages["academy.relatedCourses"]}>
      <CourseSlider>
        <Slider className="slideRoot" {...settings}>
          {relatedCourses.map((data, index) => (
            <CourseItem key={index} data={data} />
          ))}
        </Slider>
      </CourseSlider>
    </AppCard>
  );
};

export default RelatedCourses;
