import React from "react";
import { Box, Typography } from "@mui/material";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import { Fonts } from "../../../shared/constants/AppEnums";
import { useThemeContext } from "../../../@crema/utility/AppContextProvider/ThemeContextProvider";
import invoiceData from "../../../@crema/services/db/extraPages/invoice/invoiceData";
import { ReactComponent as Logo } from "../../../assets/icon/logo.svg";

const Header = () => {
  const { theme } = useThemeContext();
  return (
    <Box
      sx={{
        pt: 2,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: { sm: "space-between" },
      }}
    >
      <Box sx={{ mr: { sm: 3 }, mb: { xs: 5, sm: 0 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", sm: "flex-start" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              cursor: "pointer",
              alignItems: "center",
              mb: { xs: 5, sm: 7.5, lg: 8 },
              "& svg": {
                height: 38,
              },
            }}
          >
            <Logo fill={theme.palette.primary.main} />
            <Box
              component="span"
              sx={{
                color: "text.primary",
                fontSize: { xs: 26, md: 30 },
                fontWeight: Fonts.SEMI_BOLD,
                marginLeft: 3,
              }}
            >
              Crema
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            mb: { xs: 5, lg: 6 },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Box
            sx={{
              color: "text.primary",
              mb: 1.5,
              fontWeight: Fonts.MEDIUM,
              fontSize: { xs: 14, sm: 16 },
            }}
          >
            <IntlMessages id="invoice.invoiceTo" />
          </Box>
          <Box
            sx={{
              color: "text.primary",
              mb: 1,
              fontWeight: Fonts.SEMI_BOLD,
              fontSize: 22,
            }}
          >
            {invoiceData.client.name}
          </Box>
        </Box>
        <Box
          sx={{
            mb: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", sm: "flex-start" },
          }}
        >
          <Typography
            component="p"
            sx={{
              mb: 1,
              fontWeight: Fonts.BOLD,
              display: "flex",
              alignItems: "center",
            }}
          >
            A
            <Box
              component="span"
              sx={{
                color: "text.secondary",
                ml: 3,
                fontWeight: Fonts.REGULAR,
              }}
            >
              {invoiceData.company.address1}
            </Box>
          </Typography>
          <Typography
            component="p"
            sx={{
              mb: 1,
              fontWeight: Fonts.BOLD,
              display: "flex",
              alignItems: "center",
            }}
          >
            E
            <Box
              component="span"
              sx={{
                color: "text.secondary",
                ml: 3,
                fontWeight: Fonts.REGULAR,
              }}
            >
              {invoiceData.company.name}
            </Box>
          </Typography>
          <Typography
            component="p"
            sx={{
              mb: 1,
              fontWeight: Fonts.BOLD,
              display: "flex",
              alignItems: "center",
            }}
          >
            P
            <Box
              component="span"
              sx={{
                color: "text.secondary",
                ml: 3,
                fontWeight: Fonts.REGULAR,
              }}
            >
              {invoiceData.company.phone}
            </Box>
          </Typography>
        </Box>
      </Box>
      <Box sx={{ ml: { sm: 2 } }}>
        <Box
          component="h1"
          sx={{
            mb: { xs: 5, sm: 6, lg: 7, xl: 12 },
            color: "text.primary",
            fontWeight: Fonts.BOLD,
            fontSize: 32,
            lineHeight: 1,
            textTransform: "uppercase",
            textAlign: { xs: "center", sm: "right" },
          }}
        >
          <IntlMessages id="invoice.invoice" />
        </Box>
        <Box
          sx={{
            mb: { xs: 5, lg: 6 },
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", sm: "flex-start" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.primary",
              mb: 1.5,
              fontWeight: Fonts.MEDIUM,
            }}
          >
            <Box component="span">
              <IntlMessages id="invoice.invoiceDate" /> :
            </Box>
            <Box component="span" sx={{ ml: 2 }}>
              {invoiceData.invoice.date}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.primary",
              mb: 1.5,
              fontWeight: Fonts.MEDIUM,
            }}
          >
            <Box component="span">
              <IntlMessages id="invoice.invoiceNumber" /> :
            </Box>
            <Box component="span" sx={{ ml: 2 }}>
              {invoiceData.invoice.id}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            mb: { xs: 5, sm: 7.5, lg: 8, xl: 15 },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Box
            sx={{
              color: "text.secondary",
              mb: 1.5,
              fontWeight: Fonts.MEDIUM,
            }}
          >
            <IntlMessages id="invoice.totalAmount" />
          </Box>
          <Box
            sx={{
              color: "text.primary",
              mb: 1.5,
              fontWeight: Fonts.BOLD,
            }}
          >
            $450.00
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
