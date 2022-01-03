import React from "react";
import {
  BlockPicker,
  ChromePicker,
  CirclePicker,
  CompactPicker,
  GithubPicker,
  TwitterPicker,
} from "react-color";

import Basic from "./Basic";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicSource from "!raw-loader!./Basic";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import WithRedux from "./WithRedux";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import WithReduxSource from "!raw-loader!./WithRedux";
import AppComponentCard from "@crema/core/AppComponentCard";
import AppComponentHeader from "@crema/core/AppComponentHeader";
import AppGridContainer from "@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";

const ColorPicker = () => {
  return (
    <>
      <AppComponentHeader
        title="React Color"
        description="13 Different Pickers - Sketch, Photoshop, Chrome and many more, Use the building block components to make your own "
        refUrl="http://casesandberg.github.io/react-color/"
      />

      <AppGridContainer>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Circle Picker" component={CirclePicker} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Compact Picker" component={CompactPicker} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Block Picker" component={BlockPicker} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Chrome Picker" component={ChromePicker} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Github Picker" component={GithubPicker} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard title="Twitter Picker" component={TwitterPicker} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppComponentCard
            title="WithRedux Picker"
            component={WithRedux}
            source={WithReduxSource}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AppGridContainer>
            <Grid item xs={12}>
              <AppComponentCard
                title="Basic Picker"
                component={Basic}
                source={BasicSource}
              />
            </Grid>
          </AppGridContainer>
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default ColorPicker;
