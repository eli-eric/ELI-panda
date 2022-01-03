import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onGetWidgetsData } from "../../../redux/actions";
import AppGridContainer from "@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import WallPaper from "./WallPaper";
import TemperatureCard from "./TemperatureCard";
import VisitorAnalysis from "./VisitorAnalysis";
import BirthdayCard from "./BirthdayCard";
import RecentActivity from "./RecentActivity";
import IllustrationDesign from "./IllustrationDesign";
import Categories from "./Categories";
import Header from "./Header";
import Subscribe from "./Subscribe";
import Profile from "./Profile";
import Messages from "./Messages";
import TaskList from "./TaskList";
import HollywoodMovie from "./HollywoodMovie";
import CountryMap from "./CountryMap";
import Colors from "./Colors";
import AddTags from "./AddTags";
import Reviews from "./Reviews";
import CremaCard from "./CremaCard";
import Formats from "./Formats";
import Price from "./Price";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import AppInfoView from "@crema/core/AppInfoView";
import IntlMessages from "@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import CityInfo from "./CityInfo";
import { blue, indigo } from "@mui/material/colors";
import { Fonts } from "../../../shared/constants/AppEnums";
import DateSelector from "./DatePicker";
import AppAnimate from "@crema/core/AppAnimate";
import { AppLoader } from "../../../@crema";
import { AppState } from "../../../redux/store";

const Widgets = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetWidgetsData());
  }, [dispatch]);

  const { widgetsData } = useSelector<AppState, AppState["dashboard"]>(
    ({ dashboard }) => dashboard
  );

  return (
    <>
      {widgetsData ? (
        <AppAnimate animation="transition.slideUpIn" delay={200}>
          <>
            <Box
              component="h3"
              sx={{
                color: "text.primary",
                mb: { xs: 4, sm: 4, xl: 6 },
                fontSize: 16,
                fontWeight: Fonts.BOLD,
              }}
            >
              <IntlMessages id="dashboard.widgets" />
            </Box>

            <AppGridContainer>
              <Grid item xs={12} md={6}>
                <WallPaper />
              </Grid>

              <Grid item xs={12} md={6}>
                <HollywoodMovie />
              </Grid>

              <Grid item xs={12} md={4}>
                <TemperatureCard temperatures={widgetsData.temperatures} />
              </Grid>

              <Grid item xs={12} md={4}>
                <DateSelector />
              </Grid>

              <Grid item xs={12} md={4}>
                <VisitorAnalysis />
              </Grid>

              <Grid item xs={12} md={4}>
                <BirthdayCard />
              </Grid>

              <Grid item xs={12} md={4}>
                <CountryMap />
              </Grid>

              <Grid item xs={12} md={4}>
                <RecentActivity data={widgetsData.recentActivity} />
              </Grid>

              <Grid item xs={12} md={4}>
                <IllustrationDesign />
              </Grid>

              <Grid item xs={12} md={4}>
                <CityInfo cityData={widgetsData.cityData} />
              </Grid>

              <Grid item xs={12} md={4}>
                <Categories data={widgetsData.categories} />
              </Grid>

              <Grid item xs={12} md={7}>
                <Header />
              </Grid>

              <Grid item xs={12} md={5}>
                <Subscribe />
              </Grid>

              <Grid item xs={12} md={4}>
                <Profile data={widgetsData.profile} />
              </Grid>

              <Grid item xs={12} md={4}>
                <Messages data={widgetsData.messages} />
              </Grid>

              <Grid item xs={12} md={4}>
                <TaskList data={widgetsData.taskList} />
              </Grid>

              <Grid item xs={12} md={3}>
                <Colors data={widgetsData.colorsList} />
              </Grid>

              <Grid item xs={12} md={5}>
                <Reviews data={widgetsData.reviewsList} />
              </Grid>

              <Grid item xs={12} md={4}>
                <AppGridContainer>
                  <Grid item xs={12} md={12}>
                    <AddTags data={widgetsData.tagsList} />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Price />
                  </Grid>
                </AppGridContainer>
              </Grid>

              <Grid item xs={12} md={4}>
                <CremaCard
                  data={widgetsData.mateInfo.facebookInfo}
                  bgColor={indigo[600]}
                  color="white"
                  icon={
                    <Box
                      sx={{
                        "& svg": {
                          color: "white",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <FiFacebook />
                    </Box>
                  }
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <CremaCard
                  data={widgetsData.mateInfo.twitterInfo}
                  bgColor={blue[600]}
                  color="white"
                  icon={
                    <Box
                      sx={{
                        "& svg": {
                          color: "white",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <FiTwitter />
                    </Box>
                  }
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Formats data={widgetsData.formatList} />
              </Grid>
            </AppGridContainer>

            <AppInfoView />
          </>
        </AppAnimate>
      ) : (
        <AppLoader />
      )}
    </>
  );
};

export default Widgets;
