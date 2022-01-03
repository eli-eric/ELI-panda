import React from "react";
import ProductListing from "./ProductListing";
import { useIntl } from "react-intl";
import AppsContainer from "../../../@crema/core/AppsContainer";
import ProductsSidebar from "./ProductsSidebar";

const Products = () => {
  const { messages } = useIntl();
  return (
    <AppsContainer
      title={messages["sidebar.ecommerce.products"]}
      sidebarContent={<ProductsSidebar />}
    >
      <ProductListing />
    </AppsContainer>
  );
};

export default Products;
