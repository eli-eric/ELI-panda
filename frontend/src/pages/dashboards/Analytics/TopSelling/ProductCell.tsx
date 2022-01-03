import React from "react";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCircularProgress from "@crema/core/AppCircularProgress";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Hidden from "@mui/material/Hidden";
import { TopSellingProduct } from "types/models/dashboards/Analytics";

interface ProductCellProps {
  data: TopSellingProduct;
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
      <Box
        sx={{
          display: "flex",
          "& .logo": {
            height: 70,
            width: 70,
            borderRadius: 2.5,
            overflow: "hidden",
          },
        }}
      >
        <img className="logo" alt="" src={data.icon} />

        <Box
          sx={{
            flex: 1,
            ml: 4,
          }}
        >
          <Box
            sx={{
              color: "primary.main",
              display: "inline-block",
              fontWeight: Fonts.MEDIUM,
              mb: 0.5,
              fontSize: 14,
            }}
            component="h3"
          >
            {data.name}
          </Box>
          <Box
            component="p"
            sx={{
              fontSize: 12,
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
          </Box>
        </Box>
      </Box>
      <Hidden xsDown>
        <Box
          sx={{
            ml: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              height: 50,
              width: 50,
            }}
          >
            <AppCircularProgress
              minWidth={50}
              maxWidth={50}
              activeColor={data.color}
              thickness={4}
              hidePercentage
              value={data.rate}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: 2,
              mr: -2,
              p: 2,
              pr: 0,
            }}
          >
            <Box>
              <Box
                sx={{
                  color: "text.secondary",
                }}
              >
                Sales
              </Box>
              <Box>{data.rate}%</Box>
            </Box>
            <Box
              sx={{
                ml: 2,
                color: "grey.400",
              }}
            >
              <NavigateNextIcon />
            </Box>
          </Box>
        </Box>
      </Hidden>
    </Box>
  );
};

export default ProductCell;
