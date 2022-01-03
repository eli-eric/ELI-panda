import React from "react";
import AppCard from "@crema/core/AppCard";
import WhatsHappenItem from "./WhatsHappenItem";
import { useIntl } from "react-intl";
import { WhatsHappenData } from "types/models/apps/Wall";

interface whatsHappenProps {
  whatsHappen: WhatsHappenData[];
}

const WhatsHappen: React.FC<whatsHappenProps> = ({ whatsHappen }) => {
  const { messages } = useIntl();

  return (
    <AppCard
      sxStyle={{ mb: 8 }}
      title={messages["wall.whatsHappening"]}
      action={messages["common.viewAll"]}
      contentStyle={{ px: 0, pt: 2 }}
    >
      <div>
        {whatsHappen.map((data) => (
          <WhatsHappenItem data={data} key={data.id} />
        ))}
      </div>
    </AppCard>
  );
};

export default WhatsHappen;
