import React from "react";
import Grid from "@mui/material/Grid/index";
import StatsCard from "./StatsCard";
import IntlMessages from "../../../../@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { QuickStatsData } from "types/models/dashboards/CRM";

interface QuickStatsProps {
  quickStatsData: QuickStatsData;
}

const QuickStats: React.FC<QuickStatsProps> = ({ quickStatsData }) => {
  console.log("quickStatsData", quickStatsData);
  return (
    <>
      <Box
        component="h2"
        sx={{
          color: "text.primary",
          fontSize: 16,
          mb: { xs: 4, sm: 4, xl: 6 },
          fontWeight: Fonts.BOLD,
          textTransform: "uppercase",
        }}
      >
        <IntlMessages id="dashboard.quickStats" />
      </Box>
      <Grid container spacing={{ xs: 4, md: 8 }}>
        <Grid item xs={12} sm={6}>
          <StatsCard
            icon={"/assets/images/dashboard/total-clients.svg"}
            data={quickStatsData.clientsData}
            heading={<IntlMessages id="dashboard.totalClients" />}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <StatsCard
            icon={"/assets/images/dashboard/invoices.svg"}
            data={quickStatsData.invoiceData}
            heading={<IntlMessages id="dashboard.paidInvoices" />}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <StatsCard
            icon={"/assets/images/dashboard/total-projects.svg"}
            data={quickStatsData.totalProjectsData}
            heading={<IntlMessages id="dashboard.totalProjects" />}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <StatsCard
            icon={"/assets/images/dashboard/open-projects.svg"}
            data={quickStatsData.openProjectsData}
            heading={<IntlMessages id="dashboard.openProjects" />}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default QuickStats;
