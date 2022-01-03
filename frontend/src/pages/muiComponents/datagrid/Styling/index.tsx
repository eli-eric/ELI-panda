import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import StylingHeaderGrid from "./StylingHeaderGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import StylingHeaderGridSource from "!raw-loader!./StylingHeaderGrid";

import StylingRowsGrid from "./StylingRowsGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import StylingRowsGridSource from "!raw-loader!./StylingRowsGrid";

import StylingCellsGrid from "./StylingCellsGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import StylingCellsGridSource from "!raw-loader!./StylingCellsGrid";

import StylingAllCells from "./StylingAllCells";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import StylingAllCellsSource from "!raw-loader!./StylingAllCells";

import AntDesignGrid from "./AntDesignGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import AntDesignGridSource from "!raw-loader!./AntDesignGrid";
import SxProp from "./SxProp";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import SxPropSource from "!raw-loader!./SxProp";

const Styling = () => {
  return (
    <>
      <AppComponentHeader
        title="Styling"
        description="Easily export the rows in various file formats such as CSV, Excel, or PDF."
        refUrl="https://mui.com/components/data-grid/style/"
      />

      <AppGridContainer>
        <Grid item xs={12}>
          <AppComponentCard
            title="StylingHeaderGrid"
            component={StylingHeaderGrid}
            source={StylingHeaderGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="StylingRowsGrid"
            component={StylingRowsGrid}
            source={StylingRowsGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="StylingCellsGrid"
            component={StylingCellsGrid}
            source={StylingCellsGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="StylingAllCells"
            component={StylingAllCells}
            source={StylingAllCellsSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="AntDesignGrid"
            component={AntDesignGrid}
            source={AntDesignGridSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Using the Sx Prop"
            component={SxProp}
            source={SxPropSource}
            noScrollbar
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Styling;
