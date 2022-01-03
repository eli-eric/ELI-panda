import React from "react";
import RevenueGraph from "./RevenueGraph";
import IntlMessages from "../../../../@crema/utility/IntlMessages";
import { alpha, Box } from "@mui/material";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCard from "../../../../@crema/core/AppCard";
import { RevenueData } from "types/models/dashboards/CRM";

interface TotalRevenueProps {
  revenueData: RevenueData;
}

const TotalRevenue: React.FC<TotalRevenueProps> = ({ revenueData }) => {
  return (
    <>
      <Box
        component="h2"
        sx={{
          textTransform: "uppercase",
          color: "text.primary",
          fontSize: 16,
          mb: { xs: 4, sm: 4, xl: 6 },
          fontWeight: Fonts.BOLD,
        }}
      >
        <IntlMessages id="dashboard.totalRevenue" />
      </Box>
      <AppCard>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box
            sx={{
              mr: { xs: 2, xl: 10 },
              p: 5,
              display: "flex",
              flexDirection: "column",
              color: "text.secondary",
              backgroundColor: (theme) =>
                alpha(theme.palette.primary.main, 0.1),
            }}
          >
            <Box
              sx={{
                mb: 4,
              }}
            >
              <Box
                sx={{
                  mb: 0.75,
                  color: "text.primary",
                  fontWeight: Fonts.MEDIUM,
                  fontSize: 18,
                }}
                component="h3"
              >
                {revenueData.ytdRevenue}
              </Box>
              <Box
                component="p"
                sx={{
                  mb: 0,
                  fontSize: 14,
                }}
              >
                <IntlMessages id="dashboard.ytdRevenue" />
              </Box>
            </Box>
            <Box
              sx={{
                mt: "auto",
                mx: { xs: -2, xl: -5 },
                mb: 1,
                display: "flex",
              }}
            >
              <Box
                sx={{
                  px: { xs: 2, xl: 5 },
                }}
              >
                <Box
                  sx={{
                    mb: 0.75,
                    color: revenueData.clientsColor,
                    fontWeight: Fonts.MEDIUM,
                    fontSize: 18,
                  }}
                  component="h3"
                >
                  {revenueData.clients}
                </Box>
                <Box
                  component="p"
                  sx={{
                    mb: 0,
                    fontSize: 14,
                  }}
                >
                  <IntlMessages id="dashboard.clients" />
                </Box>
              </Box>

              <Box
                sx={{
                  px: { xs: 2, xl: 5 },
                }}
              >
                <Box
                  sx={{
                    mb: 0.75,
                    color: revenueData.countriesColor,
                    fontWeight: Fonts.MEDIUM,
                    fontSize: 18,
                  }}
                  component="h2"
                >
                  {revenueData.countries}
                </Box>
                <Box
                  component="p"
                  sx={{
                    mb: 0,
                    fontSize: 14,
                  }}
                >
                  <IntlMessages id="dashboard.countries" />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              mb: { xs: -6, xl: -2 },
            }}
          >
            <RevenueGraph data={revenueData.revenueGraphData} />
          </Box>
        </Box>
      </AppCard>
    </>
  );
};

export default TotalRevenue;
