import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import TemporaryDrawer from "./TemporaryDrawer";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import TemporaryDrawerSource from "!raw-loader!./TemporaryDrawer";

import SwipeableTemporaryDrawer from "./SwipeableTemporaryDrawer";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import SwipeableTemporaryDrawerSource from "!raw-loader!./SwipeableTemporaryDrawer";

import SwipeableEdgeDrawer from "./SwipeableEdgeDrawer";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import SwipeableEdgeDrawerSource from "!raw-loader!./SwipeableEdgeDrawer";

import ResponsiveDrawer from "./ResponsiveDrawer";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ResponsiveDrawerSource from "!raw-loader!./ResponsiveDrawer";

import PersistentDrawerLeft from "./PersistentDrawerLeft";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import PersistentDrawerLeftSource from "!raw-loader!./PersistentDrawerLeft";

import PersistentDrawerRight from "./PersistentDrawerRight";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import PersistentDrawerRightSource from "!raw-loader!./PersistentDrawerRight";

import MiniDrawer from "./MiniDrawer";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import MiniDrawerSource from "!raw-loader!./MiniDrawer";

import PermanentDrawerLeft from "./PermanentDrawerLeft";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import PermanentDrawerLeftSource from "!raw-loader!./PermanentDrawerLeft";

import PermanentDrawerRight from "./PermanentDrawerRight";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import PermanentDrawerRightSource from "!raw-loader!./PermanentDrawerRight";

import ClippedDrawer from "./ClippedDrawer";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ClippedDrawerSource from "!raw-loader!./ClippedDrawer";

const Drawer = () => {
  return (
    <>
      <AppComponentHeader
        title="Drawer"
        description="Navigation drawers provide access to destinations in your app. Side sheets are surfaces containing supplementary content that are anchored to the left or right edge of the screen."
        refUrl="https://mui.com/components/drawers/"
      />

      <AppGridContainer>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Temporary drawer"
            component={TemporaryDrawer}
            source={TemporaryDrawerSource}
            description="Temporary navigation drawers can toggle open or closed. Closed by default, the drawer opens temporarily above all other content until a section is selected."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Swipeable Temporary Drawer"
            component={SwipeableTemporaryDrawer}
            source={SwipeableTemporaryDrawerSource}
            description="Temporary navigation drawers can toggle open or closed. Closed by default, the drawer opens temporarily above all other content until a section is selected."
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Swipeable Edge Drawer"
            component={SwipeableEdgeDrawer}
            source={SwipeableEdgeDrawerSource}
            description="Temporary navigation drawers can toggle open or closed. Closed by default, the drawer opens temporarily above all other content until a section is selected."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Responsive Drawer"
            component={ResponsiveDrawer}
            source={ResponsiveDrawerSource}
            description="Temporary navigation drawers can toggle open or closed. Closed by default, the drawer opens temporarily above all other content until a section is selected."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Persistent Drawer Left"
            component={PersistentDrawerLeft}
            source={PersistentDrawerLeftSource}
            description="Temporary navigation drawers can toggle open or closed. Closed by default, the drawer opens temporarily above all other content until a section is selected."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Persistent Drawer Right"
            component={PersistentDrawerRight}
            source={PersistentDrawerRightSource}
            description="Temporary navigation drawers can toggle open or closed. Closed by default, the drawer opens temporarily above all other content until a section is selected."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Mini Drawer"
            component={MiniDrawer}
            source={MiniDrawerSource}
            description="Temporary navigation drawers can toggle open or closed. Closed by default, the drawer opens temporarily above all other content until a section is selected."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Permanent Drawer Left"
            component={PermanentDrawerLeft}
            source={PermanentDrawerLeftSource}
            description="Temporary navigation drawers can toggle open or closed. Closed by default, the drawer opens temporarily above all other content until a section is selected."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Permanent Drawer Right"
            component={PermanentDrawerRight}
            source={PermanentDrawerRightSource}
            description="Temporary navigation drawers can toggle open or closed. Closed by default, the drawer opens temporarily above all other content until a section is selected."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Clipped Drawer"
            component={ClippedDrawer}
            source={ClippedDrawerSource}
            description="Temporary navigation drawers can toggle open or closed. Closed by default, the drawer opens temporarily above all other content until a section is selected."
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Drawer;
