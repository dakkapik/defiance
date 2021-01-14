import React from "react";
//Marker
//useEffect
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { connect } from "react-redux";
const containerStyle = {
  width: "100%",
  height: "100%",
};

const MapContainer = ({ store, ActiveMovingDriver }) => {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_google_map_api}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={store.location}
        zoom={15}
      >
        {ActiveMovingDriver.map((element, index) => (
          <div key={index}>
            {element.latitude ? (
              <Marker
                key={element.employeeId}
                label={element.firstName}
                position={{
                  lat: element.latitude,
                  lng: element.longitude,
                }}
              />
            ) : null}
          </div>
        ))}
        {/* {driverMarkers ? driverMarkers : null} */}
      </GoogleMap>
    </LoadScript>
  );
};

const mapStateToProps = (state) => ({
  store: state.stores.connectedStore,
  ActiveMovingDriver: state.drivers.ActiveMovingDriver,
});

export default connect(mapStateToProps, null)(MapContainer);
