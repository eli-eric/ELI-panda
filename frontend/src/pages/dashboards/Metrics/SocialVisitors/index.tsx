import React from "react";
import SocialVisitorsGraph from "./SocialVisitorsGraph";
import Categories from "./Categories";
import AppCard from "@crema/core/AppCard";
import { useIntl } from "react-intl";
import { SocialVisitorsData } from "types/models/dashboards/Metrics";

interface SocialVisitorsProps {
  data: SocialVisitorsData[];
}

const SocialVisitors: React.FC<SocialVisitorsProps> = ({ data }) => {
  const { messages } = useIntl();
  return (
    <AppCard
      title={messages["dashboard.socialVisitors"]}
      action={messages["common.viewAll"]}
    >
      <SocialVisitorsGraph data={data} />

      <Categories data={data} />
    </AppCard>
  );
};

export default SocialVisitors;
