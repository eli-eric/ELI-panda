import React from "react";
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { StateGraphData } from "types/models/dashboards/Metrics";

interface StatsGraphProps {
  data: {
    stats1: StateGraphData[];
    stats2: StateGraphData[];
  };
}

const StatsGraph: React.FC<StatsGraphProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={370}>
      <ScatterChart margin={{ top: 20, right: 0, bottom: 20, left: 0 }}>
        <CartesianGrid
          strokeDasharray="5 5"
          stroke="#E2E8F0"
          vertical={false}
        />
        <XAxis
          type="number"
          dataKey="number"
          name="number"
          tickLine={false}
          axisLine={false}
          ticks={[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]}
        />
        <YAxis
          type="number"
          dataKey="value"
          name="value"
          tickLine={false}
          axisLine={false}
          ticks={[1000, 2000, 3000, 4000, 5000, 6000]}
        />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          labelStyle={{ color: "black" }}
        />
        <Scatter data={data.stats1} fill="#E53E3E" />
        <Scatter data={data.stats2} fill="#38B2AC" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default StatsGraph;
