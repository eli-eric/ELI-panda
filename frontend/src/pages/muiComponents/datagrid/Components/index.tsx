import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import CustomColumnMenu from "./CustomColumnMenu";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomColumnMenuSource from "!raw-loader!./CustomColumnMenu";

import ToolbarGrid from "./ToolbarGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ToolbarGridSource from "!raw-loader!./ToolbarGrid";

import CustomToolbarGrid from "./CustomToolbarGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomToolbarGridSource from "!raw-loader!./CustomToolbarGrid";

import CustomFooter from "./CustomFooter";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomFooterSource from "!raw-loader!./CustomFooter";

import CustomPaginationGrid from "./CustomPaginationGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomPaginationGridSource from "!raw-loader!./CustomPaginationGrid";

import CustomLoadingOverlayGrid from "./CustomLoadingOverlayGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomLoadingOverlayGridSource from "!raw-loader!./CustomLoadingOverlayGrid";

import CustomEmptyOverlayGrid from "./CustomEmptyOverlayGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomEmptyOverlayGridSource from "!raw-loader!./CustomEmptyOverlayGrid";

import RowContextMenu from "./RowContextMenu";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import RowContextMenuSource from "!raw-loader!./RowContextMenu";

import CellWithPopover from "./CellWithPopover";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CellWithPopoverSource from "!raw-loader!./CellWithPopover";

import CustomSortIcons from "./CustomSortIcons";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomSortIconsSource from "!raw-loader!./CustomSortIcons";

const Components = () => {
  return (
    <>
      <AppComponentHeader
        title="Components"
        description="Easily export the rows in various file formats such as CSV, Excel, or PDF."
        refUrl="https://mui.com/components/data-grid/components/"
      />

      <AppGridContainer>
        <Grid item xs={12}>
          <AppComponentCard
            title="Custom Column Menu"
            component={CustomColumnMenu}
            source={CustomColumnMenuSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Toolbar Grid"
            component={ToolbarGrid}
            source={ToolbarGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Custom Toolbar Grid"
            component={CustomToolbarGrid}
            source={CustomToolbarGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Custom Footer"
            component={CustomFooter}
            source={CustomFooterSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Custom Pagination Grid"
            component={CustomPaginationGrid}
            source={CustomPaginationGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Custom Loading Over layGrid"
            component={CustomLoadingOverlayGrid}
            source={CustomLoadingOverlayGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Custom Empty Over layGrid"
            component={CustomEmptyOverlayGrid}
            source={CustomEmptyOverlayGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Row Context Menu"
            component={RowContextMenu}
            source={RowContextMenuSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Cell With Popover"
            component={CellWithPopover}
            source={CellWithPopoverSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Cell With Popover"
            component={CellWithPopover}
            source={CellWithPopoverSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Custom Sort Icons"
            component={CustomSortIcons}
            source={CustomSortIconsSource}
            noScrollbar
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Components;
