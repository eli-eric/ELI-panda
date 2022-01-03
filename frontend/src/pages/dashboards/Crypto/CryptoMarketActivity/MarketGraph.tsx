import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import React from "react";
import Box from "@mui/material/Box";
import { MarketGraphData } from "types/models/dashboards/Crypto";

interface CryptoMarketActivityProps {
  marketGraphData: MarketGraphData[];
}

const MarketGraph: React.FC<CryptoMarketActivityProps> = ({
  marketGraphData,
}) => {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <ResponsiveContainer height={300} width="100%">
        <BarChart barSize={8} barGap={3} data={marketGraphData}>
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <YAxis hide />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Bar dataKey="low" stackId="a" fill="#319795" />
          <Bar dataKey="medium" stackId="a" fill="#4C51BF" />
          <Bar dataKey="high" stackId="a" fill="#E53E3E" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MarketGraph;
