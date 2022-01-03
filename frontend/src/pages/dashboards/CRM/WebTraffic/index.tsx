import React from "react";
import WebTrafficGraph from "./WebTrafficGraph";
import IntlMessages from "../../../../@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import { blue, red } from "@mui/material/colors";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCard from "../../../../@crema/core/AppCard";
import { useIntl } from "react-intl";
import { WebsiteTrafficData } from "types/models/dashboards/CRM";

interface WebTrafficProps {
  websiteTrafficData: WebsiteTrafficData[];
}

const WebTraffic: React.FC<WebTrafficProps> = ({ websiteTrafficData }) => {
  const { messages } = useIntl();
  return (
    <AppCard
      sxStyle={{
        mb: { xs: 5, md: 8 },
      }}
      title={messages["dashboard.websiteTraffic"]}
    >
      <WebTrafficGraph websiteTrafficData={websiteTrafficData} />
      <Box
        sx={{
          pt: 4,
          mb: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Box
            component="h4"
            sx={{
              mb: 2,
              fontWeight: Fonts.MEDIUM,
              fontSize: { xs: 18, xl: 20 },
              color: red[500],
            }}
          >
            1,265
          </Box>
          <Box
            component="p"
            sx={{
              fontSize: 14,
              color: "text.secondary",
            }}
          >
            <IntlMessages id="common.subscribers" />
          </Box>
        </Box>
        <Box
          sx={{
            color: "grey.400",
            fontWeight: Fonts.MEDIUM,
            pt: 2,
            fontSize: { xs: 18, xl: 20 },
          }}
        >
          2019
        </Box>
        <Box>
          <Box
            component="h4"
            sx={{
              mb: 2,
              fontWeight: Fonts.MEDIUM,
              fontSize: { xs: 18, xl: 20 },
              color: blue[400],
            }}
          >
            12,432
          </Box>
          <Box
            component="p"
            sx={{
              fontSize: 14,
              color: "text.secondary",
            }}
          >
            <IntlMessages id="common.newUsers" />
          </Box>
        </Box>
      </Box>
    </AppCard>
  );
};

export default WebTraffic;
