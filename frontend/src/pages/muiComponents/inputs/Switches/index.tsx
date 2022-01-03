import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import BasicSwitches from "./BasicSwitches";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicSwitchesSource from "!raw-loader!./BasicSwitches";
import SwitchLabels from "./Label";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import SwitchLabelsSource from "!raw-loader!./Label";
import SwitchesSize from "./Size";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import SwitchesSizeSource from "!raw-loader!./Size";
import ColorSwitches from "./Color";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ColorSwitchesSource from "!raw-loader!./Color";
import ControlledSwitches from "./Controlled";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ControlledSwitchesSource from "!raw-loader!./Controlled";
import SwitchesGroup from "./SwitchesFormGroup";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import SwitchesGroupSource from "!raw-loader!./SwitchesFormGroup";
import CustomizedSwitches from "./Customization";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedSwitchesSource from "!raw-loader!./Customization";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import UnstyledSwitchesSource from "!raw-loader!./Unstyled";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import UseSwitchesBasic from "./UseSwitchesBasic";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import UseSwitchesBasicSource from "!raw-loader!./UseSwitchesBasic";
import UseSwitchesCustom from "./UseSwitchesCustom";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import UseSwitchesCustomSource from "!raw-loader!./UseSwitchesCustom";

const Switches = () => {
  return (
    <>
      <AppComponentHeader
        title="Switch"
        description="Switches toggle the state of a single setting on or off."
        refUrl="https://mui.com/components/switches/"
      />

      <AppGridContainer>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Basic Switches"
            component={BasicSwitches}
            source={BasicSwitchesSource}
            noScrollbar
            description="Switches are the preferred way to adjust settings on mobile."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Size"
            component={SwitchesSize}
            source={SwitchesSizeSource}
            noScrollbar
            description="Use the size prop to change the size of the switch."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Controlled"
            component={ControlledSwitches}
            source={ControlledSwitchesSource}
            noScrollbar
            description="You can control the switch with the checked and onChange props:"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Label"
            component={SwitchLabels}
            source={SwitchLabelsSource}
            noScrollbar
            description="You can provide a label to the Switch thanks to the FormControlLabel component."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Switches with FormGroup"
            component={SwitchesGroup}
            source={SwitchesGroupSource}
            noScrollbar
            description="FormGroup is a helpful wrapper used to group selection controls components that provides an easier API. "
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Customization"
            component={CustomizedSwitches}
            source={CustomizedSwitchesSource}
            noScrollbar
            description="Here are some examples of customizing the component. You can learn more about this in the overrides documentation page."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Unstyled"
            component={UseSwitchesBasic}
            source={UnstyledSwitchesSource}
            noScrollbar
            description="The switch also comes with an unstyled version. It ideal for doing heavy customizations and minimizing bundle size."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Color"
            component={ColorSwitches}
            source={ColorSwitchesSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Use Switches Basic"
            component={UseSwitchesBasic}
            source={UseSwitchesBasicSource}
            noScrollbar
            description=""
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Use Switches Custom"
            component={UseSwitchesCustom}
            source={UseSwitchesCustomSource}
            noScrollbar
            description=""
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Switches;
