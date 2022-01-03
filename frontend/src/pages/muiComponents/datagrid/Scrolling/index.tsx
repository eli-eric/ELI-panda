import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import ScrollPlayground from "./ScrollPlayground";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ScrollPlaygroundSource from "!raw-loader!./ScrollPlayground";

const Scrolling = () => {
  return (
    <>
      <AppComponentHeader
        title="Scrolling"
        description=" This section presents how to programmatically control the scroll."
        refUrl="https://mui.com/components/data-grid/scrolling/"
      />

      <AppGridContainer>
        <Grid item xs={12}>
          <AppComponentCard
            title="Scroll Play ground"
            component={ScrollPlayground}
            source={ScrollPlaygroundSource}
            noScrollbar
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Scrolling;
