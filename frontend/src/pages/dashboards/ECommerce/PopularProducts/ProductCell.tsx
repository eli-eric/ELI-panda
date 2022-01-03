import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { PopularProductData } from "types/models/dashboards/Ecommerce";

interface ProductCellProps {
  data: PopularProductData;
}

const ProductCell: React.FC<ProductCellProps> = ({ data }) => {
  return (
    <Box
      key={data.id}
      sx={{
        display: "flex",
        alignItems: "center",
        py: 2,
        px: 5,
      }}
      className="item-hover"
    >
      <Avatar
        sx={{
          mr: 4,
          height: 70,
          width: 70,
        }}
        variant="rounded"
        alt=""
        src={data.icon}
      />

      <Box
        sx={{
          flex: 1,
        }}
      >
        <Box
          component="h3"
          sx={{
            color: "primary.main",
            fontWeight: Fonts.MEDIUM,
            mb: 0.5,
            fontSize: 14,
          }}
        >
          {data.name}
        </Box>
        <Box
          component="p"
          sx={{
            fontSize: 14,
            color: "text.secondary",
            mb: 1,
          }}
        >
          {data.description}
        </Box>
        <Box
          component="p"
          sx={{
            fontSize: 14,
            fontWeight: Fonts.MEDIUM,
          }}
        >
          ${data.price}
          <Box
            component="span"
            sx={{
              textDecoration: "line-through",
              mb: 1,
              fontSize: 14,
              ml: 3,
              color: "text.secondary",
            }}
          >
            ${data.mrp}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCell;
