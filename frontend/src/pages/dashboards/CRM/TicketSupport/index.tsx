import React from "react";
import TicketSupportTable from "./TicketSupportTable";
import AppCard from "../../../../@crema/core/AppCard";
import { useIntl } from "react-intl";
import { TicketSupportDataProps } from "types/models/dashboards/CRM";

interface TicketSupportProps {
  ticketSupportData: TicketSupportDataProps[];
}

const TicketSupport: React.FC<TicketSupportProps> = ({ ticketSupportData }) => {
  const { messages } = useIntl();

  return (
    <AppCard
      contentStyle={{ px: 0 }}
      title={messages["dashboard.latestTicketSupport"]}
      action={messages["common.viewAll"]}
    >
      <TicketSupportTable ticketSupportData={ticketSupportData} />
    </AppCard>
  );
};

export default TicketSupport;
