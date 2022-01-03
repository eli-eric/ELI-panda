import React, { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import Box from "@mui/material/Box";
import { BtcChartData } from "types/models/dashboards/Crypto";

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius}
        outerRadius={outerRadius + 4}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value}`}</text>
    </g>
  );
};

interface BtcGraphProps {
  data: BtcChartData[];
}

const BtcGraph: React.FC<BtcGraphProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (data: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <Box
      sx={{
        height: 290,
        width: "100%",
        position: "relative",
        "& .btcGraph": {
          width: "100% !important",
          height: "280px !important",
          alignSelf: "center",

          "& .recharts-surface": {
            width: "100% !important",
            height: "280px !important",
          },
        },
      }}
    >
      <ResponsiveContainer height="100%" width="100%">
        <PieChart className="btcGraph">
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={115}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BtcGraph;
