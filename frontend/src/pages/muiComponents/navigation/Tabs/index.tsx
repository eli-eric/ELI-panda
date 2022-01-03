import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import BasicTabs from "./BasicTabs";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicTabsSource from "!raw-loader!./BasicTabs";

import LabTabs from "./LabTabs";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import LabTabsSource from "!raw-loader!./LabTabs";

import TabsWrappedLabel from "./TabsWrappedLabel";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import TabsWrappedLabelSource from "!raw-loader!./TabsWrappedLabel";

import ColorTabs from "./ColorTabs";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ColorTabsSource from "!raw-loader!./ColorTabs";

import DisabledTabs from "./DisabledTabs";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import DisabledTabsSource from "!raw-loader!./DisabledTabs";

import FullWidthTabs from "./FullWidthTabs";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import FullWidthTabsSource from "!raw-loader!./FullWidthTabs";

import CenteredTabs from "./CenteredTabs";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CenteredTabsSource from "!raw-loader!./CenteredTabs";

import ScrollableTabsButtonAuto from "./ScrollableTabsButtonAuto";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ScrollableTabsButtonAutoSource from "!raw-loader!./ScrollableTabsButtonAuto";

import ScrollableTabsButtonForce from "./ScrollableTabsButtonForce";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ScrollableTabsButtonForceSource from "!raw-loader!./ScrollableTabsButtonForce";

import ScrollableTabsButtonVisible from "./ScrollableTabsButtonVisible";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ScrollableTabsButtonVisibleSource from "!raw-loader!./ScrollableTabsButtonVisible";

import CustomizedTabs from "./CustomizedTabs";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedTabsSource from "!raw-loader!./CustomizedTabs";

import VerticalTabs from "./VerticalTabs";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import VerticalTabsSource from "!raw-loader!./VerticalTabs";

import NavTabs from "./NavTabs";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import NavTabsSource from "!raw-loader!./NavTabs";

import IconTabs from "./IconTabs";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconTabsSource from "!raw-loader!./IconTabs";

import IconLabelTabs from "./IconLabelTabs";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconLabelTabsSource from "!raw-loader!./IconLabelTabs";

import IconPosition from "./IconPosition";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconPositionSource from "!raw-loader!./IconPosition";

import AccessibleTabs1 from "./AccessibleTabs1";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import AccessibleTabs1Source from "!raw-loader!./AccessibleTabs1";

import AccessibleTabs2 from "./AccessibleTabs2";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import AccessibleTabs2Source from "!raw-loader!./AccessibleTabs2";

import UnstyledTabsBasic from "./UnstyledTabsBasic";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import UnstyledTabsBasicSource from "!raw-loader!./UnstyledTabsBasic";

import UnstyledTabsCustomized from "./UnstyledTabsCustomized";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import UnstyledTabsCustomizedSource from "!raw-loader!./UnstyledTabsCustomized";

const Tabs = () => {
  return (
    <>
      <AppComponentHeader
        title="Tabs"
        description="Tabs make it easy to explore and switch between different views."
        refUrl="https://mui.com/components/tabs/"
      />

      <AppGridContainer>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Basic tabs"
            component={BasicTabs}
            source={BasicTabsSource}
            noScrollbar
            description="A basic example with tab panels."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Lab Tabs"
            component={LabTabs}
            source={LabTabsSource}
            noScrollbar
            description="A basic example with tab panels."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Tabs Wrapped Label"
            component={TabsWrappedLabel}
            source={TabsWrappedLabelSource}
            noScrollbar
            description="A basic example with tab panels."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Color Tabs"
            component={ColorTabs}
            source={ColorTabsSource}
            noScrollbar
            description="A basic example with tab panels."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Unstyled Tabs Customized"
            component={UnstyledTabsCustomized}
            source={UnstyledTabsCustomizedSource}
            noScrollbar
            description="A basic example with tab panels."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Full Width Tabs"
            component={FullWidthTabs}
            source={FullWidthTabsSource}
            noScrollbar
            description="A basic example with tab panels."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Disabled Tabs"
            component={DisabledTabs}
            source={DisabledTabsSource}
            noScrollbar
            description="A basic example with tab panels."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Centered Tabs"
            component={CenteredTabs}
            source={CenteredTabsSource}
            noScrollbar
            description="A basic example with tab panels."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Scrollable Tabs Button Auto"
            component={ScrollableTabsButtonAuto}
            source={ScrollableTabsButtonAutoSource}
            noScrollbar
            description="A basic example with tab panels."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Scrollable Tabs Button Force"
            component={ScrollableTabsButtonForce}
            source={ScrollableTabsButtonForceSource}
            noScrollbar
            description="A basic example with tab panels."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Scrollable Tabs Button Visible"
            component={ScrollableTabsButtonVisible}
            source={ScrollableTabsButtonVisibleSource}
            noScrollbar
            description="A basic example with tab panels."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Nav Tabs"
            component={NavTabs}
            source={NavTabsSource}
            noScrollbar
            description="A basic example with tab panels."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Icon Position"
            component={IconPosition}
            source={IconPositionSource}
            noScrollbar
            description="A basic example with tab panels."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Icon Label Tabs"
            component={IconLabelTabs}
            source={IconLabelTabsSource}
            noScrollbar
            description="A basic example with tab panels."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Icon Tabs"
            component={IconTabs}
            source={IconTabsSource}
            noScrollbar
            description="A basic example with tab panels."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Accessible Tabs1"
            component={AccessibleTabs1}
            source={AccessibleTabs1Source}
            noScrollbar
            description="A basic example with tab panels."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Accessible Tabs2"
            component={AccessibleTabs2}
            source={AccessibleTabs2Source}
            noScrollbar
            description="A basic example with tab panels."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Unstyled Tabs Basic"
            component={UnstyledTabsBasic}
            source={UnstyledTabsBasicSource}
            noScrollbar
            description="A basic example with tab panels."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Customized Tabs"
            component={CustomizedTabs}
            source={CustomizedTabsSource}
            noScrollbar
            description="A basic example with tab panels."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Vertical Tabs"
            component={VerticalTabs}
            source={VerticalTabsSource}
            noScrollbar
            description="A basic example with tab panels."
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Tabs;
