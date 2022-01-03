import React from "react";
import { Box } from "@mui/material";
import invoiceData from "../../../@crema/services/db/extraPages/invoice/invoiceData";
import Typography from "@mui/material/Typography";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import { Fonts } from "../../../shared/constants/AppEnums";
import { ReactComponent as Logo } from "../../../assets/icon/logo.svg";
import { useThemeContext } from "../../../@crema/utility/AppContextProvider/ThemeContextProvider";

const Header = () => {
  const { theme } = useThemeContext();
  return (
    <Box
      sx={{
        pt: 2,
        pb: { xs: 6, sm: 8, xl: 10 },
        mb: { xl: 8 },
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        alignItems: { lg: "center" },
      }}
    >
      <Box
        sx={{
          mr: { lg: 10 },
          mb: { xs: 8, lg: 0 },
          alignSelf: { xs: "center", lg: "flex-start" },
          display: "inline-block",
          "& svg": {
            height: 80,
            width: {
              xs: 60,
              sm: 100,
            },
          },
        }}
      >
        <Logo fill={theme.palette.primary.main} />
      </Box>
      <Box
        sx={{
          mx: -3,
          color: "text.secondary",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <Box
          sx={{
            px: 3,
            mb: { xs: 3, sm: 0 },
            textAlign: { xs: "center", sm: "left" },
            minWidth: 200,
          }}
        >
          <Box
            component="h3"
            sx={{
              color: "text.secondary",
              mb: 1,
              fontWeight: Fonts.BOLD,
              fontSize: 16,
            }}
          >
            {invoiceData.company.name}
          </Box>
          <Typography component="p" sx={{ mb: 1 }}>
            {invoiceData.company.address1}
          </Typography>
          <Typography component="p" sx={{ mb: 1 }}>
            {invoiceData.company.address2}
          </Typography>
          <Typography component="p" sx={{ mb: 1 }}>
            Phone: {invoiceData.company.phone}
          </Typography>
        </Box>

        <Box
          sx={{
            px: 3,
            mb: { xs: 3, sm: 0 },
            textAlign: { xs: "center", lg: "left" },
            minWidth: 200,
          }}
        >
          <Box
            sx={{
              fontSize: 16,
              color: "text.secondary",
              mb: 1,
              fontWeight: Fonts.BOLD,
            }}
            component="h3"
          >
            <IntlMessages id="invoice.client" />
          </Box>
          <Typography component="p" sx={{ mb: 1 }}>
            {invoiceData.client.name}
          </Typography>
          <Typography component="p" sx={{ mb: 1 }}>
            {invoiceData.client.phone}
          </Typography>
          <Typography component="p" sx={{ mb: 1 }}>
            {invoiceData.client.email}
          </Typography>
        </Box>

        <Box
          sx={{
            px: 3,
            mb: { xs: 3, sm: 0 },
            textAlign: { xs: "center", sm: "right", lg: "left" },
            minWidth: 200,
          }}
        >
          <Box
            component="h3"
            sx={{
              mb: 1,
              color: "text.secondary",
              fontWeight: Fonts.BOLD,
              fontSize: 16,
            }}
          >
            <IntlMessages id="invoice.invoice" />
          </Box>
          <Typography component="p" sx={{ mb: 1, fontWeight: Fonts.MEDIUM }}>
            <IntlMessages id="invoice.id" />: {invoiceData.invoice.id}
          </Typography>
          <Typography component="p" sx={{ mb: 1 }}>
            <IntlMessages id="invoice.issued" />: {invoiceData.invoice.date}
          </Typography>
          <Typography component="p" sx={{ mb: 1, fontWeight: Fonts.MEDIUM }}>
            <IntlMessages id="invoice.dueOn" />: {invoiceData.invoice.dueDate}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
