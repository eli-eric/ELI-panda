import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import FloatingActionButtons from "./BasicFab";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import FloatingActionButtonsSource from "!raw-loader!./BasicFab";
import FloatingActionButtonSize from "./Size";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import FloatingActionButtonSizeSource from "!raw-loader!./Size";
import FloatingActionButtonZoom from "./Animation";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import FloatingActionButtonZoomSource from "!raw-loader!./Animation";

const FloatingActionButton = () => {
  return (
    <>
      <AppComponentHeader
        title="Floating action button"
        description="A floating action button (FAB) performs the primary, or most common, action on a screen."
        refUrl="https://mui.com/components/floating-action-button/"
      />

      <AppGridContainer>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Basic FAB"
            component={FloatingActionButtons}
            source={FloatingActionButtonsSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Size"
            component={FloatingActionButtonSize}
            source={FloatingActionButtonSizeSource}
            noScrollbar
            description="By default, the size is large. Use the size prop for smaller floating action buttons."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Animation"
            component={FloatingActionButtonZoom}
            source={FloatingActionButtonZoomSource}
            noScrollbar
            description="The floating action button animates onto the screen as an expanding piece of material, by default."
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default FloatingActionButton;
