import React from "react";
import { useIntl } from "react-intl";
import AppCard from "@crema/core/AppCard";
import AppMenu from "@crema/core/AppMenu";
import AppList from "@crema/core/AppList";
import DoctorCell from "./DoctorCell";
import AppScrollbar from "@crema/core/AppScrollbar";
import { TopDoctorData } from "types/models/dashboards/HealthCare";

interface TopDoctorsProps {
  data: TopDoctorData[];
}

const TopDoctors: React.FC<TopDoctorsProps> = ({ data }) => {
  const { messages } = useIntl();
  return (
    <AppCard
      title={messages["healthCare.topDoctors"]}
      contentStyle={{ px: 0 }}
      action={<AppMenu />}
    >
      <AppScrollbar sx={{ maxHeight: 280 }}>
        <AppList
          data={data}
          renderRow={(doctor) => <DoctorCell key={doctor.id} doctor={doctor} />}
        />
      </AppScrollbar>
    </AppCard>
  );
};

export default TopDoctors;
