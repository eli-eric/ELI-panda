import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import TotalRevenue from "./TotalRevenue";
import QuickStats from "./QuickStats";
import Statistics from "./Statisitcs";
import MonthlyEarning from "./MonthlyEarning";
import Deals from "./Deals";
import SocialMediaAdvertise from "./SocialMediaAdvertise";
import TodayTasks from "./TodayTasks";
import GoalProgress from "./GoalProgress";
import WebTraffic from "./WebTraffic";
import Reviews from "./Reviews";
import TicketSupport from "./TicketSupport";
import { useDispatch, useSelector } from "react-redux";
import { onGetCrmData } from "../../../redux/actions";
import AppGridContainer from "@crema/core/AppGridContainer";
import AppInfoView from "@crema/core/AppInfoView";
import AppAnimate from "../../../@crema/core/AppAnimate";
import { AppState } from "../../../redux/store";

const CRM = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetCrmData());
  }, [dispatch]);

  const { crmData } = useSelector<AppState, AppState["dashboard"]>(
    ({ dashboard }) => dashboard
  );

  return (
    <>
      {crmData ? (
        <AppAnimate animation="transition.slideUpIn" delay={200}>
          <AppGridContainer>
            <Grid item xs={12} md={5}>
              <TotalRevenue revenueData={crmData.revenueData} />
            </Grid>
            <Grid item xs={12} md={7}>
              <QuickStats quickStatsData={crmData.quickStatsData} />
            </Grid>

            <Grid item xs={12} md={8}>
              <Statistics
                clientsData={crmData.statisticsGraph.clientsData}
                incomeData={crmData.statisticsGraph.incomeData}
                projectData={crmData.statisticsGraph.projectData}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <MonthlyEarning earningGraphData={crmData.earningGraphData} />
            </Grid>

            <Grid item xs={12} md={4}>
              <SocialMediaAdvertise socialMediaData={crmData.socialMediaData} />
            </Grid>

            <Grid item xs={12} md={8}>
              <TodayTasks todayTaskData={crmData.todayTaskData} />
            </Grid>

            <Grid item xs={12} md={8}>
              <Deals dealsTableData={crmData.dealsTableData} />
            </Grid>

            <Grid item xs={12} md={4}>
              <GoalProgress progressGraphData={crmData.progressGraphData} />
            </Grid>

            <Grid item xs={12} md={5}>
              <WebTraffic websiteTrafficData={crmData.websiteTrafficData} />
              <Reviews reviewGraphData={crmData.reviewGraphData} />
            </Grid>

            <Grid item xs={12} md={7}>
              <TicketSupport ticketSupportData={crmData.ticketSupportData} />
            </Grid>
          </AppGridContainer>
        </AppAnimate>
      ) : null}

      <AppInfoView />
    </>
  );
};

export default CRM;
