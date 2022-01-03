import React from "react";
import { GoogleMap, TrafficLayer, withGoogleMap } from "react-google-maps";
import "../../../../shared/vendors/maps.css";

const TrafficLayerExampleGoogleMap = withGoogleMap(() => (
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 47.646935, lng: -122.303763 }}
  >
    <TrafficLayer />
  </GoogleMap>
));

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
const TrafficLayerEx = () => {
  return (
    <TrafficLayerExampleGoogleMap
      containerElement={
        <div className="cr-embed-responsive cr-embed-responsive-21by9" />
      }
      mapElement={<div className="cr-embed-responsive-item" />}
    />
  );
};

export default TrafficLayerEx;
