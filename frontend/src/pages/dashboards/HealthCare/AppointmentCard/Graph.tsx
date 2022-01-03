import React from "react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

interface GraphProps {
  data: {
    month: string;
    users: number;
  }[];
}

const Graph: React.FC<GraphProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={70}>
      <BarChart barSize={4} data={data}>
        <Bar dataKey="users" fill="#E2E8F0" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Graph;
