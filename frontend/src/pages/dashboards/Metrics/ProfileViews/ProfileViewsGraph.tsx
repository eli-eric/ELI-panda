import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";

interface ProfileViewsGraphProps {
  data: { day: number; number: number }[];
}

const ProfileViewsGraph: React.FC<ProfileViewsGraphProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={100}>
      <BarChart barSize={13} data={data}>
        <XAxis dataKey="data" axisLine={false} tickLine={false} />
        <Bar dataKey="number" fill="#E2E8F0" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProfileViewsGraph;
