import React from "react";
import ChatItem from "./ChatItem";
import AppList from "@crema/core/AppList";
import ListEmptyResult from "@crema/core/AppList/ListEmptyResult";
import { useIntl } from "react-intl";
import ChatListSkeleton from "@crema/core/AppSkeleton/ChatListSkeleton";
import { useSelector } from "react-redux";
import { AppState } from "../../../../../../redux/store";
import { ConnectionObj } from "types/models/apps/Chat";

interface ChatListProps {
  chatListData: ConnectionObj[];
  loading: boolean;
}

const ChatList: React.FC<ChatListProps> = ({ chatListData, loading }) => {
  const { messages } = useIntl();
  const { selectedUser } = useSelector<AppState, AppState["chatApp"]>(
    ({ chatApp }) => chatApp
  );
  return (
    <AppList
      containerStyle={{
        display: "flex",
        flexDirection: "column",
      }}
      data={chatListData}
      ListEmptyComponent={
        <ListEmptyResult
          content={messages["chatApp.noUserFound"] as string}
          loading={loading}
          placeholder={<ChatListSkeleton />}
        />
      }
      renderRow={(item) => (
        <ChatItem
          key={"chat-item-" + item.id}
          item={item}
          selectedUser={selectedUser}
        />
      )}
    />
  );
};

export default ChatList;
