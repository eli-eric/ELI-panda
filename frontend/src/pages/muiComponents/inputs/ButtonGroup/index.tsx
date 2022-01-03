import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";
import BasicButtonGroup from "./BasicButtonGroup";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicButtonGroupSource from "!raw-loader!./BasicButtonGroup";
import VariantButtonGroup from "./VariantButtonGroup";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import VariantButtonGroupSource from "!raw-loader!./VariantButtonGroup";
import GroupSizesColors from "./GroupSizesColors";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import GroupSizesColorsSource from "!raw-loader!./GroupSizesColors";
import GroupOrientation from "./VerticalGroup";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import GroupOrientationSource from "!raw-loader!./VerticalGroup";
import SplitButton from "./SplitButton";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import SplitButtonSource from "!raw-loader!./SplitButton";
import DisableElevation from "./DisableElevation";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import DisableElevationSource from "!raw-loader!./DisableElevation";

const ButtonGroup = () => {
  return (
    <>
      <AppComponentHeader
        title="Button Group"
        description="The ButtonGroup component can be used to group related buttons."
        refUrl="https://mui.com/components/button-group/"
      />

      <AppGridContainer>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Basic button group"
            component={BasicButtonGroup}
            source={BasicButtonGroupSource}
            noScrollbar
            description="The buttons can be grouped by wrapping them with the ButtonGroup component. They need to be immediate children."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Variant Button Group"
            component={VariantButtonGroup}
            source={VariantButtonGroupSource}
            noScrollbar
            description="All the standard button variants are supported."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Group Sizes Colors"
            component={GroupSizesColors}
            source={GroupSizesColorsSource}
            noScrollbar
            description="The size and color props can be used to control the appearance of the button group."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Vertical group"
            component={GroupOrientation}
            source={GroupOrientationSource}
            noScrollbar
            description="The button group can be displayed vertically using the orientation prop."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Split Button"
            component={SplitButton}
            source={SplitButtonSource}
            noScrollbar
            description="ButtonGroup can also be used to create a split button. The dropdown can change the button action (as in this example) or be used to immediately trigger a related action."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Disable Elevation"
            component={DisableElevation}
            source={DisableElevationSource}
            noScrollbar
            description="You can remove the elevation with the disableElevation prop."
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default ButtonGroup;
