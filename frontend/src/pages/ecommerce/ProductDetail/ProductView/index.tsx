import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import ProductSpecification from "./ProductSpecification";
import ProductInfo from "./ProductInfo";
import DeliveryInfo from "./DeliveryInfo";
import Reviews from "./Reviews";
import AvailableOffers from "./AvailableOffers";
import { ProductData } from "types/models/ecommerce/EcommerceApp";

interface ProductViewProps {
  product: ProductData;
}

const ProductView: React.FC<ProductViewProps> = ({ product }) => {
  return (
    <Grid item sm={12} md={8}>
      <Box
        component="h3"
        sx={{
          color: "text.primary",
          fontSize: 20,
          mb: 1,
        }}
      >
        ${+product.mrp - Math.round((+product.mrp * +product.discount) / 100)}
        <Box
          component="span"
          sx={{
            textDecoration: "line-through",
            color: "text.secondary",
            fontSize: 16,
            ml: 3,
          }}
        >
          ${product.mrp}
        </Box>
      </Box>
      <Box
        sx={{
          color: "primary.main",
          fontSize: 16,
          mb: 4,
        }}
      >
        In stoke
      </Box>
      <Box
        component="p"
        sx={{
          color: "text.secondary",
        }}
      >
        It is a long established fact that a reader will be distracted by the
        readable content of a page looking at its layout. The point of using
        Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using Content here, making it look like readable
        English. Many desktop publishing packages and web page editors now use..
      </Box>
      <Divider style={{ marginTop: 15, marginBottom: 15 }} />
      <AvailableOffers />
      <DeliveryInfo />
      <Divider style={{ marginTop: 15, marginBottom: 15 }} />
      <ProductSpecification />
      <Divider style={{ marginTop: 15, marginBottom: 15 }} />
      <ProductInfo />
      <Divider style={{ marginTop: 15, marginBottom: 15 }} />
      <Reviews />
    </Grid>
  );
};

export default ProductView;
