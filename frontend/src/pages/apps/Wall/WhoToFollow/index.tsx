import React from "react";
import AppList from "@crema/core/AppList";
import AppCard from "@crema/core/AppCard";
import FollowItem from "./FollowItem";
import { useIntl } from "react-intl";
import { WhoToFollowObj } from "types/models/apps/Wall";

interface WhoToFollowProps {
  whoToFollow: WhoToFollowObj[];
}

const WhoToFollow: React.FC<WhoToFollowProps> = ({ whoToFollow }) => {
  const { messages } = useIntl();
  return (
    <AppCard
      sxStyle={{ mb: 8 }}
      title={messages["wall.whoToFollow"]}
      contentStyle={{ px: 0 }}
      action={messages["common.viewAll"]}
    >
      <AppList
        data={whoToFollow}
        renderRow={(item, index) => <FollowItem key={index} item={item} />}
      />
    </AppCard>
  );
};

export default WhoToFollow;
