import React from "react";
import AppCard from "@crema/core/AppCard";
import AppList from "@crema/core/AppList";
import NewsItem from "./NewsItem";
import { useIntl } from "react-intl";
import { RecentNewsObj } from "../../../../types/models/apps/Wall";

interface RecentNewsProps {
  recentNews: RecentNewsObj[];
}

const RecentNews: React.FC<RecentNewsProps> = ({ recentNews }) => {
  const { messages } = useIntl();
  return (
    <AppCard
      title={messages["wall.recentNews"]}
      contentStyle={{ px: 0, pt: 2 }}
    >
      <AppList
        data={recentNews}
        renderRow={(item, index) => <NewsItem key={index} item={item} />}
      />
    </AppCard>
  );
};

export default RecentNews;
