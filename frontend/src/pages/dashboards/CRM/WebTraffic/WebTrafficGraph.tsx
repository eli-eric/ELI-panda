import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";
import { WebsiteTrafficData } from "types/models/dashboards/CRM";

interface WebTrafficProps {
  websiteTrafficData: WebsiteTrafficData[];
}

const WebTrafficGraph: React.FC<WebTrafficProps> = ({ websiteTrafficData }) => {
  return (
    <ResponsiveContainer width="100%" height={170}>
      <BarChart barSize={7} data={websiteTrafficData}>
        <XAxis dataKey="month" axisLine={false} tickLine={false} />
        <Bar dataKey="users" fill="#E2E8F0" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WebTrafficGraph;
