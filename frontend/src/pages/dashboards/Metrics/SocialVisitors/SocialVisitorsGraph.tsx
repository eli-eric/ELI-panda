import React from "react";
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Fonts } from "../../../../shared/constants/AppEnums";
import Box from "@mui/material/Box";
import { SocialVisitorsData } from "types/models/dashboards/Metrics";

interface SocialVisitorsGraphPorps {
  data: SocialVisitorsData[];
}

const SocialVisitorsGraph: React.FC<SocialVisitorsGraphPorps> = ({ data }) => {
  const customizedLabel = (x: number, y: number, value: number) => {
    return (
      <text
        x={x + 15}
        y={y}
        dy={-20}
        fill={value > 0 ? "#48BB78" : "#E53E3E"}
        className="graphText"
        textAnchor="middle"
      >
        {value > 0 ? "+" + value : value}%
      </text>
    );
  };
  return (
    <Box
      sx={{
        position: "relative",
        "& .graphText": {
          fontWeight: Fonts.MEDIUM,
          fontSize: { xs: 16, xl: 18 },
        },
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          barSize={8}
          data={data}
          margin={{ top: 30, right: 0, left: 0, bottom: 20 }}
        >
          <XAxis dataKey="visitors" axisLine={false} tickLine={false} hide />
          <YAxis hide />
          <Bar dataKey="visitors">
            <LabelList
              dataKey="change"
              content={({ x, y, value }: any) => customizedLabel(x, y, value)}
            />
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SocialVisitorsGraph;
