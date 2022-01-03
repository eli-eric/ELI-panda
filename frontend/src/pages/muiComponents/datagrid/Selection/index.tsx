import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import SingleRowSelectionGrid from "./SingleRowSelectionGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import SingleRowSelectionGridSource from "!raw-loader!./SingleRowSelectionGrid";

import MultipleRowSelectionGrid from "./MultipleRowSelectionGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import MultipleRowSelectionGridSource from "!raw-loader!./MultipleRowSelectionGrid";

import CheckboxSelectionGrid from "./CheckboxSelectionGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CheckboxSelectionGridSource from "!raw-loader!./CheckboxSelectionGrid";

import DisableClickSelectionGrid from "./DisableClickSelectionGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import DisableClickSelectionGridSource from "!raw-loader!./DisableClickSelectionGrid";

import DisableRowSelection from "./DisableRowSelection";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import DisableRowSelectionSource from "!raw-loader!./DisableRowSelection";

import ControlledSelectionGrid from "./ControlledSelectionGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ControlledSelectionGridSource from "!raw-loader!./ControlledSelectionGrid";

import ControlledSelectionServerPaginationGrid from "./ControlledSelectionServerPaginationGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ControlledSelectionServerPaginationGridSource from "!raw-loader!./ControlledSelectionServerPaginationGrid";

const Selection = () => {
  return (
    <>
      <AppComponentHeader
        title="Selection"
        description="Selection allows the user to select and highlight a number of rows that they can then take action on."
        refUrl="https://mui.com/components/data-grid/selection/"
      />

      <AppGridContainer>
        <Grid item xs={12}>
          <AppComponentCard
            title="SingleRowSelectionGrid"
            component={SingleRowSelectionGrid}
            source={SingleRowSelectionGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="MultipleRowSelectionGrid"
            component={MultipleRowSelectionGrid}
            source={MultipleRowSelectionGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="CheckboxSelectionGrid"
            component={CheckboxSelectionGrid}
            source={CheckboxSelectionGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="DisableClickSelectionGrid"
            component={DisableClickSelectionGrid}
            source={DisableClickSelectionGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="DisableRowSelection"
            component={DisableRowSelection}
            source={DisableRowSelectionSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="ControlledSelectionGrid"
            component={ControlledSelectionGrid}
            source={ControlledSelectionGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="ControlledSelectionServerPaginationGrid"
            component={ControlledSelectionServerPaginationGrid}
            source={ControlledSelectionServerPaginationGridSource}
            noScrollbar
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Selection;
