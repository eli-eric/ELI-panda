import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import BasicAlerts from "./BasicAlerts";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicAlertsSource from "!raw-loader!./BasicAlerts";

import DescriptionAlerts from "./DescriptionAlerts";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import DescriptionAlertsSource from "!raw-loader!./DescriptionAlerts";

import ActionAlerts from "./ActionAlerts";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ActionAlertsSource from "!raw-loader!./ActionAlerts";

import TransitionAlerts from "./TransitionAlerts";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import TransitionAlertsSource from "!raw-loader!./TransitionAlerts";

import IconAlerts from "./IconAlerts";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconAlertsSource from "!raw-loader!./IconAlerts";

import Variants from "./Variants";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import VariantsSource from "!raw-loader!./Variants";

import Filled from "./Filled";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import FilledSource from "!raw-loader!./Filled";

import ColorAlerts from "./ColorAlerts";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ColorAlertsSource from "!raw-loader!./ColorAlerts";

const Alert = () => {
  return (
    <>
      <AppComponentHeader
        title="Alert"
        description="An alert displays a short, important message in a way that attracts the users attention without interrupting the users task."
        refUrl="https://mui.com/components/alert/"
      />

      <AppGridContainer>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Basic alerts"
            component={BasicAlerts}
            source={BasicAlertsSource}
            noScrollbar
            description="The alert offers four severity levels that set a distinctive icon and color."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Variants"
            component={Variants}
            source={VariantsSource}
            noScrollbar
            description="The alert offers four severity levels that set a distinctive icon and color."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Action Alerts"
            component={ActionAlerts}
            source={ActionAlertsSource}
            noScrollbar
            description="The alert offers four severity levels that set a distinctive icon and color."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="TransitionAlerts"
            component={TransitionAlerts}
            source={TransitionAlertsSource}
            noScrollbar
            description="The alert offers four severity levels that set a distinctive icon and color."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Icon Alerts"
            component={IconAlerts}
            source={IconAlertsSource}
            noScrollbar
            description="The alert offers four severity levels that set a distinctive icon and color."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Color Alerts"
            component={ColorAlerts}
            source={ColorAlertsSource}
            noScrollbar
            description="The alert offers four severity levels that set a distinctive icon and color."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Filled"
            component={Filled}
            source={FilledSource}
            noScrollbar
            description="The alert offers four severity levels that set a distinctive icon and color."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="DescriptionAlerts"
            component={DescriptionAlerts}
            source={DescriptionAlertsSource}
            noScrollbar
            description="The alert offers four severity levels that set a distinctive icon and color."
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Alert;
