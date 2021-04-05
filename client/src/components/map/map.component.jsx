import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "./map.styles.scss";
import { connect } from "react-redux";

const containerStyle = {
  width: "100%",
  height: "95vh",
};
// You should refactor stuff here man
const Map = ({ store, ActiveMovingDriver, apiorders }) => {
  //for when you click on an order
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [infoOpen, setInfoOpen] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_google_map_api,
  });

  const markerLoadHandler = (marker, place) => {
    return setMarkerMap((prevState) => {
      return { ...prevState, [place.orderNumber]: marker };
    });
  };
  const markerClickHandler = (event, place) => {
    // Remember which place was clicked
    setSelectedPlace(place);

    // Required so clicking a 2nd marker works as expected
    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);
  };

  const renderMap = () => {
    const { maps } = window.google;

    return (
      <div>
        <GoogleMap
          center={store.location}
          zoom={15}
          mapContainerStyle={containerStyle}
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

          {apiorders.map((order, index) => (
            <Marker
              key={order.orderNumber}
              label={{
                className: "marktest",
                text: `${order.orderNumber}`,
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
              }}
              onLoad={(marker) => markerLoadHandler(marker, order)}
              onClick={(event) => markerClickHandler(event, order)}
              icon={{
                url: "https://pictures-logo.s3.amazonaws.com/restaurant.svg",
                labelOrigin: new maps.Point(20, -10),
                scaledSize: new maps.Size(40, 40),
              }}
              position={{
                lat: order.geocode.lat,
                lng: order.geocode.lng,
              }}
            />
          ))}
          {infoOpen && selectedPlace && (
            <InfoWindow
              anchor={markerMap[selectedPlace.orderNumber]}
              onCloseClick={() => setInfoOpen(false)}
            >
              <div
                style={{
                  outline: "none",
                  width: "300px",
                  wordBreak: "break-word",
                  textAlign: "center",
                }}
              >
                <h3 style={{ color: "black" }}> {selectedPlace.orderNumber}</h3>
                <div style={{ color: "black" }}>{selectedPlace.address}</div>
                <div style={{ color: "black" }}>date: {selectedPlace.date}</div>
                <div style={{ color: "black" }}>
                  phone: {selectedPlace.phone}{" "}
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    );
  };

  return isLoaded ? renderMap() : <div>Loading</div>;
};

const mapStateToProps = (state) => ({
  store: state.stores.connectedStore,
  ActiveMovingDriver: state.drivers.ActiveMovingDriver,
  apiorders: state.orders.apiorders,
});
export default connect(mapStateToProps, null)(Map);
