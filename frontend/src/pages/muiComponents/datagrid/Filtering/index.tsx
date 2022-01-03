import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import BasicFilteringGrid from "./BasicFilteringGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicFilteringGridSource from "!raw-loader!./BasicFilteringGrid";

import FilterOperators from "./FilterOperators";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import FilterOperatorsSource from "!raw-loader!./FilterOperators";

import DisableFilteringGrid from "./DisableFilteringGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import DisableFilteringGridSource from "!raw-loader!./DisableFilteringGrid";

import ExtendNumericOperator from "./ExtendNumericOperator";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ExtendNumericOperatorSource from "!raw-loader!./ExtendNumericOperator";

import ColumnTypeFilteringGrid from "./ColumnTypeFilteringGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ColumnTypeFilteringGridSource from "!raw-loader!./ColumnTypeFilteringGrid";

import CustomRatingOperator from "./CustomRatingOperator";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomRatingOperatorSource from "!raw-loader!./CustomRatingOperator";

import ServerFilterGrid from "./ServerFilterGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ServerFilterGridSource from "!raw-loader!./ServerFilterGrid";

import MultiFilteringGrid from "./MultiFilteringGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import MultiFilteringGridSource from "!raw-loader!./MultiFilteringGrid";

import MultiFilteringWithOrGrid from "./MultiFilteringWithOrGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import MultiFilteringWithOrGridSource from "!raw-loader!./MultiFilteringWithOrGrid";

import QuickFilteringGrid from "./QuickFilteringGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import QuickFilteringGridSource from "!raw-loader!./QuickFilteringGrid";

const Filtering = () => {
  return (
    <>
      <AppComponentHeader
        title="Filtering"
        description="Filtering helps to view a subset of the records based on a criteria."
        refUrl="https://mui.com/components/data-grid/filtering/"
      />

      <AppGridContainer>
        <Grid item xs={12}>
          <AppComponentCard
            title="BasicFilteringGrid"
            component={BasicFilteringGrid}
            source={BasicFilteringGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="FilterOperators"
            component={FilterOperators}
            source={FilterOperatorsSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="DisableFilteringGrid"
            component={DisableFilteringGrid}
            source={DisableFilteringGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="ExtendNumericOperator"
            component={ExtendNumericOperator}
            source={ExtendNumericOperatorSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="ColumnTypeFilteringGrid"
            component={ColumnTypeFilteringGrid}
            source={ColumnTypeFilteringGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="CustomRatingOperator"
            component={CustomRatingOperator}
            source={CustomRatingOperatorSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="ServerFilterGrid"
            component={ServerFilterGrid}
            source={ServerFilterGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="MultiFilteringGrid"
            component={MultiFilteringGrid}
            source={MultiFilteringGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="MultiFilteringWithOrGrid"
            component={MultiFilteringWithOrGrid}
            source={MultiFilteringWithOrGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="QuickFilteringGrid"
            component={QuickFilteringGrid}
            source={QuickFilteringGridSource}
            noScrollbar
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Filtering;
