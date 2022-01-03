import React from "react";
import StatGraphs from "./StatGraphs";
import AppCard from "@crema/core/AppCard";
import AppSelect from "@crema/core/AppSelect";
import { useIntl } from "react-intl";
import { HospitalActivityData } from "types/models/dashboards/HealthCare";

interface HospitalActivityProps {
  data: HospitalActivityData[];
}

const HospitalActivity: React.FC<HospitalActivityProps> = ({ data }) => {
  const handleSelectionType = (data: unknown) => {
    console.log("data: ", data);
  };
  const { messages } = useIntl();
  return (
    <AppCard
      sxStyle={{ height: 1 }}
      title={messages["healthCare.hospitalActivity"]}
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
export default HospitalActivity;
