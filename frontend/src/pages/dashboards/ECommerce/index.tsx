import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onGetECommerceData } from "../../../redux/actions";
import AppInfoView from "@crema/core/AppInfoView";
import { Grid } from "@mui/material";
import AppGridContainer from "@crema/core/AppGridContainer";
import SalesState from "./SalesState";
import SaleStatics from "./SaleStatics";
import Application from "./Application";
import ReportCard from "./ReportCard";
import RecentOrders from "./RecentOrders";
import Revenue from "./Revenue";
import MarketingCampaign from "./MarketingCampaign";
import Notifications from "./Notifications";
import NewCustomers from "./NewCustomers";
import PopularProducts from "./PopularProducts";
import Browser from "./Browser";
import SiteVisitors from "./SiteVisitors";
import AppAnimate from "@crema/core/AppAnimate";
import { AppState } from "../../../redux/store";

const ECommerce = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetECommerceData());
  }, [dispatch]);

  const { ecommerceData } = useSelector<AppState, AppState["dashboard"]>(
    ({ dashboard }) => dashboard
  );

  return (
    <>
      {ecommerceData ? (
        <AppAnimate animation="transition.slideUpIn" delay={200}>
          <AppGridContainer>
            {ecommerceData.salesState.map((state, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <SalesState state={state} />
              </Grid>
            ))}
            <Grid item xs={12} md={9}>
              <SaleStatics />
            </Grid>
            <Grid item xs={12} md={3}>
              <Application />
            </Grid>
            {ecommerceData.reportCards.map((report, index) => (
              <Grid item xs={12} md={4} key={index}>
                <ReportCard data={report} />
              </Grid>
            ))}
            <Grid item xs={12} md={9}>
              <RecentOrders recentOrders={ecommerceData.recentOrders} />
            </Grid>
            <Grid item xs={12} md={3}>
              <Revenue />
            </Grid>

            <Grid item xs={12} md={6}>
              <MarketingCampaign
                marketingCampaign={ecommerceData.marketingCampaign}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Notifications notifications={ecommerceData.notifications} />
            </Grid>

            <Grid item xs={12} md={6}>
              <NewCustomers newCustomers={ecommerceData.newCustomers} />
            </Grid>
            <Grid item xs={12} md={6}>
              <PopularProducts
                popularProducts={ecommerceData.popularProducts}
              />
            </Grid>

            <Grid item xs={12} md={9}>
              <SiteVisitors siteVisitorsData={ecommerceData.siteVisitors} />
            </Grid>
            <Grid item xs={12} md={3}>
              <Browser browserData={ecommerceData.browser} />
            </Grid>
          </AppGridContainer>
        </AppAnimate>
      ) : null}
      <AppInfoView />
    </>
  );
};

export default ECommerce;
