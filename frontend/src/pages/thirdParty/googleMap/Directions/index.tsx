import React, { useEffect, useState } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  withGoogleMap,
} from "react-google-maps";
import "../../../../shared/vendors/maps.css";

const google = (window as any).google;

interface DirectionsExampleGoogleMapProps {
  center: { lat: number; lng: number };
  directions: any;
  containerElement: JSX.Element;
  mapElement: JSX.Element;
}

const DirectionsExampleGoogleMap = withGoogleMap(
  (props: DirectionsExampleGoogleMapProps) => (
    <GoogleMap defaultZoom={7} defaultCenter={props.center}>
      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
  )
);

const MapDirections = () => {
  const [origin] = useState(new google.maps.LatLng(41.85073, -87.65126));
  const [destination] = useState(new google.maps.LatLng(41.85258, -87.65141));
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, [destination]);

  return (
    <DirectionsExampleGoogleMap
      containerElement={
        <div className="cr-embed-responsive cr-embed-responsive-21by9" />
      }
      mapElement={<div className="cr-embed-responsive-item" />}
      center={origin}
      directions={directions}
    />
  );
};
export default MapDirections;
