import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import BasicBreadcrumbs from "./BasicBreadcrumbs";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicBreadcrumbsSource from "!raw-loader!./BasicBreadcrumbs";

import ActiveLastBreadcrumb from "./ActiveLastBreadcrumb";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ActiveLastBreadcrumbSource from "!raw-loader!./ActiveLastBreadcrumb";

import CustomSeparator from "./CustomSeparator";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomSeparatorSource from "!raw-loader!./CustomSeparator";

import CollapsedBreadcrumbs from "./CollapsedBreadcrumbs";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CollapsedBreadcrumbsSource from "!raw-loader!./CollapsedBreadcrumbs";

import CustomizedBreadcrumbs from "./CustomizedBreadcrumbs";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedBreadcrumbsSource from "!raw-loader!./CustomizedBreadcrumbs";

const BottomNavigation = () => {
  return (
    <>
      <AppComponentHeader
        title="Breadcrumbs"
        description="Breadcrumbs allow users to make selections from a range of values."
        refUrl="https://mui.com/components/breadcrumbs/"
      />

      <AppGridContainer>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Bottom Navigation"
            component={BasicBreadcrumbs}
            source={BasicBreadcrumbsSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="ActiveLast Breadcrumb"
            component={ActiveLastBreadcrumb}
            source={ActiveLastBreadcrumbSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Customized Breadcrumbs"
            component={CustomizedBreadcrumbs}
            source={CustomizedBreadcrumbsSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Collapsed Breadcrumbs"
            component={CollapsedBreadcrumbs}
            source={CollapsedBreadcrumbsSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Custom Separator"
            component={CustomSeparator}
            source={CustomSeparatorSource}
            noScrollbar
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default BottomNavigation;
