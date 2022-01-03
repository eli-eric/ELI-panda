import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CardWrapper from "./CardWrapper";
import { Fonts } from "../../../../../shared/constants/AppEnums";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import PackageWrapper from "./PackageWrapper";
import { PricingObj } from "../../../../../@crema/services/db/extraPages/pricing";

interface PackageCardProps {
  pricing: PricingObj;
}

const PackageCard: React.FC<PackageCardProps> = ({ pricing }) => {
  return (
    <PackageWrapper>
      <Box
        component="span"
        className="tag"
        sx={{
          backgroundColor: pricing.tagColor,
        }}
      >
        {pricing.tag}
      </Box>
      <CardWrapper>
        <Box
          sx={{
            position: "relative",
            pr: 20,
          }}
        >
          <Typography
            component="h3"
            sx={{
              fontWeight: Fonts.BOLD,
              fontSize: { xs: 28, md: 32, lg: 36 },
            }}
          >
            {pricing.title}
          </Typography>
          <Typography
            component="h4"
            sx={{
              fontSize: { xs: 20, md: 22, lg: 24 },
              mb: { xs: 5, lg: 7.5 },
            }}
          >
            <Box
              component="span"
              sx={{
                fontWeight: Fonts.BOLD,
              }}
            >
              ${pricing.price}
            </Box>
            /month
          </Typography>
          {pricing.popular ? (
            <Box className="popular">
              <FavoriteOutlinedIcon
                sx={{
                  fontSize: 14,
                  mr: 2.5,
                  mt: 1.25,
                }}
              />
              <Typography
                sx={{
                  fontSize: { xs: 12, xl: 14 },
                }}
              >
                {pricing.popular}
              </Typography>
            </Box>
          ) : null}
        </Box>
        <Box sx={{ mb: 7.5 }}>
          <Button
            variant="outlined"
            sx={{
              width: "100%",
              fontWeight: Fonts.BOLD,
              color: (theme) => theme.palette.text.primary,
              minHeight: 46,
              borderRadius: 7.5,
              boxShadow: "none",
              borderWidth: 2,
              borderColor: pricing.tagColor,
              "&:hover, &:focus": {
                borderColor: pricing.tagColor,
                borderWidth: 2,
              },
            }}
          >
            Start Trial
          </Button>
        </Box>
        <List
          sx={{
            py: 0,
          }}
        >
          {pricing.pricingList.map((data, index) => (
            <ListItem
              key={index}
              sx={{
                p: 0,
                mb: 2.5,
              }}
            >
              <ListItemIcon sx={{ minWidth: 10, mr: 3.5 }}>
                <CheckOutlinedIcon
                  sx={{
                    fontSize: 16,
                    mt: 1,
                    color: (theme) => theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={data.title} />
            </ListItem>
          ))}
        </List>
      </CardWrapper>
    </PackageWrapper>
  );
};

export default PackageCard;
