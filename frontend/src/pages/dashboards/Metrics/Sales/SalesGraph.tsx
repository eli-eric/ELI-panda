import React from "react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

interface SalesGraphProps {
  data: { day: number; number: number }[];
}

const SalesGraph: React.FC<SalesGraphProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart barSize={13} data={data}>
        <Bar dataKey="number" fill="#E2E8F0" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesGraph;
