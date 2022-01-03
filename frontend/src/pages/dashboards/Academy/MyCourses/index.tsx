import React, { useState } from "react";
import AppCard from "@crema/core/AppCard";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import AppList from "@crema/core/AppList";
import CourseCell from "./CourseCell";
import { useIntl } from "react-intl";

import { Courses } from "types/models/dashboards/Academy";

interface MyCoursesProps {
  courses: Courses;
}

const MyCourses: React.FC<MyCoursesProps> = ({ courses }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    courses.categories[0].slug
  );

  const handleChangeCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const { messages } = useIntl();

  return (
    <AppCard
      sxStyle={{ height: 1 }}
      title={messages["academy.myCourses"]}
      contentStyle={{ px: 0 }}
    >
      <Box
        sx={{
          mb: 2,
          px: 5,
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {courses.categories.map((item, index) => (
          <Box
            sx={{
              mr: 3,
              mb: 1,
            }}
            key={index}
          >
            <Chip
              onClick={() => handleChangeCategory(item.slug)}
              sx={{
                cursor: "pointer",
                backgroundColor: (theme) =>
                  item.slug === selectedCategory
                    ? theme.palette.primary.main
                    : theme.palette.background.default,
                color: (theme) =>
                  item.slug === selectedCategory
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary,
                "&:hover, &:focus": {
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.primary.contrastText,
                },
              }}
              key={index}
              label={item.title}
            />
          </Box>
        ))}
      </Box>
      <AppList
        animation="transition.slideRightBigIn"
        data={courses.courses}
        renderRow={(data, index) => <CourseCell key={index} course={data} />}
      />
    </AppCard>
  );
};

export default MyCourses;
