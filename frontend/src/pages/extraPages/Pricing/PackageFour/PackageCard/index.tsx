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
          pt: 5,
          px: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 7.5,
          }}
        >
          <Box
            sx={{
              width: 149,
              height: 149,
              p: 2.5,
              backgroundColor: pricing.priceColor,
              borderRadius: "50%",
              color: (theme) => theme.palette.common.white,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              component="h3"
              sx={{
                fontSize: 16,
                fontWeight: Fonts.MEDIUM,
                mb: 0,
              }}
            >
              <Box
                component="span"
                sx={{
                  fontWeight: Fonts.BOLD,
                  fontSize: 26,
                  mb: 0,
                }}
              >
                ${pricing.price}
              </Box>
              /month
            </Typography>
            <Typography
              component="h5"
              sx={{
                fontWeight: Fonts.BOLD,
                fontSize: 16,
                textTransform: "uppercase",
              }}
            >
              {pricing.title}
            </Typography>
          </Box>
        </Box>
        <List
          sx={{
            py: 0,
            borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
          }}
        >
          {pricing.pricingList.map((data, index) => (
            <ListItem
              key={index}
              sx={{
                px: 0,
                py: 2.75,
                borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
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
    </Card>
  );
};

export default PackageCard;
