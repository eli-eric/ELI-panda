import React from "react";
import AppCard from "@crema/core/AppCard";
import { useIntl } from "react-intl";
import AppSelect from "@crema/core/AppSelect";
import PatientsTable from "./PatientsTable";
import { RecentPatientData } from "types/models/dashboards/HealthCare";

interface RecentPatientsProps {
  recentPatients: RecentPatientData[];
}

const RecentPatients: React.FC<RecentPatientsProps> = ({ recentPatients }) => {
  const { messages } = useIntl();
  const handleSelectionType = (data: unknown) => {
    console.log("data: ", data);
  };
  return (
    <AppCard
      contentStyle={{ px: 0 }}
      title={messages["healthCare.recentPatient"]}
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
      <PatientsTable recentPatients={recentPatients} />
    </AppCard>
  );
};

export default RecentPatients;
