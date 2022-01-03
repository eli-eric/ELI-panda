import React from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import Box from "@mui/material/Box";

interface ActiveUsersGraphProps {
  data: any[];
}

const ActiveUsersGraph: React.FC<ActiveUsersGraphProps> = ({ data }) => {
  return (
    <Box
      sx={{
        position: "relative",
        "& .containerGraph": {
          width: "100%",
        },
      }}
    >
      <ResponsiveContainer height={200} className="containerGraph">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="activeUsers"
            stroke="#4299E1"
            strokeWidth={4}
            dot={{ r: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ActiveUsersGraph;
