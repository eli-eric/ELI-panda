import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";

interface OrdersGraphProps {
  data: { number: string; value: number }[];
}

const OrdersGraph: React.FC<OrdersGraphProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart barSize={8} data={data}>
        <XAxis dataKey="number" hide />
        <Bar
          dataKey="value"
          fill="#FFFFFF"
          label={{ position: "top", color: "white" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OrdersGraph;
