import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import BasicPagination from "./BasicPagination";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicPaginationSource from "!raw-loader!./BasicPagination";

import PaginationOutlined from "./PaginationOutlined";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import PaginationOutlinedSource from "!raw-loader!./PaginationOutlined";

import PaginationRounded from "./PaginationRounded";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import PaginationRoundedSource from "!raw-loader!./PaginationRounded";

import PaginationSize from "./PaginationSize";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import PaginationSizeSource from "!raw-loader!./PaginationSize";

import PaginationButtons from "./PaginationButtons";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import PaginationButtonsSource from "!raw-loader!./PaginationButtons";

import CustomIcons from "./CustomIcons";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomIconsSource from "!raw-loader!./CustomIcons";

import PaginationRanges from "./PaginationRanges";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import PaginationRangesSource from "!raw-loader!./PaginationRanges";

import PaginationControlled from "./PaginationControlled";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import PaginationControlledSource from "!raw-loader!./PaginationControlled";

import PaginationLink from "./PaginationLink";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import PaginationLinkSource from "!raw-loader!./PaginationLink";

import UsePagination from "./UsePagination";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import UsePaginationSource from "!raw-loader!./UsePagination";

import TablePaginationDemo from "./TablePaginationDemo";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import TablePaginationDemoSource from "!raw-loader!./TablePaginationDemo";

const Pagination = () => {
  return (
    <>
      <AppComponentHeader
        title="Pagination"
        description="The Pagination component enables the user to select a specific page from a range of pages."
        refUrl="https://mui.com/components/pagination/"
      />

      <AppGridContainer>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Basic pagination"
            component={BasicPagination}
            source={BasicPaginationSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="PaginationOutlined"
            component={PaginationOutlined}
            source={PaginationOutlinedSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Pagination Rounded"
            component={PaginationRounded}
            source={PaginationRoundedSource}
            noScrollbar
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Pagination Buttons"
            component={PaginationButtons}
            source={PaginationButtonsSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Custom Icons"
            component={CustomIcons}
            source={CustomIconsSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Pagination Link"
            component={PaginationLink}
            source={PaginationLinkSource}
            noScrollbar
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Pagination Controlled"
            component={PaginationControlled}
            source={PaginationControlledSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="TablePaginationDemo"
            component={TablePaginationDemo}
            source={TablePaginationDemoSource}
            noScrollbar
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Pagination Size"
            component={PaginationSize}
            source={PaginationSizeSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Pagination Ranges"
            component={PaginationRanges}
            source={PaginationRangesSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="UsePagination"
            component={UsePagination}
            source={UsePaginationSource}
            noScrollbar
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Pagination;
