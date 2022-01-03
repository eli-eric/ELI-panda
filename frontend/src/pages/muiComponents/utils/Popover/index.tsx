import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import BasicPopover from "./BasicPopover";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicPopoverSource from "!raw-loader!./BasicPopover";

import MouseOverPopover from "./MouseOverPopover";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import MouseOverPopoverSource from "!raw-loader!./MouseOverPopover";

const Popover = () => {
  return (
    <>
      <AppComponentHeader
        title="Popover"
        description="A Popover can be used to display some content on top of another."
        refUrl="https://mui.com/components/popover/"
      />

      <AppGridContainer>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="BasicPopover"
            component={BasicPopover}
            source={BasicPopoverSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Mouse Over Popover"
            component={MouseOverPopover}
            source={MouseOverPopoverSource}
            noScrollbar
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Popover;
