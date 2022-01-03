import React from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { Box } from "@mui/material";
import { ReviewGraphData } from "types/models/dashboards/CRM";

interface ReviewsGraphProps {
  reviewGraphData: ReviewGraphData[];
}

const ReviewsGraph: React.FC<ReviewsGraphProps> = ({ reviewGraphData }) => {
  return (
    <Box
      sx={{
        mt: "auto",
        p: 0,
        flexDirection: "column",
      }}
    >
      <ResponsiveContainer height={160} width="100%">
        <LineChart data={reviewGraphData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#C6F6D5"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ReviewsGraph;
