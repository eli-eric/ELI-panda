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
import Card from "@mui/material/Card";
import { PricingObj } from "../../../../../@crema/services/db/extraPages/pricing";

interface PackageCardProps {
  pricing: PricingObj;
}

const PackageCard: React.FC<PackageCardProps> = ({ pricing }) => {
  return (
    <Card
      sx={{
        boxShadow: "none",
        border: "1px solid #e8e5dd",
      }}
    >
      <Box
        sx={{
          py: 5,
          px: 5,
          textAlign: "center",
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <Typography
          component="h5"
          sx={{
            fontWeight: Fonts.BOLD,
            fontSize: 16,
            mb: 4,
          }}
        >
          {pricing.title}
        </Typography>
        <Typography>{pricing.description}</Typography>
      </Box>
      <Box
        sx={{
          py: 5,
          px: 5,
          textAlign: "center",
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <Box
          sx={{
            mb: 4,
          }}
        >
          <Typography
            component="h3"
            sx={{
              fontSize: { xs: 16, md: 18, lg: 20 },
              fontWeight: Fonts.MEDIUM,
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            <Box
              component="span"
              sx={{
                display: "inline-block",
                verticalAlign: "top",
              }}
            >
              $
            </Box>
            <Box
              component="span"
              sx={{
                fontWeight: Fonts.BOLD,
                fontSize: { xs: 26, md: 32, lg: 44, xl: 54 },
                color: pricing.priceColor,
                lineHeight: 1,
              }}
            >
              {pricing.price}
            </Box>
            /month
          </Typography>
        </Box>
        <Typography>{pricing.priceDescription}</Typography>
      </Box>
      <Box
        sx={{
          py: 5,
          px: 5,
        }}
      >
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
        <Box sx={{ mt: 7.5, textAlign: "center" }}>
          <Button
            variant="contained"
            sx={{
              fontWeight: Fonts.BOLD,
              color: (theme) => theme.palette.common.white,
              minWidth: 150,
              borderRadius: 7.5,
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
      </Box>
    </Card>
  );
};

export default PackageCard;
