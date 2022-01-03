import React from "react";
import { AppGridContainer } from "../../../@crema";
import { Grid } from "@mui/material";
import PackageOne from "./PackageOne";
import pricingData from "../../../@crema/services/db/extraPages/pricing";
import PackageFour from "./PackageFour";
import PackageThree from "./PackageThree";
import PackageTwo from "./PackageTwo";

const Pricing = () => {
  return (
    <AppGridContainer>
      <Grid item xs={12}>
        <PackageOne pricing={pricingData.pricingOne} />
      </Grid>
      <Grid item xs={12}>
        <PackageTwo pricing={pricingData.pricingTwo} />
      </Grid>
      <Grid item xs={12}>
        <PackageThree pricing={pricingData.pricingFour} />
      </Grid>
      <Grid item xs={12}>
        <PackageFour pricing={pricingData.pricingFour} />
      </Grid>
    </AppGridContainer>
  );
};

export default Pricing;
