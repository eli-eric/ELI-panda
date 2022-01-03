import React, { useEffect, useState } from "react";
import "../../../../shared/vendors/maps.css";

import { GoogleMap, Marker, withGoogleMap } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import jwtAxios from "../../../../@crema/services/auth/jwt-auth";

const MarkerClustererExampleGoogleMap = withGoogleMap((props: { markers: Array<any> }) => (
  <GoogleMap defaultZoom={3} defaultCenter={{ lat: 25.0391667, lng: 121.525 }}>
    <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
      {props.markers.map((marker) => (
        <Marker
          position={{ lat: marker.latitude, lng: marker.longitude }}
          key={marker.photo_id}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

const MarkerClustererExample = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    jwtAxios
      .get(
        `https://gist.githubusercontent.com/farrrr/dfda7dd7fccfec5474d3/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
      )
      .then(({ data }) => {
        setMarkers(data.photos);
      });
  }, [])

  return (
    <MarkerClustererExampleGoogleMap
      containerElement={
        <div className="cr-embed-responsive cr-embed-responsive-21by9" />
      }
      mapElement={<div className="cr-embed-responsive-item" />}
      markers={markers}
    />
  );
}

export default MarkerClustererExample;