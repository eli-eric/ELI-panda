import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";
import BasicCheckboxes from "./BasicCheckboxes";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicCheckboxesSource from "!raw-loader!./BasicCheckboxes";
import CheckboxLabels from "./CheckboxLabels";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CheckboxLabelsSource from "!raw-loader!./CheckboxLabels";
import SizeCheckboxes from "./SizeCheckboxes";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import SizeCheckboxesSource from "!raw-loader!./SizeCheckboxes";
import ColorCheckboxes from "./ColorCheckboxes";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ColorCheckboxesSource from "!raw-loader!./ColorCheckboxes";
import IconCheckboxes from "./IconCheckboxes";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import IconCheckboxesSource from "!raw-loader!./IconCheckboxes";
import ControlledCheckbox from "./Controlled";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import ControlledCheckboxSource from "!raw-loader!./Controlled";
import IndeterminateCheckbox from "./Indeterminate";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import IndeterminateCheckboxSource from "!raw-loader!./Indeterminate";
import CheckboxesGroup from "./FormGroup";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CheckboxesGroupSource from "!raw-loader!./FormGroup";
import FormControlLabelPosition from "./LabelPlacement";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import FormControlLabelPositionSource from "!raw-loader!./LabelPlacement";
import CustomizedCheckbox from "./Customization";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedCheckboxSource from "!raw-loader!./Customization";

const Checkboxes = () => {
  return (
    <>
      <AppComponentHeader
        title="Checkbox"
        description="Checkboxes allow the user to select one or more items from a set."
        refUrl="https://mui.com/components/checkboxes/"
      />

      <AppGridContainer>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Basic checkboxes"
            component={BasicCheckboxes}
            source={BasicCheckboxesSource}
            noScrollbar
            description="Checkboxes can be used to turn an option on or off."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Checkbox Labels"
            component={CheckboxLabels}
            source={CheckboxLabelsSource}
            noScrollbar
            description="You can provide a label to the Checkbox thanks to the FormControlLabel component."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Size Checkboxes"
            component={SizeCheckboxes}
            source={SizeCheckboxesSource}
            noScrollbar
            description="Use the size prop or customize the font size of the svg icons to change the size of the checkboxes."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Color Checkboxes"
            component={ColorCheckboxes}
            source={ColorCheckboxesSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Icon Checkboxes"
            component={IconCheckboxes}
            source={IconCheckboxesSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Controlled Checkbox"
            component={ControlledCheckbox}
            source={ControlledCheckboxSource}
            noScrollbar
            description="You can control the checkbox with the checked and onChange props:"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Indeterminate Checkbox"
            component={IndeterminateCheckbox}
            source={IndeterminateCheckboxSource}
            noScrollbar
            description="A checkbox input can only have two states in a form: checked or unchecked. It either submits its value or does not. Visually, there are three states a checkbox can be in: checked, unchecked, or indeterminate."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Checkboxes Group"
            component={CheckboxesGroup}
            source={CheckboxesGroupSource}
            noScrollbar
            description="FormGroup is a helpful wrapper used to group selection control components."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="FormControl Label Position"
            component={FormControlLabelPosition}
            source={FormControlLabelPositionSource}
            noScrollbar
            description="You can change the placement of the label."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Customized Checkbox"
            component={CustomizedCheckbox}
            source={CustomizedCheckboxSource}
            noScrollbar
            description="Here is an example of customizing the component. You can learn more about this in the overrides documentation page."
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Checkboxes;
