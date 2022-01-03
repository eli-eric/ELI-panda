import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import HorizontalLinearStepper from "./HorizontalLinearStepper";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import HorizontalLinearStepperSource from "!raw-loader!./HorizontalLinearStepper";

import HorizontalNonLinearStepper from "./HorizontalNonLinearStepper";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import HorizontalNonLinearStepperSource from "!raw-loader!./HorizontalNonLinearStepper";

import HorizontalLabelPositionBelowStepper from "./HorizontalLabelPositionBelowStepper";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import HorizontalLabelPositionBelowStepperSource from "!raw-loader!./HorizontalLabelPositionBelowStepper";

import HorizontalStepperWithError from "./HorizontalStepperWithError";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import HorizontalStepperWithErrorSource from "!raw-loader!./HorizontalStepperWithError";

import CustomizedSteppers from "./CustomizedSteppers";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedSteppersSource from "!raw-loader!./CustomizedSteppers";

import VerticalLinearStepper from "./VerticalLinearStepper";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import VerticalLinearStepperSource from "!raw-loader!./VerticalLinearStepper";

import TextMobileStepper from "./TextMobileStepper";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import TextMobileStepperSource from "!raw-loader!./TextMobileStepper";

import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import SwipeableTextMobileStepperSource from "!raw-loader!./SwipeableTextMobileStepper";

import DotsMobileStepper from "./DotsMobileStepper";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import DotsMobileStepperSource from "!raw-loader!./DotsMobileStepper";

import ProgressMobileStepper from "./ProgressMobileStepper";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ProgressMobileStepperSource from "!raw-loader!./ProgressMobileStepper";

const Stepper = () => {
  return (
    <>
      <AppComponentHeader
        title="Stepper"
        description="Steppers convey progress through numbered steps. It provides a wizard-like workflow."
        refUrl="https://mui.com/components/steppers/"
      />

      <AppGridContainer>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Horizontal stepper"
            component={HorizontalLinearStepper}
            source={HorizontalLinearStepperSource}
            noScrollbar
            description="Horizontal steppers are ideal when the contents of one step depend on an earlier step."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="HorizontalNonLinearStepper"
            component={HorizontalNonLinearStepper}
            source={HorizontalNonLinearStepperSource}
            noScrollbar
            description="Horizontal steppers are ideal when the contents of one step depend on an earlier step."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="HorizontalLabelPositionBelowStepper"
            component={HorizontalLabelPositionBelowStepper}
            source={HorizontalLabelPositionBelowStepperSource}
            noScrollbar
            description="Horizontal steppers are ideal when the contents of one step depend on an earlier step."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="HorizontalStepperWithError"
            component={HorizontalStepperWithError}
            source={HorizontalStepperWithErrorSource}
            noScrollbar
            description="Horizontal steppers are ideal when the contents of one step depend on an earlier step."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="CustomizedSteppers"
            component={CustomizedSteppers}
            source={CustomizedSteppersSource}
            noScrollbar
            description="Horizontal steppers are ideal when the contents of one step depend on an earlier step."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="VerticalLinearStepper"
            component={VerticalLinearStepper}
            source={VerticalLinearStepperSource}
            noScrollbar
            description="Horizontal steppers are ideal when the contents of one step depend on an earlier step."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="TextMobileStepper"
            component={TextMobileStepper}
            source={TextMobileStepperSource}
            noScrollbar
            description="Horizontal steppers are ideal when the contents of one step depend on an earlier step."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="SwipeableTextMobileStepper"
            component={SwipeableTextMobileStepper}
            source={SwipeableTextMobileStepperSource}
            noScrollbar
            description="Horizontal steppers are ideal when the contents of one step depend on an earlier step."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="DotsMobileStepper"
            component={DotsMobileStepper}
            source={DotsMobileStepperSource}
            noScrollbar
            description="Horizontal steppers are ideal when the contents of one step depend on an earlier step."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="ProgressMobileStepper"
            component={ProgressMobileStepper}
            source={ProgressMobileStepperSource}
            noScrollbar
            description="Horizontal steppers are ideal when the contents of one step depend on an earlier step."
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Stepper;
