import React from "react";
import AppCard from "@crema/core/AppCard";
import ProductCell from "./ProductCell";
import { useIntl } from "react-intl";
import AppList from "@crema/core/AppList";
import { TopSellingProduct } from "types/models/dashboards/Analytics";

interface TopSellingProps {
  products: TopSellingProduct[];
}

const TopSelling: React.FC<TopSellingProps> = ({ products }) => {
  const { messages } = useIntl();
  return (
    <AppCard
      contentStyle={{ px: 0 }}
      sxStyle={{ height: 1 }}
      title={messages["dashboard.analytics.topSellingProducts"]}
      footer={"+12 " + messages["common.more"]}
    >
      <AppList
        animation="transition.slideRightBigIn"
        data={products}
        renderRow={(data, index) => <ProductCell key={index} data={data} />}
      />
    </AppCard>
  );
};

export default TopSelling;
