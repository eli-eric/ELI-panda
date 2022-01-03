import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import SimpleSnackbar from "./SimpleSnackbar";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimpleSnackbarSource from "!raw-loader!./SimpleSnackbar";

import CustomizedSnackbars from "./CustomizedSnackbars";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedSnackbarsSource from "!raw-loader!./CustomizedSnackbars";

import PositionedSnackbar from "./PositionedSnackbar";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import PositionedSnackbarSource from "!raw-loader!./PositionedSnackbar";

import LongTextSnackbar from "./LongTextSnackbar";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import LongTextSnackbarSource from "!raw-loader!./LongTextSnackbar";

import ConsecutiveSnackbars from "./ConsecutiveSnackbars";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ConsecutiveSnackbarsSource from "!raw-loader!./ConsecutiveSnackbars";

import FabIntegrationSnackbar from "./FabIntegrationSnackbar";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import FabIntegrationSnackbarSource from "!raw-loader!./FabIntegrationSnackbar";

import TransitionsSnackbar from "./TransitionsSnackbar";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import TransitionsSnackbarSource from "!raw-loader!./TransitionsSnackbar";

import DirectionSnackbar from "./DirectionSnackbar";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import DirectionSnackbarSource from "!raw-loader!./DirectionSnackbar";

const Snackbar = () => {
  return (
    <>
      <AppComponentHeader
        title="Snackbar"
        description="Snackbars provide brief notifications. The component is also known as a toast."
        refUrl="https://mui.com/components/snackbars/"
      />

      <AppGridContainer>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Simple Snackbar"
            component={SimpleSnackbar}
            source={SimpleSnackbarSource}
            noScrollbar
            description="The alert offers four severity levels that set a distinctive icon and color."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Consecutive Snackbars"
            component={ConsecutiveSnackbars}
            source={ConsecutiveSnackbarsSource}
            noScrollbar
            description="The alert offers four severity levels that set a distinctive icon and color."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Customized Snackbars"
            component={CustomizedSnackbars}
            source={CustomizedSnackbarsSource}
            noScrollbar
            description="The alert offers four severity levels that set a distinctive icon and color."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Long Text Snackbar"
            component={LongTextSnackbar}
            source={LongTextSnackbarSource}
            noScrollbar
            description="The alert offers four severity levels that set a distinctive icon and color."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Positioned Snackbar"
            component={PositionedSnackbar}
            source={PositionedSnackbarSource}
            noScrollbar
            description="The alert offers four severity levels that set a distinctive icon and color."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="FabIntegration Snackbar"
            component={FabIntegrationSnackbar}
            source={FabIntegrationSnackbarSource}
            noScrollbar
            description="The alert offers four severity levels that set a distinctive icon and color."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Transitions Snackbar"
            component={TransitionsSnackbar}
            source={TransitionsSnackbarSource}
            noScrollbar
            description="The alert offers four severity levels that set a distinctive icon and color."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Direction Snackbar"
            component={DirectionSnackbar}
            source={DirectionSnackbarSource}
            noScrollbar
            description="The alert offers four severity levels that set a distinctive icon and color."
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Snackbar;
