import React from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { ReviewGraphData } from "types/models/dashboards/CRM";

interface RevenueGraphProps {
  data: ReviewGraphData[];
}

const RevenueGraph: React.FC<RevenueGraphProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ left: 10, right: 10, top: 20 }}>
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#0A8FDC"
          strokeWidth={3}
          dot={{ r: 0 }}
        />
        <Line
          type="monotone"
          dataKey="revenue1"
          stroke="#49BD65"
          strokeWidth={3}
          dot={{ r: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueGraph;
