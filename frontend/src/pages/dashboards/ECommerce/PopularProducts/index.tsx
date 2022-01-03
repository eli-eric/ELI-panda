import React from "react";
import AppCard from "@crema/core/AppCard";
import { useIntl } from "react-intl";
import ProductCell from "./ProductCell";
import AppGrid from "@crema/core/AppGrid";
import AppScrollbar from "@crema/core/AppScrollbar";
import { PopularProductData } from "types/models/dashboards/Ecommerce";

interface PopularProductsProps {
  popularProducts: PopularProductData[];
}

const PopularProducts: React.FC<PopularProductsProps> = ({
  popularProducts,
}) => {
  const { messages } = useIntl();
  return (
    <AppCard
      title={messages["eCommerce.popularProducts"]}
      contentStyle={{ px: 0 }}
    >
      <AppScrollbar sx={{ maxHeight: 280 }}>
        <AppGrid
          data={popularProducts}
          responsive={{
            xs: 1,
            sm: 2,
            md: 2,
            lg: 2,
            xl: 2,
          }}
          itemPadding={8}
          renderRow={(data, index) => (
            <ProductCell key={"product-" + index} data={data} />
          )}
        />
      </AppScrollbar>
    </AppCard>
  );
};

export default PopularProducts;
