import React from "react";
import AppCard from "@crema/core/AppCard";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import CourseGraph from "./CourseGraph";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { CourseDetails } from "types/models/dashboards/Academy";

interface CourseDetailProps {
  course: CourseDetails;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course }) => {
  const getTitle = () => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          mr: 4,
          "& .logo": {
            height: 60,
            width: 60,
            //borderRadius: theme.overrides.MuiCard.root.borderRadius,
            overflow: "hidden",
          },
        }}
      >
        <img className="logo" alt="" src={course.thumb} />
      </Box>
      <Box
        sx={{
          flex: 1,
        }}
      >
        <Box
          component="h3"
          sx={{
            fontWeight: Fonts.BOLD,
            mb: 0.5,
            fontSize: 14,
          }}
        >
          {course.title}
        </Box>
        <Box
          component="p"
          sx={{
            fontSize: 14,
            color: "text.secondary",
          }}
        >
          {course.level}
        </Box>
      </Box>
    </Box>
  );

  return (
    <AppCard
      title={getTitle()}
      action={
        <Box>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            // onClick={null}
          >
            <MoreHorizIcon />
          </IconButton>
        </Box>
      }
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box
            sx={{
              fontSize: 14,
              fontWeight: Fonts.MEDIUM,
              mb: 3,
            }}
            component="p"
          >
            {course.coveredDuration}
          </Box>
          <Box
            component="p"
            sx={{
              mb: 1,
              color: "text.secondary",
            }}
          >
            Lecture of
          </Box>
          <Box
            component="p"
            sx={{
              color: "text.secondary",
            }}
          >
            {course.totalDuration}
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              fontSize: 14,
              fontWeight: Fonts.MEDIUM,
              mb: 3,
            }}
            component="p"
          >
            {course.coveredPractice}
          </Box>
          <Box
            component="p"
            sx={{
              mb: 1,
              color: "text.secondary",
            }}
          >
            Practice of
          </Box>
          <Box
            component="p"
            sx={{
              color: "text.secondary",
            }}
          >
            {course.totalPractice}
          </Box>
        </Box>

        <CourseGraph data={course.graphData} />
      </Box>
    </AppCard>
  );
};

export default CourseDetail;
