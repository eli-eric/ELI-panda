import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import SimpleMediaQuery from "./SimpleMediaQuery";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleMediaQuerySource from "!raw-loader!./SimpleMediaQuery";

import ThemeHelper from "./ThemeHelper";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ThemeHelperSource from "!raw-loader!./ThemeHelper";

import JavaScriptMedia from "./JavaScriptMedia";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import JavaScriptMediaSource from "!raw-loader!./JavaScriptMedia";

import ServerSide from "./ServerSide";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ServerSideSource from "!raw-loader!./ServerSide";

import UseWidth from "./UseWidth";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import UseWidthSource from "!raw-loader!./UseWidth";

const MediaQuery = () => {
  return (
    <>
      <AppComponentHeader
        title="MediaQuery"
        description="This is a CSS media query hook for React. It listens for matches to a CSS media query. It allows the rendering of components based on whether the query matches or not."
        refUrl="https://mui.com/components/use-media-query/"
      />

      <AppGridContainer>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Simple Media Query"
            component={SimpleMediaQuery}
            source={SimpleMediaQuerySource}
            description="You should provide a media query to the first argument of the hook. The media query string can be any valid CSS media query, e.g."
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="ThemeHelper"
            component={ThemeHelper}
            source={ThemeHelperSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Java Script Media"
            component={JavaScriptMedia}
            source={JavaScriptMediaSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Server Side"
            component={ServerSide}
            source={ServerSideSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="UseWidth"
            component={UseWidth}
            source={UseWidthSource}
            noScrollbar
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default MediaQuery;
