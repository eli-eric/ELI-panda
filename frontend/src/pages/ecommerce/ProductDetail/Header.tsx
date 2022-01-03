import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/lab/Rating";
import { Fonts } from "../../../shared/constants/AppEnums";

import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { ProductData } from "types/models/ecommerce/EcommerceApp";

interface HeaderProps {
  product: ProductData;
}

const Header: React.FC<HeaderProps> = ({ product }) => {
  const shareUrl = `https://cra.crema-mui.com/ecommerce/product_detail/${product.id}`;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: { xs: "column", sm: "row" },
        pb: 5,
        mb: 5,
        borderBottom: "1px solid #E5E4EA",
      }}
    >
      <Box
        sx={{
          flex: 1,
        }}
      >
        <Box
          component="h3"
          sx={{
            color: "text.primary",
            fontWeight: Fonts.BOLD,
            fontSize: 16,
            mb: 1,
          }}
        >
          {product.title}
        </Box>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Rating defaultValue={product.rating} size="small" readOnly />
          <Box
            sx={{
              ml: 2,
              mr: 4,
              color: "text.secondary",
            }}
          >
            {product.reviews + " reviews"}
          </Box>

          <Box>
            SKU :{" "}
            <Box
              component="span"
              sx={{
                ml: 2,
                color: "text.secondary",
              }}
            >
              MB023
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          mt: { xs: 4, sm: 0 },
        }}
      >
        <LinkedinShareButton url={shareUrl} style={{ marginRight: 10 }}>
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
        <FacebookShareButton url={shareUrl} style={{ marginRight: 10 }}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
      </Box>
    </Box>
  );
};

export default Header;
