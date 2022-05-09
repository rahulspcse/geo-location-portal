import React from "react";
import GoogleMapReact from "google-map-react";
import MyMarker from "./MyMarker";
import Typography from '@mui/material/Typography';

// implementation of this function is needed for codesandbox example to work
// you can remove it otherwise
const distanceToMouse = (pt, mp) => {
  if (pt && mp) {
    // return distance between the marker and mouse pointer
    return Math.sqrt(
      (pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y)
    );
  }
};


export default function GoogleMap(props) {
  return (
    <div style={{margin:'40px 80px', height: '60vh',
        width: '91.5%'}}>
            <Typography sx={{fontSize: 21, mb: 1, fontWeight: 'bold'}}>Google Map</Typography>
      
      <GoogleMapReact
        bootstrapURLKeys={{
          // remove the key if you want to fork
          key: "AIzaSyAQYmSiTmcx1bcOqFgmjBKP_el2cTIDkSI",
         
        }}
        defaultCenter={{ lat: 22.338655, lng: 91.811704 }}
        defaultZoom={15}
        distanceToMouse={distanceToMouse}
      >
        {
          props.centerLat & props.centerLng ?
          <MyMarker key={1} lat={props.centerLat} lng={ props.centerLng } text={'center'} tooltip={'center-address'} />
          :
          <></>
        }
    
        {
          props.location ?
          <MyMarker key={2} lat={props.location.lat} lng={props.location.lan} text={'Current location'} tooltip={'test-address'} />:
          <></>
        }
      </GoogleMapReact>
    </div>
  );
}
