import React from "react";
import AppComponentHeader from "../../../../@crema/core/AppComponentHeader";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../../@crema/core/AppComponentCard";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";

import StandardImageList from "./StandardImageList";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import StandardImageListSource from "!raw-loader!./StandardImageList";

import QuiltedImageList from "./QuiltedImageList";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import QuiltedImageListSource from "!raw-loader!./QuiltedImageList";

import WovenImageList from "./WovenImageList";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import WovenImageListSource from "!raw-loader!./WovenImageList";

import MasonryImageList from "./MasonryImageList";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import MasonryImageListSource from "!raw-loader!./MasonryImageList";

import TitlebarImageList from "./TitlebarImageList";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import TitlebarImageListSource from "!raw-loader!./TitlebarImageList";

import TitlebarBelowImageList from "./TitlebarBelowImageList";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import TitlebarBelowImageListSource from "!raw-loader!./TitlebarBelowImageList";

import TitlebarBelowMasonryImageList from "./TitlebarBelowMasonryImageList";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import TitlebarBelowMasonryImageListSource from "!raw-loader!./TitlebarBelowMasonryImageList";

import CustomImageList from "./CustomImageList";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import CustomImageListSource from "!raw-loader!./CustomImageList";

const ImageList = () => {
  return (
    <>
      <AppComponentHeader
        title="ImageList"
        description="Image lists display a collection of images in an organized grid."
        refUrl="https://mui.com/components/image-list/"
      />

      <AppGridContainer>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="StandardImageList"
            component={StandardImageList}
            source={StandardImageListSource}
            description="Standard image lists are best for items of equal importance. They have a uniform container size, ratio, and spacing.

"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="QuiltedImageList"
            component={QuiltedImageList}
            source={QuiltedImageListSource}
            description="Quilted image lists emphasize certain items over others in a collection. They create hierarchy using varied container sizes and ratios."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Woven Image List"
            component={WovenImageList}
            source={WovenImageListSource}
            description="All system properties are available via the sx prop. In addition, the sx prop allows you to specify any other CSS rules you may need. Heres an example of how you can use it:"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Masonry Image List"
            component={MasonryImageList}
            source={MasonryImageListSource}
            description="Masonry image lists use dynamically sized container heights that reflect the aspect ratio of each image. This image list is best used for browsing uncropped peer content.

"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="TitlebarImageList"
            component={TitlebarImageList}
            source={TitlebarImageListSource}
            description="This example demonstrates the use of the ImageListItemBar to add an overlay to each item. The overlay can accommodate a title, subtitle and secondary action - in this example an IconButton."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Titlebar Below Image List"
            component={TitlebarBelowImageList}
            source={TitlebarBelowImageListSource}
            description="The title bar can be placed below the image. "
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="Titlebar Below Masonry Image List"
            component={TitlebarBelowMasonryImageList}
            source={TitlebarBelowMasonryImageListSource}
            description=""
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppComponentCard
            title="CustomImageList"
            component={CustomImageList}
            source={CustomImageListSource}
            description="In this example the items have a customized titlebar, positioned at the top and with a custom gradient titleBackground. The secondary action IconButton is positioned on the left. The gap prop is used to adjust the gap between items.

"
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default ImageList;
