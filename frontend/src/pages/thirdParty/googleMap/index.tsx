import React from "react";
import AppComponentHeader from "@crema/core/AppComponentHeader";
import AppGridContainer from "@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppComponentCard from "../../../@crema/core/AppComponentCard";

import MapDirections from "./Directions";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapDirectionsSource from "!raw-loader!./Directions";
import DrawingView from "./DrawingView";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import DrawingViewSource from "!raw-loader!./DrawingView";
import MapKmLayer from "./KmLayer";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import KmLayerSource from "!raw-loader!./KmLayer";
import MapClustering from "./MapClustering";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapClusteringSource from "!raw-loader!./MapClustering";
import PopUpInfo from "./PopUpInfo";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import PopUpInfoSource from "!raw-loader!./PopUpInfo";
import StreetViewMap from "./StreetView";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import StreetViewMapSource from "!raw-loader!./StreetView";
import TrafficLayer from "./TrafficLayer";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import TrafficLayerSource from "!raw-loader!./TrafficLayer";
import Styled from "./Styled";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import StyledSource from "!raw-loader!./Styled";

const GoogleMap = () => {
  return (
    <>
      <AppComponentHeader
        title="Google Map"
        description="A wrapper around google.maps.Map"
        refUrl="https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map/"
      />

      <AppGridContainer>
        <Grid item xs={12}>
          <AppComponentCard
            title="Marker Clusterer Map"
            component={MapClustering}
            source={MapClusteringSource}
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="StreetView Map"
            component={StreetViewMap}
            source={StreetViewMapSource}
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Traffic Map"
            component={TrafficLayer}
            source={TrafficLayerSource}
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Styled Map"
            component={Styled}
            source={StyledSource}
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Directions Map"
            component={MapDirections}
            source={MapDirectionsSource}
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Drawing View Map"
            component={DrawingView}
            source={DrawingViewSource}
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="KmlLayer Map"
            component={MapKmLayer}
            source={KmLayerSource}
          />
        </Grid>
        <Grid item xs={12}>
          <AppComponentCard
            title="Google Map InfoWindow"
            component={PopUpInfo}
            source={PopUpInfoSource}
          />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default GoogleMap;
