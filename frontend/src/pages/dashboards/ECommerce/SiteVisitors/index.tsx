import React from "react";
import AppCard from "@crema/core/AppCard";
import { Box, Grid } from "@mui/material";
import { useIntl } from "react-intl";
import { AppGridContainer } from "@crema";
import MapView from "./MapView";
import AppList from "@crema/core/AppList";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { SiteVisitorData } from "types/models/dashboards/Ecommerce";

const CountryCell = ({ data }: { data: SiteVisitorData }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      py: 2,
      px: 5,
    }}
    className="item-hover"
  >
    <Box
      sx={{
        mr: 3,
        "& .img": {
          height: 30,
          width: 30,
          borderRadius: "50%",
          backgroundColor: "#fff",
          display: "block",
        },
      }}
    >
      <img src={data.icon} alt="icon" />
    </Box>
    <Box
      component="h6"
      sx={{
        flex: 1,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {data.country}
    </Box>
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        borderRadius: "15px",
        color: "#fff",
        padding: "4px 12px",
      }}
    >
      {data.value}
    </Box>
  </Box>
);

interface SiteVisitorsProps {
  siteVisitorsData: SiteVisitorData[];
}

const SiteVisitors: React.FC<SiteVisitorsProps> = ({ siteVisitorsData }) => {
  const { messages } = useIntl();
  return (
    <AppCard
      sxStyle={{ height: 1 }}
      title={messages["eCommerce.siteVisitorsStatistics"]}
      contentStyle={{ px: 0 }}
    >
      <AppGridContainer>
        <Grid item xs={12} md={3}>
          <Box
            component="p"
            sx={{
              color: "text.secondary",
              pl: 4,
              fontSize: 14,
              fontWeight: Fonts.MEDIUM,
            }}
          >
            {messages["eCommerce.countries"]}
          </Box>
          <AppList
            data={siteVisitorsData}
            renderRow={(data) => <CountryCell key={data.id} data={data} />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MapView />
        </Grid>
        <Grid item xs={12} md={3}>
          <Box
            component="p"
            sx={{
              color: "text.secondary",
              pl: 4,
              fontSize: 14,
              fontWeight: Fonts.MEDIUM,
            }}
          >
            {messages["eCommerce.countries"]}
          </Box>
          <AppList
            data={siteVisitorsData}
            renderRow={(data) => (
              <CountryCell key={"sec-c-" + data.id} data={data} />
            )}
          />
        </Grid>
      </AppGridContainer>
    </AppCard>
  );
};

export default SiteVisitors;
