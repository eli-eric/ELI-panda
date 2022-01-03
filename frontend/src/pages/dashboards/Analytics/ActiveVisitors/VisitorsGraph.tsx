import React from "react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

interface Props {
  data: any;
}

const VisitorsGraph: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart barSize={3} data={data}>
        <Bar dataKey="value" fill="#3335" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VisitorsGraph;
