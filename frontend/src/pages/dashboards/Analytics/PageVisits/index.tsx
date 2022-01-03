import React from "react";
import AppCard from "@crema/core/AppCard";
import VisitsTable from "./VisitsTable";
import { useIntl } from "react-intl";
import { PageVisit } from "types/models/dashboards/Analytics";

interface PageVisitsProps {
  pageVisits: PageVisit[];
}

const PageVisits: React.FC<PageVisitsProps> = ({ pageVisits }) => {
  const { messages } = useIntl();
  return (
    <AppCard
      contentStyle={{ px: 0 }}
      title={messages["dashboard.analytics.pageVisits"]}
      action={messages["common.viewAll"]}
    >
      <VisitsTable visitsData={pageVisits} />
    </AppCard>
  );
};

export default PageVisits;
