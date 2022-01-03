import React from "react";
import AppCard from "@crema/core/AppCard";
import { useIntl } from "react-intl";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AppScrollbar from "@crema/core/AppScrollbar";
import NotificationCell from "./NotificationCell";
import AppList from "@crema/core/AppList";
import { NotificationsData } from "types/models/dashboards/Ecommerce";

interface NotificationsProps {
  notifications: NotificationsData[];
}

const Notifications: React.FC<NotificationsProps> = ({ notifications }) => {
  const { messages } = useIntl();

  return (
    <AppCard
      contentStyle={{ px: 0 }}
      title={messages["eCommerce.notifications"]}
      action={
        <IconButton
          sx={{
            height: 30,
            width: 30,
          }}
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          // onClick={null}
        >
          <MoreVertIcon />
        </IconButton>
      }
    >
      <AppScrollbar
        sx={{
          maxHeight: 386,
        }}
      >
        <AppList
          data={notifications}
          renderRow={(item) => <NotificationCell key={item.id} item={item} />}
        />
      </AppScrollbar>
    </AppCard>
  );
};

export default Notifications;
