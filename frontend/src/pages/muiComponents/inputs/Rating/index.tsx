import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";

import BasicRating from "./BasicRating";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import BasicRatingSource from "!raw-loader!./BasicRating";
import HalfRating from "./RatingPrecision";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import HalfRatingSource from "!raw-loader!./RatingPrecision";
import HoverRating from "./HoverFeedback";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import HoverRatingSource from "!raw-loader!./HoverFeedback";
import RatingSIze from "./Sizes";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import RatingSIzeSource from "!raw-loader!./Sizes";
import CustomizedRating from "./Customization";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomizedRatingSource from "!raw-loader!./Customization";
import RadioGroupRating from "./RadioGroupRating";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import RadioGroupRatingSource from "!raw-loader!./RadioGroupRating";
import TextRating from './TextRating';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import TextRatingSource from "!raw-loader!./TextRating";

const Rating = () => {
  return (
    <>
      <AppComponentHeader
        title="Rating"
        description="Ratings provide insight regarding others opinions and experiences, and can allow the user to submit a rating of their own."
        refUrl="https://mui.com/components/rating/"
      />

      <AppGridContainer>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Basic rating"
            component={BasicRating}
            source={BasicRatingSource}
            noScrollbar
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Customization"
            component={CustomizedRating}
            source={CustomizedRatingSource}
            noScrollbar
            description="Here are some examples of customizing the component. You can learn more about this in the overrides documentation page."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Rating precision"
            component={HalfRating}
            source={HalfRatingSource}
            noScrollbar
            description="The rating can display any float number with the value prop. Use the precision prop to define the minimum increment value change allowed."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Sizes"
            component={RatingSIze}
            source={RatingSIzeSource}
            noScrollbar
            description="For larger or smaller ratings use the size prop."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Hover feedback"
            component={HoverRating}
            source={HoverRatingSource}
            noScrollbar
            description="You can display a label on hover to help the user pick the correct rating value. The demo uses the onChangeActive prop."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Radio group"
            component={RadioGroupRating}
            source={RadioGroupRatingSource}
            noScrollbar
            description="The rating is implemented with a radio group, set highlightSelectedOnly to restore the natural behavior."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="TextRating"
            component={TextRating}
            source={TextRatingSource}
            noScrollbar
            description='The accessibility of this component relies on:'
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default Rating;
