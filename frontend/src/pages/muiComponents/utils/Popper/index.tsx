import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import SimplePopper from "./SimplePopper";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import SimplePopperSource from "!raw-loader!./SimplePopper";

import TransitionsPopper from "./TransitionsPopper";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import TransitionsPopperSource from "!raw-loader!./TransitionsPopper";

import PositionedPopper from "./PositionedPopper";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import PositionedPopperSource from "!raw-loader!./PositionedPopper";

import VirtualElementPopper from "./VirtualElementPopper";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import VirtualElementPopperSource from "!raw-loader!./VirtualElementPopper";
import PopperPopupState from './PopperPopupState';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import PopperPopupStateSource from "!raw-loader!./PopperPopupState";

const Popper = () => {
  return (
    <>
      <AppComponentHeader
        title="Popper"
        description="A Popper can be used to display some content on top of another. Its an alternative to react-popper."
        refUrl="https://mui.com/components/popper/"
      />

      <AppGridContainer>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Simple Popper"
            component={SimplePopper}
            source={SimplePopperSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Transitions Popper"
            component={TransitionsPopper}
            source={TransitionsPopperSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="PositionedPopper"
            component={PositionedPopper}
            source={PositionedPopperSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="VirtualElementPopper"
            component={VirtualElementPopper}
            source={VirtualElementPopperSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="PopperPopupState"
            component={PopperPopupState}
            source={PopperPopupStateSource}
            noScrollbar
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Popper;
