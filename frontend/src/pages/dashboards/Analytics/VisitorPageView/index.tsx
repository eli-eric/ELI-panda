import React from "react";
import StatGraphs from "./StatGraphs";
import AppCard from "@crema/core/AppCard";
import AppSelect from "@crema/core/AppSelect";
import { useIntl } from "react-intl";
import { VisitorsPageView } from "types/models/dashboards/Analytics";

interface VisitorPageViewPorps {
  data: VisitorsPageView[];
}

const VisitorPageView: React.FC<VisitorPageViewPorps> = ({ data }) => {
  const handleSelectionType = (data: any) => {
    console.log("data: ", data);
  };
  const { messages } = useIntl();
  return (
    <AppCard
      sxStyle={{ height: 1 }}
      title={messages["dashboard.analytics.visitorsPageViews"]}
      action={
        <AppSelect
          menus={[
            messages["dashboard.thisWeek"],
            messages["dashboard.lastWeeks"],
            messages["dashboard.lastMonth"],
          ]}
          defaultValue={messages["dashboard.thisWeek"]}
          onChange={handleSelectionType}
        />
      }
    >
      <StatGraphs data={data} />
    </AppCard>
  );
};
export default VisitorPageView;
