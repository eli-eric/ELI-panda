import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import AppList from "@crema/core/AppList";
import AppCard from "@crema/core/AppCard";
import { useIntl } from "react-intl";
import AppScrollbar from "@crema/core/AppScrollbar";
import MessageItem from "../../../../@crema/core/AppMessages/MessageItem";
import { MessagesData } from "types/models/dashboards/Widgets";

const getData = (data: MessagesData[]) => {
  return data;
};

interface MessagesProps {
  data: MessagesData[];
}

const Messages: React.FC<MessagesProps> = ({ data }) => {
  const messageData = getData(data);

  const { messages } = useIntl();
  return (
    <AppCard
      sxStyle={{ height: 1 }}
      title={messages["dashboard.messages"]}
      contentStyle={{ px: 0 }}
      action={
        <CloseIcon
          sx={{
            cursor: "pointer",
          }}
        />
      }
    >
      <AppScrollbar
        sx={{
          height: 263,
        }}
      >
        <AppList
          data={messageData}
          renderRow={(item) => {
            return <MessageItem key={item.id} item={item} />;
          }}
        />
      </AppScrollbar>
    </AppCard>
  );
};

export default Messages;
