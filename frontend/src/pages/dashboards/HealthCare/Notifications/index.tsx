import React from "react";
import AppCard from "@crema/core/AppCard";
import { useIntl } from "react-intl";
import AppMenu from "@crema/core/AppMenu";
import AppScrollbar from "@crema/core/AppScrollbar";
import AppList from "@crema/core/AppList";
import NotificationCell from "./NotificationCell";
import { NotificationData } from "types/models/dashboards/HealthCare";

interface NotificationsProps {
  data: NotificationData[];
}

const Notifications: React.FC<NotificationsProps> = ({ data }) => {
  const { messages } = useIntl();
  return (
    <AppCard
      contentStyle={{ px: 0 }}
      title={messages["healthCare.notification"]}
      action={<AppMenu />}
    >
      <AppScrollbar sx={{ maxHeight: 280 }}>
        <AppList
          data={data}
          renderRow={(notification) => (
            <NotificationCell
              key={notification.id}
              notification={notification}
            />
          )}
        />
      </AppScrollbar>
    </AppCard>
  );
};

export default Notifications;
