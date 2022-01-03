import React from "react";
import { GoogleMap, KmlLayer, withGoogleMap } from "react-google-maps";
import "../../../../shared/vendors/maps.css";

const KmlLayerExampleGoogleMap = withGoogleMap(() => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: 41.876, lng: -87.624 }}>
    <KmlLayer
      url="http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml"
      options={{ preserveViewport: true }}
    />
  </GoogleMap>
));

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
const MapKmLayer = () => {
  return (
    <KmlLayerExampleGoogleMap
      containerElement={
        <div className="cr-embed-responsive cr-embed-responsive-21by9" />
      }
      mapElement={<div className="cr-embed-responsive-item" />}
    />
  );

}

export default MapKmLayer;