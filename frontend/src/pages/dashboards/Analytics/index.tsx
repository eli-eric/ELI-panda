import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AppGridContainer from "@crema/core/AppGridContainer";
import AppInfoView from "@crema/core/AppInfoView";

import { onGetAnalyticsData } from "../../../redux/actions";
import WelcomeCard from "./WelcomeCard/index";
import SalesState from "./SalesState";
import StateCard from "./StateCards";
import VisitorPageView from "./VisitorPageView";
import ActiveVisitors from "./ActiveVisitors";
import TopSelling from "./TopSelling";
import EarningByCountry from "./EarningByCountry";
import TicketsSupport from "./TicketsSupport";
import PageVisits from "./PageVisits";
import OrderNTransaction from "./OrderNTransaction";
import TrafficSource from "./TrafficSource";
import InfoWidget from "./InfoWidget";
import AppAnimate from "@crema/core/AppAnimate";
import { AppState } from "../../../redux/store";

const CRM = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetAnalyticsData());
  }, [dispatch]);

  const { analyticsData } = useSelector<AppState, AppState["dashboard"]>(
    ({ dashboard }) => dashboard
  );

  return (
    <>
      {analyticsData ? (
        <AppAnimate animation="transition.slideUpIn" delay={200}>
          <AppGridContainer>
            <Grid item xs={12} lg={6}>
              <WelcomeCard data={analyticsData.welcomeCard} />

              <AppGridContainer>
                <Grid item xs={12} sm={6}>
                  <StateCard data={analyticsData.revenueCards[0]} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StateCard data={analyticsData.revenueCards[1]} />
                </Grid>
              </AppGridContainer>
            </Grid>
            <Grid item xs={12} lg={6}>
              <SalesState
                salesState={analyticsData.salesState}
                chartData={analyticsData.salesChartData}
              />
            </Grid>
            <Grid item xs={12} md={8} xl={9}>
              <VisitorPageView data={analyticsData.visitorsPageView} />
            </Grid>
            <Grid item xs={12} md={4} xl={3}>
              <ActiveVisitors data={analyticsData.activeVisitors} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TopSelling products={analyticsData.topSellingProduct} />
            </Grid>
            <Grid item xs={12} md={6}>
              <EarningByCountry earningData={analyticsData.earningData} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TicketsSupport tickets={analyticsData.tickets} />

              <AppGridContainer>
                {analyticsData.infoWidgets.map((data, index) => (
                  <Grid item xs={12} md={4} key={"grid-" + index}>
                    <InfoWidget data={data} />
                  </Grid>
                ))}
              </AppGridContainer>
            </Grid>
            <Grid item xs={12} md={6}>
              <PageVisits pageVisits={analyticsData.pageVisits} />
            </Grid>
            <Grid item xs={12} md={9}>
              <OrderNTransaction
                transactionData={analyticsData.transactionData}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TrafficSource trafficData={analyticsData.trafficData} />
            </Grid>
          </AppGridContainer>
        </AppAnimate>
      ) : null}

      <AppInfoView />
    </>
  );
};

export default CRM;
