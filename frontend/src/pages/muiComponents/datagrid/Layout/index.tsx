import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import FlexLayoutGrid from "./FlexLayoutGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import FlexLayoutGridSource from "!raw-loader!./FlexLayoutGrid";

import FixedSizeGrid from "./FixedSizeGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import FixedSizeGridSource from "!raw-loader!./FixedSizeGrid";

import AutoHeightGrid from "./AutoHeightGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import AutoHeightGridSource from "!raw-loader!./AutoHeightGrid";

const Layout = () => {
  return (
    <>
      <AppComponentHeader
        title="Layout"
        description="A textarea component for React which grows with content."
        refUrl="https://mui.com/components/data-grid/layout/"
      />

      <AppGridContainer>
        <Grid item xs={12}>
          <AppComponentCard
            title="FlexLayoutGrid"
            component={FlexLayoutGrid}
            source={FlexLayoutGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="FixedSizeGrid"
            component={FixedSizeGrid}
            source={FixedSizeGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="AutoHeightGrid"
            component={AutoHeightGrid}
            source={AutoHeightGridSource}
            noScrollbar
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Layout;
