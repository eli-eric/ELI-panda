import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import BasicTable from "./BasicTable";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicTableSource from "!raw-loader!./BasicTable";

import DataTable from "./DataTable";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import DataTableSource from "!raw-loader!./DataTable";

import DenseTable from "./DenseTable";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import DenseTableSource from "!raw-loader!./DenseTable";

import EnhancedTable from "./EnhancedTable";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import EnhancedTableSource from "!raw-loader!./EnhancedTable";

import ColumnGrouping from "./ColumnGrouping";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ColumnGroupingSource from "!raw-loader!./ColumnGrouping";

import CustomPaginationActionsTable from "./Custompaginationactions";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomPaginationActionsTableSource from "!raw-loader!./Custompaginationactions";

import StickyHeadTable from "./StickyHeadTable";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import StickyHeadTableSource from "!raw-loader!./StickyHeadTable";

import ColumnGroupingTable from "./ColumnGroupingTable";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ColumnGroupingTableSource from "!raw-loader!./ColumnGroupingTable";

import CollapsibleTable from "./CollapsibleTable";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CollapsibleTableSource from "!raw-loader!./CollapsibleTable";

import SpanningTable from "./SpanningTable";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import SpanningTableSource from "!raw-loader!./SpanningTable";

import AcccessibleTable from "./AcccessibleTable";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import AcccessibleTableSource from "!raw-loader!./AcccessibleTable";
import CustomizedTables from './CustomizedTables';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedTablesSource from "!raw-loader!./CustomizedTables";
import ReactVirtualizedTable from './ReactVirtualizedTable';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ReactVirtualizedTableSource from "!raw-loader!./ReactVirtualizedTable";

const Table = () => {
  return (
    <>
      <AppComponentHeader
        title="Table"
        description="Tables display sets of data. They can be fully customized."
        refUrl="https://mui.com/components/tables/"
      />

      <AppGridContainer>
        <Grid item xs={12}>
          <AppComponentCard
            title="Basic table"
            component={BasicTable}
            source={BasicTableSource}
            noScrollbar
            description="A simple example with no frills."
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Data Table"
            component={DataTable}
            source={DataTableSource}
            noScrollbar
            description="A simple example with no frills."
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Dense Table"
            component={DenseTable}
            source={DenseTableSource}
            noScrollbar
            description="A simple example with no frills."
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Enhanced Table"
            component={EnhancedTable}
            source={EnhancedTableSource}
            noScrollbar
            description="A simple example with no frills."
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Column Grouping"
            component={ColumnGrouping}
            source={ColumnGroupingSource}
            noScrollbar
            description="A simple example with no frills."
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Custom Pagination Actions Table"
            component={CustomPaginationActionsTable}
            source={CustomPaginationActionsTableSource}
            noScrollbar
            description="A simple example with no frills."
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Sticky Head Table"
            component={StickyHeadTable}
            source={StickyHeadTableSource}
            noScrollbar
            description="A simple example with no frills."
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Column Grouping Table"
            component={ColumnGroupingTable}
            source={ColumnGroupingTableSource}
            noScrollbar
            description="A simple example with no frills."
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="CollapsibleTable"
            component={CollapsibleTable}
            source={CollapsibleTableSource}
            noScrollbar
            description="A simple example with no frills."
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Spanning Table"
            component={SpanningTable}
            source={SpanningTableSource}
            noScrollbar
            description="A simple example with no frills."
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Acccessible Table"
            component={AcccessibleTable}
            source={AcccessibleTableSource}
            noScrollbar
            description="A simple example with no frills."
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="CustomizedTables"
            component={CustomizedTables}
            source={CustomizedTablesSource}
            noScrollbar
            description="A simple example with no frills."
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Virtualized Table"
            component={ReactVirtualizedTable}
            source={ReactVirtualizedTableSource}
            noScrollbar
            description="A simple example with no frills."
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Table;
