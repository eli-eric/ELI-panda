import React from "react";
import ContactItem from "./ContactItem";
import AppList from "@crema/core/AppList";
import ListEmptyResult from "@crema/core/AppList/ListEmptyResult";
import ChatListSkeleton from "@crema/core/AppSkeleton/ChatListSkeleton";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { AppState } from "../../../../../../redux/store";
import { ConnectionObj } from "../../../../../../types/models/apps/Chat";

interface ConnectionListProps {
  connectionListData: ConnectionObj[];
  loading: boolean;
}

const ContactList: React.FC<ConnectionListProps> = ({
  connectionListData,
  loading,
}) => {
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
      data={connectionListData}
      ListEmptyComponent={
        <ListEmptyResult
          content={messages["chatApp.noUserFound"] as string}
          loading={loading}
          placeholder={<ChatListSkeleton />}
        />
      }
      renderRow={(item) => (
        <ContactItem
          listStyle="px-0"
          key={"connection-item-" + item.id}
          item={item}
          selectedUser={selectedUser}
        />
      )}
    />
  );
};

export default ContactList;
