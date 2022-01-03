import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { Fonts } from "../../../../../shared/constants/AppEnums";
import CardWrapper from "./CardWrapper";
import { PricingObj } from "../../../../../@crema/services/db/extraPages/pricing";

interface PackageCardProps {
  pricing: PricingObj;
}

const PackageCard: React.FC<PackageCardProps> = ({ pricing }) => {
  return (
    <CardWrapper>
      <Box
        sx={{
          pt: 5,
          px: 5,
        }}
      >
        <Typography
          component="h5"
          sx={{
            fontWeight: Fonts.BOLD,
            fontSize: 16,
            textTransform: "uppercase",
            mb: { xs: 5, md: 7.5 },
            letterSpacing: "0.2em",
          }}
        >
          {pricing.title}
        </Typography>
        <List
          sx={{
            py: 0,
          }}
        >
          {pricing.pricingList.map((data, index) => (
            <ListItem
              key={index}
              sx={{
                px: 0,
                py: 0,
                mb: 2,
              }}
            >
              <ListItemIcon sx={{ minWidth: 10, mr: 3.5 }}>
                <CheckOutlinedIcon
                  sx={{
                    fontSize: 16,
                    mt: 1,
                    color: (theme) => theme.palette.success.main,
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={data.title} />
            </ListItem>
          ))}
        </List>
        <Box
          sx={{
            my: 4,
          }}
        >
          <Typography
            component="h3"
            sx={{
              fontSize: { xs: 16, md: 18, lg: 20 },
              fontWeight: Fonts.MEDIUM,
            }}
          >
            <Box
              component="span"
              sx={{
                fontWeight: Fonts.BOLD,
                fontSize: { xs: 26, md: 32, lg: 44, xl: 54 },
              }}
            >
              ${pricing.price}
            </Box>
            /month
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 7.5 }}>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            fontWeight: Fonts.BOLD,
            color: (theme) => theme.palette.common.white,
            minHeight: 46,
            borderRadius: 0,
            boxShadow: "none",
            backgroundColor: pricing.priceColor,
            "&:hover, &:focus": {
              backgroundColor: pricing.priceColor,
              boxShadow: "none",
            },
          }}
        >
          Get started
        </Button>
      </Box>
    </CardWrapper>
  );
};

export default PackageCard;
