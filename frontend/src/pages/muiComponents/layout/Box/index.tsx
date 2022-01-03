import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";

import BoxSx from "./BoxSx";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import BoxSxSource from "!raw-loader!./BoxSx";

import BoxComponent from "./BoxComponent";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import BoxComponentSource from "!raw-loader!./BoxComponent";

const Box = () => {
  return (
    <>
      <AppComponentHeader
        title="Box"
        description="The Box component serves as a wrapper component for most of the CSS utility needs."
        refUrl="https://mui.com/components/box/"
      />

      <AppGridContainer>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="The sx prop"
            component={BoxSx}
            source={BoxSxSource}
            noScrollbar
            description="All system properties are available via the sx prop. In addition, the sx prop allows you to specify any other CSS rules you may need. Heres an example of how you can use it:"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="BoxComponent"
            component={BoxComponent}
            source={BoxComponentSource}
            noScrollbar
            description="All system properties are available via the sx prop. In addition, the sx prop allows you to specify any other CSS rules you may need. Heres an example of how you can use it:"
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Box;
