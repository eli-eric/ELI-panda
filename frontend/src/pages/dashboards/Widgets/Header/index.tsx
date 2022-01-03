import React from "react";
import Button from "@mui/material/Button";
import IntlMessages from "@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCard from "@crema/core/AppCard";
import { useIntl } from "react-intl";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { messages } = useIntl();
  return (
    <AppCard
      sxStyle={{
        height: 1,
        backgroundImage: `url(/assets/images/widgets/jombie.png)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        color: "white",
        position: "relative",
        "&:before": {
          content: '""',
          position: "absolute",
          left: "0",
          top: "0",
          zIndex: 1,
          width: "100%",
          height: "100%",
          display: "block",
          backgroundColor: "rgba(0, 0, 0, 0.45)",
        },
        "& > *": {
          position: "relative",
          zIndex: 3,
        },
      }}
      titleStyle={{ color: "white" }}
      title={messages["dashboard.jombie"]}
    >
      <Box
        sx={{
          width: { xs: "100%", lg: "70%", xl: "50%" },
          height: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          component="p"
          sx={{
            fontSize: 14,
          }}
        >
          <IntlMessages id="dashboard.jombieContent" />
        </Box>

        <Box
          sx={{
            pt: 4,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontWeight: Fonts.LIGHT,
              fontSize: 14,
              mr: 4,
            }}
          >
            <IntlMessages id="dashboard.getStarted" />
          </Button>
          <Button
            variant="outlined"
            sx={{
              fontWeight: Fonts.LIGHT,
              fontSize: 14,
              border: "1px solid",
              borderColor: (theme) => theme.palette.primary.contrastText,
              color: (theme) => theme.palette.primary.contrastText,
            }}
          >
            <IntlMessages id="dashboard.readMore" />
          </Button>
        </Box>
      </Box>
    </AppCard>
  );
};

export default Header;
