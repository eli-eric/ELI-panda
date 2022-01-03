import React from "react";
import { GoogleMap, withGoogleMap } from "react-google-maps";
import "../../../../shared/vendors/maps.css";

import InfoBox from "react-google-maps/lib/components/addons/InfoBox";

import fancyMapStyles from "./fancyMapStyles.json";

const google = (window as any).google;

interface StyledMapExampleGoogleMapProps {
  center: { lat: number, lng: number };
  onClickFromChildrenOfInfoBox: (e: any) => void;
}

const StyledMapExampleGoogleMap = withGoogleMap((props: StyledMapExampleGoogleMapProps) => (
  <GoogleMap
    defaultZoom={11}
    defaultCenter={props.center}
    defaultOptions={{ styles: fancyMapStyles }}>
    <InfoBox
      defaultPosition={props.center}
      options={{ closeBoxURL: ``, enableEventPropagation: true }}>
      <div
        style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `20px` }}
        onClick={props.onClickFromChildrenOfInfoBox}>
        <div style={{ fontSize: `16px`, color: `#08233B` }}>Taipei</div>
      </div>
    </InfoBox>
  </GoogleMap>
));

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
const StyledMap = () => {

  function handleClickFromChildrenOfInfoBox(e) {
    console.log(e);
  }
  
  return (
    <StyledMapExampleGoogleMap
      containerElement={
        <div className="cr-embed-responsive cr-embed-responsive-21by9" />
      }
      mapElement={<div className="cr-embed-responsive-item" />}
      center={new google.maps.LatLng(44.8799929, 21.3190073)}
      onClickFromChildrenOfInfoBox={handleClickFromChildrenOfInfoBox}
    />
  );
}
export default StyledMap;
