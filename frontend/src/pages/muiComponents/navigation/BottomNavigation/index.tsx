import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import SimpleBottomNavigation from "./SimpleBottomNavigation";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleBottomNavigationSource from "!raw-loader!./SimpleBottomNavigation";

import LabelBottomNavigation from "./LabelBottomNavigation";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import LabelBottomNavigationSource from "!raw-loader!./LabelBottomNavigation";

import FixedBottomNavigation from "./FixedBottomNavigation";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import FixedBottomNavigationSource from "!raw-loader!./FixedBottomNavigation";

const BottomNavigation = () => {
  return (
    <>
      <AppComponentHeader
        title="Bottom Navigation"
        description="Bottom navigation bars allow movement between primary destinations in an app."
        refUrl="https://mui.com/components/bottom-navigation/"
      />

      <AppGridContainer>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Bottom Navigation"
            component={SimpleBottomNavigation}
            source={SimpleBottomNavigationSource}
            noScrollbar
            description="When there are only three actions, display both icons and text labels at all times."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Label Bottom Navigation"
            component={LabelBottomNavigation}
            source={LabelBottomNavigationSource}
            noScrollbar
            description="When there are only three actions, display both icons and text labels at all times."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Fixed Bottom Navigation"
            component={FixedBottomNavigation}
            source={FixedBottomNavigationSource}
            description="When there are only three actions, display both icons and text labels at all times."
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default BottomNavigation;
