import React, { useEffect } from "react";
import AppGridContainer from "@crema/core/AppGridContainer";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { onGetWallData } from "../../../redux/actions";
import VideoCall from "./VideoCall";
import FriendRequests from "./FriendRequests";
import Photos from "./Photos";
import RecentNews from "./RecentNews";
import WhoToFollow from "./WhoToFollow";
import Suggestions from "./Suggestions";
import CreatePost from "./CreatePost";
import PostsList from "./PostsList";
import AppsContainer from "@crema/core/AppsContainer";
import AppScrollbar from "@crema/core/AppScrollbar";
import { useIntl } from "react-intl";
import About from "./About";
import SuggestTeam from "./SuggestTeam";
import Stories from "./Stories";
import WhatsHappen from "./WhatsHappen";
import { styled } from "@mui/material/styles";
import { AppState } from "../../../redux/store";

const LeftSidebar = styled(Grid)(({ theme }) => ({
  "@media screen and (min-width: 600px) and (max-width: 1023px)": {
    flexBasis: "40%",
    maxWidth: "40%",
  },
  "@media screen and (min-width: 1200px) and (max-width: 1299px)": {
    flexBasis: "28%",
    maxWidth: "28%",
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
const RightSidebar = styled(Grid)(() => ({
  "@media screen and (max-width: 1020px)": {
    display: "none",
  },
  "@media screen and (min-width: 1200px) and (max-width: 1299px)": {
    flexBasis: "28%",
    maxWidth: "28%",
  },
}));
const ContentWrapper = styled(Grid)(() => ({
  height: "100%",
  "@media screen and (min-width: 600px) and (max-width: 1023px)": {
    flexBasis: "60%",
    maxWidth: "60%",
  },
  "@media screen and (min-width: 1200px) and (max-width: 1299px)": {
    flexBasis: "44%",
    maxWidth: "44%",
  },
}));

const Wall = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetWallData());
  }, [dispatch]);

  const { wallData } = useSelector<AppState, AppState["wallApp"]>(
    ({ wallApp }) => wallApp
  );
  const { messages } = useIntl();

  return (
    <AppsContainer
      title={messages["sidebar.apps.wall"]}
      cardStyle={{ background: "none", boxShadow: "none", border: "0 none" }}
      fullView
    >
      {wallData && (
        <AppGridContainer style={{ height: "calc(100% + 32px)" }}>
          <LeftSidebar item xs={12} sm={6} md={3} style={{ height: "100%" }}>
            <AppScrollbar style={{ height: "100%" }}>
              <VideoCall data={wallData.videoCall} />
              <About about={wallData.about} />
              <SuggestTeam data={wallData.suggestTeam} />
              <Photos photos={wallData.photos} />
              <Suggestions suggestions={wallData.suggestions} />
            </AppScrollbar>
          </LeftSidebar>
          <ContentWrapper item xs={12} sm={6} md={6} style={{ height: "100%" }}>
            <AppScrollbar style={{ height: "100%" }}>
              <CreatePost />
              <PostsList />
            </AppScrollbar>
          </ContentWrapper>
          <RightSidebar item xs={12} sm={6} md={3} style={{ height: "100%" }}>
            <AppScrollbar style={{ height: "100%" }}>
              <Stories stories={wallData.stories} />
              <WhatsHappen whatsHappen={wallData.whatsHappen} />
              <WhoToFollow whoToFollow={wallData.whoToFollow} />
              <FriendRequests friendRequests={wallData.friendRequests} />
              <RecentNews recentNews={wallData.recentNews} />
            </AppScrollbar>
          </RightSidebar>
        </AppGridContainer>
      )}
    </AppsContainer>
  );
};

export default Wall;
