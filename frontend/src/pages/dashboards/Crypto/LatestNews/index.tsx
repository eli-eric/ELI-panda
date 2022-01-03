import React from "react";
import NewsList from "./NewsList";
import AppCard from "../../../../@crema/core/AppCard";
import { useIntl } from "react-intl";
import { NewsData } from "types/models/dashboards/Crypto";

interface LatestNewsProps {
  newsData: NewsData[];
}

const LatestNews: React.FC<LatestNewsProps> = ({ newsData }) => {
  const { messages } = useIntl();

  return (
    <AppCard
      sxStyle={{ height: 1 }}
      contentStyle={{ px: 0 }}
      title={messages["dashboard.latestNews"]}
      action={messages["common.viewAll"]}
    >
      <NewsList newsData={newsData} />
    </AppCard>
  );
};

export default LatestNews;
