import React from "react";
import MarketGraph from "./MarketGraph";
import IntlMessages from "../../../../@crema/utility/IntlMessages";
import { Box } from "@mui/material";
import { indigo, red, teal } from "@mui/material/colors";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCard from "../../../../@crema/core/AppCard";
import { useIntl } from "react-intl";
import { MarketGraphData } from "types/models/dashboards/Crypto";

interface CryptoMarketActivityProps {
  marketGraphData: MarketGraphData[];
}

const CryptoMarketActivity: React.FC<CryptoMarketActivityProps> = ({
  marketGraphData,
}) => {
  const { messages } = useIntl();
  return (
    <AppCard
      sxStyle={{ height: 1 }}
      title={messages["dashboard.cryptoMarketActivity"]}
      action={messages["common.viewAll"]}
      contentStyle={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      footer={
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            width: "100%",
            alignItems: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mr: { sm: 2 },
              mt: { xs: -4, sm: 2, md: 2 },
              width: "100%",
            }}
          >
            <Box
              sx={{
                mr: 3,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                component="span"
                sx={{
                  height: { xs: 12, xl: 16 },
                  width: { xs: 12, xl: 16 },
                  display: "block",
                  borderRadius: "50%",
                  mr: 2,
                  backgroundColor: teal[600],
                }}
              />
              <Box
                component="span"
                sx={{
                  mr: 2,
                  fontSize: 14,
                }}
              >
                <IntlMessages id="common.low" />
              </Box>
            </Box>
            <Box
              sx={{
                mr: 3,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                component="span"
                sx={{
                  height: { xs: 12, xl: 16 },
                  width: { xs: 12, xl: 16 },
                  display: "block",
                  borderRadius: "50%",
                  mr: 2,
                  backgroundColor: indigo[700],
                }}
              />
              <Box
                component="span"
                sx={{
                  mr: 2,
                  fontSize: 14,
                }}
              >
                <IntlMessages id="common.medium" />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                component="span"
                sx={{
                  height: { xs: 12, xl: 16 },
                  width: { xs: 12, xl: 16 },
                  display: "block",
                  borderRadius: "50%",
                  mr: 2,
                  backgroundColor: red[600],
                }}
              />
              <Box
                component="span"
                sx={{
                  fontSize: 14,
                }}
              >
                <IntlMessages id="common.high" />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              mt: 2,
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                mr: 3,
                color: "text.secondary",
              }}
            >
              <Box
                component="h3"
                sx={{
                  fontWeight: Fonts.MEDIUM,
                  color: "text.primary",
                  fontSize: 18,
                }}
              >
                1356
              </Box>
              <Box component="span">
                <IntlMessages id="dashboard.openDeals" />
              </Box>
            </Box>

            <Box
              sx={{
                color: "text.secondary",
              }}
            >
              <Box
                component="h3"
                sx={{
                  fontWeight: Fonts.MEDIUM,
                  color: "text.primary",
                  fontSize: 18,
                }}
              >
                $5.9B
              </Box>
              <Box component="span">
                <IntlMessages id="dashboard.dealsVolume" />
              </Box>
            </Box>
          </Box>
        </Box>
      }
    >
      <MarketGraph marketGraphData={marketGraphData} />
    </AppCard>
  );
};

export default CryptoMarketActivity;
