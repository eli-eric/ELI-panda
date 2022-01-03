import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import CustomLocaleTextGrid from "./CustomLocaleTextGrid";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomLocaleTextGridSource from "!raw-loader!./CustomLocaleTextGrid";

const Localization = () => {
  return (
    <>
      <AppComponentHeader
        title="Localization"
        description="The Data Grid allows to support users from different locales, with formatting, RTL, and localized strings."
        refUrl="https://mui.com/components/data-grid/localization/"
      />

      <AppGridContainer>
        <Grid item xs={12}>
          <AppComponentCard
            title="Custom Locale Text Grid"
            component={CustomLocaleTextGrid}
            source={CustomLocaleTextGridSource}
            noScrollbar
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Localization;
