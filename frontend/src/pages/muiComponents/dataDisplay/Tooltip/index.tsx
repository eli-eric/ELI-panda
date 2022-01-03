import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import BasicTooltip from "./BasicTooltip";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicTooltipSource from "!raw-loader!./BasicTooltip";

import PositionedTooltips from "./PositionedTooltips";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import PositionedTooltipsSource from "!raw-loader!./PositionedTooltips";

import CustomizedTooltips from "./CustomizedTooltips";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedTooltipsSource from "!raw-loader!./CustomizedTooltips";

import ArrowTooltips from "./Arrowtooltips";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ArrowTooltipsSource from "!raw-loader!./Arrowtooltips";

import TriggersTooltips from "./TriggersTooltips";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import TriggersTooltipsSource from "!raw-loader!./TriggersTooltips";

import ControlledTooltips from "./ControlledTooltips";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ControlledTooltipsSource from "!raw-loader!./ControlledTooltips";

import VariableWidth from "./VariableWidth";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import VariableWidthSource from "!raw-loader!./VariableWidth";

import NotInteractiveTooltips from "./NotInteractiveTooltips";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import NotInteractiveTooltipsSource from "!raw-loader!./NotInteractiveTooltips";

import DisabledTooltips from "./DisabledTooltips";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import DisabledTooltipsSource from "!raw-loader!./DisabledTooltips";

import TransitionsTooltips from "./TransitionsTooltips";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import TransitionsTooltipsSource from "!raw-loader!./TransitionsTooltips";

import FollowCursorTooltips from "./FollowCursorTooltips";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import FollowCursorTooltipsSource from "!raw-loader!./FollowCursorTooltips";

import DelayTooltips from "./DelayTooltips";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import DelayTooltipsSource from "!raw-loader!./DelayTooltips";

import AccessibilityTooltips from "./AccessibilityTooltips";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import AccessibilityTooltipsSource from "!raw-loader!./AccessibilityTooltips";

const Tooltip = () => {
  return (
    <>
      <AppComponentHeader
        title="Tooltip"
        description="Tooltips display informative text when users hover over, focus on, or tap an element."
        refUrl="https://mui.com/components/tooltips/"
      />

      <AppGridContainer>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Basic Tooltip"
            component={BasicTooltip}
            source={BasicTooltipSource}
            noScrollbar
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Customized Tooltips"
            component={CustomizedTooltips}
            source={CustomizedTooltipsSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Arrow Tooltips"
            component={ArrowTooltips}
            source={ArrowTooltipsSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Triggers Tooltips"
            component={TriggersTooltips}
            source={TriggersTooltipsSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Controlled Tooltips"
            component={ControlledTooltips}
            source={ControlledTooltipsSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Variable Width"
            component={VariableWidth}
            source={VariableWidthSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Not Interactive Tooltips"
            component={NotInteractiveTooltips}
            source={NotInteractiveTooltipsSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Disabled Tooltips"
            component={DisabledTooltips}
            source={DisabledTooltipsSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Transitions Tooltips"
            component={TransitionsTooltips}
            source={TransitionsTooltipsSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="FollowCursor Tooltips"
            component={FollowCursorTooltips}
            source={FollowCursorTooltipsSource}
            noScrollbar
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Showing and hiding"
            component={DelayTooltips}
            source={DelayTooltipsSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Accessibility Tooltips"
            component={AccessibilityTooltips}
            source={AccessibilityTooltipsSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Positioned Tooltips"
            component={PositionedTooltips}
            source={PositionedTooltipsSource}
            noScrollbar
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Tooltip;
