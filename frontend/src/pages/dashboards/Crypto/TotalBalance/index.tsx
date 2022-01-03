import React from "react";
import Button from "@mui/material/Button";
import IntlMessages from "../../../../@crema/utility/IntlMessages";
import { alpha, Box } from "@mui/material";
import CoinsInfo from "./CoinsInfo";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCard from "../../../../@crema/core/AppCard";
import { TotalBalanceData } from "types/models/dashboards/Crypto";

interface TotalBalanceProps {
  totalBalanceData: TotalBalanceData;
}

const TotalBalance: React.FC<TotalBalanceProps> = ({ totalBalanceData }) => {
  return (
    <Box>
      <Box
        component="h2"
        sx={{
          color: "text.primary",
          fontSize: 16,
          textTransform: "uppercase",
          mb: { xs: 4, sm: 4, xl: 6 },
          fontWeight: Fonts.BOLD,
        }}
      >
        <IntlMessages id="dashboard.totalBalance" />
      </Box>
      <AppCard sxStyle={{}}>
        <Box
          sx={{
            mb: { xs: 3, md: 6, xl: 8 },
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Box
              component="h3"
              sx={{
                fontWeight: Fonts.MEDIUM,
                fontSize: 20,
              }}
            >
              ${totalBalanceData.balance}
            </Box>
            <Box
              component="p"
              sx={{
                color: "text.secondary",
                fontSize: 14,
                whiteSpace: "nowrap",
                mb: 1,
              }}
            >
              <IntlMessages id="dashboard.avlBalance" />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box>
              <Button
                sx={{
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.1),
                  color: "primary.main",
                  fontWeight: Fonts.LIGHT,
                  textTransform: "capitalize",
                  width: 96,
                  fontSize: 16,
                  "&:hover, &:focus": {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.primary.main, 0.15),
                    color: "primary.main",
                  },
                  lineHeight: { xs: "16px", sm: "20px", xl: "26px" },
                }}
              >
                <IntlMessages id="common.send" />
              </Button>
            </Box>
            <Box
              sx={{
                ml: 3,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  fontWeight: Fonts.LIGHT,
                  textTransform: "capitalize",
                  width: 96,
                  fontSize: 16,
                  lineHeight: { xs: "16px", sm: "20px", xl: "26px" },
                }}
              >
                <IntlMessages id="common.receive" />
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          component="p"
          sx={{
            mb: { xs: 3.5, md: 4 },
            fontSize: 16,
            color: "text.secondary",
          }}
        >
          <IntlMessages id="dashboard.buyCurrency" />
        </Box>
        <Box
          sx={{
            pt: { md: 2, lg: 3 },
          }}
        >
          <CoinsInfo coins={totalBalanceData.coins} />
        </Box>
      </AppCard>
    </Box>
  );
};

export default TotalBalance;
