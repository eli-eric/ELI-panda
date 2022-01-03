import React from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { ChartData } from "types/models/dashboards/Analytics";

interface MixBarChartProp {
  data: ChartData[];
}

const MixBarChart: React.FC<MixBarChartProp> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={270}>
      <BarChart
        barSize={7}
        data={data}
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" dy={10} />
        <Tooltip />
        <Bar dataKey="AS" stackId="a" fill="#49BD65" />
        <Bar dataKey="Rev" stackId="a" fill="#0A8FDC" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MixBarChart;
