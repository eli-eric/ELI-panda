import React from "react";
import AppCard from "@crema/core/AppCard";
import { useIntl } from "react-intl";
import MarketingTable from "./MarketingTable";
import { MarketingCampaignData } from "types/models/dashboards/Ecommerce";

interface MarketingCampaignProps {
  marketingCampaign: MarketingCampaignData[];
}

const MarketingCampaign: React.FC<MarketingCampaignProps> = ({
  marketingCampaign,
}) => {
  const { messages } = useIntl();

  return (
    <AppCard
      title={messages["eCommerce.marketingCampaign"]}
      contentStyle={{ px: 0 }}
    >
      <MarketingTable marketingCampaign={marketingCampaign} />
    </AppCard>
  );
};

export default MarketingCampaign;
