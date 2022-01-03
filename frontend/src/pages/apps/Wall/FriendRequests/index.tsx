import React from "react";
import AppCard from "@crema/core/AppCard";
import AppList from "@crema/core/AppList";
import RequestItem from "./RequestItem";
import { useIntl } from "react-intl";
import { FriendRequestObj } from "../../../../types/models/apps/Wall";

interface FriendRequestsProps {
  friendRequests: FriendRequestObj[];
}

const FriendRequests: React.FC<FriendRequestsProps> = ({ friendRequests }) => {
  const { messages } = useIntl();

  return (
    <AppCard
      sxStyle={{ mb: 8 }}
      title={messages["wall.friends"]}
      action={messages["common.viewAll"]}
      contentStyle={{ px: 0, pt: 2 }}
    >
      <AppList
        animation="transition.slideRightBigIn"
        data={friendRequests}
        renderRow={(data, index) => <RequestItem key={index} request={data} />}
      />
    </AppCard>
  );
};

export default FriendRequests;
