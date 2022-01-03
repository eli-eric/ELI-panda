import React from "react";
import { Box } from "@mui/material";
import AppList from "../../../../../@crema/core/AppList";
import ReviewCell from "./ReviewCell";
import Divider from "@mui/material/Divider";
import ReviewInfo from "./ReviewInfo";

const Review = () => {
  return (
    <Box>
      <Box
        component="h3"
        sx={{
          color: "text.primary",
          fontSize: 16,
          mb: 3,
        }}
      >
        Reviews
      </Box>
      <ReviewInfo />
      <Divider style={{ marginTop: 15, marginBottom: 15 }} />
      <AppList
        data={[1, 2, 3, 4, 5]}
        renderRow={(data) => <ReviewCell key={data} />}
      />
    </Box>
  );
};

export default Review;
