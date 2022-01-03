import React from 'react';
import AppComponentHeader from '../../../../@crema/core/AppComponentHeader';
import AppGridContainer from '../../../../@crema/core/AppGridContainer';
import Grid from '@mui/material/Grid';
import AppComponentCard from '../../../../@crema/core/AppComponentCard';

import ButtonAppBar from './ButtonAppBar';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ButtonAppBarSource from '!raw-loader!./ButtonAppBar';

import MenuAppBar from './MenuAppBar';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import MenuAppBarSource from '!raw-loader!./MenuAppBar';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax

import SearchAppBar from './SearchAppBar';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import SearchAppBarSource from '!raw-loader!./SearchAppBar';

import PrimarySearchAppBar from './PrimarySearchAppBar';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import PrimarySearchAppBarSource from '!raw-loader!./PrimarySearchAppBar';

import DenseAppBar from './DenseAppBar';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import DenseAppBarSource from '!raw-loader!./DenseAppBar';

import ProminentAppBar from './ProminentAppBar';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ProminentAppBarSource from '!raw-loader!./ProminentAppBar';

import BottomAppBar from './BottomAppBar';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import BottomAppBarSource from '!raw-loader!./BottomAppBar';

import HideAppBar from './HideAppBar';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import HideAppBarSource from '!raw-loader!./HideAppBar';

import ElevateAppBar from './ElevateAppBar';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ElevateAppBarSource from '!raw-loader!./ElevateAppBar';

import BackToTop from './BackToTop';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import BackToTopSource from '!raw-loader!./BackToTop';

import EnableColorOnDarkAppBar from './EnableColorOnDarkAppBar';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import EnableColorOnDarkAppBarSource from '!raw-loader!./EnableColorOnDarkAppBar';

const AppBar = () => {
  return (
    <>
      <AppComponentHeader
        title="AppBar"
        description="The App Bar displays information and actions relating to the current screen."
        refUrl="https://mui.com/components/app-bar/"
      />

      <AppGridContainer>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Basic App Bar"
            component={ButtonAppBar}
            source={ButtonAppBarSource}
            noScrollbar
          />
        </Grid>


        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Search App Bar"
            component={SearchAppBar}
            source={SearchAppBarSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Primary Search App Bar"
            component={PrimarySearchAppBar}
            source={PrimarySearchAppBarSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Menu App Bar"
            component={MenuAppBar}
            source={MenuAppBarSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Dense App Bar"
            component={DenseAppBar}
            source={DenseAppBarSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Prominent App Bar"
            component={ProminentAppBar}
            source={ProminentAppBarSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Enable Color On Dark App Bar "
            component={EnableColorOnDarkAppBar}
            source={EnableColorOnDarkAppBarSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Bottom App Bar"
            component={BottomAppBar}
            source={BottomAppBarSource}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Hide App Bar "
            component={HideAppBar}
            source={HideAppBarSource}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Elevate App Bar "
            component={ElevateAppBar}
            source={ElevateAppBarSource}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Back To Top "
            component={BackToTop}
            source={BackToTopSource}
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default AppBar;
