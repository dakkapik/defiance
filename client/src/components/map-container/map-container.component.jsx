import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 26.27260777215995,
  lng: -80.27339459701001,
};

const MapContainer = (props) => {
  // const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState(15);
  const [center, setCenter] = useState({
    lat: 26.27260777215995,
    lng: -80.27339459701001,
  });
  const [driverMarkers, setDriverMarkers] = useState([]);

  useEffect(() => {
    if (props.store.location) {
      setCenter(props.store.location);
      setZoom(14);
    } else {
      setCenter(defaultCenter);
      setZoom(12);
    }
  }, [props.store]);

  useEffect(() => {
    const markers = [];
    props.drivers.forEach((driver, i) => {
      if (driver.position) {
        markers.push(
          <Marker
            key={driver.employeeId}
            label={driver.firstName}
            position={{
              lat: driver.position.coords.latitude,
              lng: driver.position.coords.longitude,
            }}
            // onPositionChanged={() => {
            //   console.log("position changed");
            // }}
          />
        );
      }
    });
    setDriverMarkers(markers);
  }, [props.drivers]);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_google_map_api}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
        {driverMarkers ? driverMarkers : null}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
