import React from "react";
import Grid from "@mui/material/Grid";

import AppComponentCard from "@crema/core/AppComponentCard";
import AppComponentHeader from "@crema/core/AppComponentHeader";
import AppGridContainer from "@crema/core/AppGridContainer";
import DailyMotion from "./DailyMotion";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import DailyMotionSource from "!raw-loader!./DailyMotion";
import Facebook from "./Facebook";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import FacebookSource from "!raw-loader!./Facebook";
import Mixcloud from "./Mixcloud";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import MixcloudSource from "!raw-loader!./Mixcloud";
import SoundCloud from "./SoundCloud";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import SoundCloudSource from "!raw-loader!./SoundCloud";
import Streamable from "./Streamable";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import StreamableSource from "!raw-loader!./Streamable";
import Twitch from "./Twitch";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import TwitchSource from "!raw-loader!./Twitch";
import Vimeo from "./Vimeo";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import VimeoSource from "!raw-loader!./Vimeo";
import Wistia from "./Wistia";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import WistiaSource from "!raw-loader!./Wistia";
import YouTube from "./YouTube";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import YouTubeSource from "!raw-loader!./YouTube";

const ReactPlayer = () => {
  return (
    <>
      <AppComponentHeader
        title="ReactPlayer"
        description="A React component for playing a variety of URLs, including file paths, YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, and DailyMotion."
        refUrl="https://cookpete.com/react-player/"
      />

      <AppGridContainer>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="YouTube"
            component={YouTube}
            source={YouTubeSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Facebook"
            component={Facebook}
            source={FacebookSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Vimeo"
            component={Vimeo}
            source={VimeoSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Daily Motion"
            component={DailyMotion}
            source={DailyMotionSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Sound Cloud"
            component={SoundCloud}
            source={SoundCloudSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Streamable"
            component={Streamable}
            source={StreamableSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Twitch"
            component={Twitch}
            source={TwitchSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Wistia"
            component={Wistia}
            source={WistiaSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="Mixcloud"
            component={Mixcloud}
            source={MixcloudSource}
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default ReactPlayer;
