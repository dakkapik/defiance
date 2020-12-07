import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

const containerStyle = {
    width: '400px',
    height: '400px'
};

const defaultCenter = {
    lat: 26.27260777215995, 
    lng: -80.27339459701001,
}

export default function MapContainer (props) {

    const [ map, setMap ] = useState(null)
    const [ zoom, setZoom ] = useState(15)
    const [ center, setCenter ] = useState({
        lat: 26.27260777215995, 
        lng: -80.27339459701001,
    })


    useEffect(() => {
        console.log(props.store)
        if(props.store.location){
            setCenter(props.store.location)
            setZoom(14)
        }else{
            setCenter(defaultCenter)
            setZoom(12)
        }

    }, [props.store])
    
    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds)
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map){
        setMap(null)
    }, [])
    
    return (
        <LoadScript googleMapsApiKey="AIzaSyBXpwzqh9wNL7cLYBJ2_DUunWkNluiSJNI">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                
            </GoogleMap>
        </LoadScript>
    );
}


const style = {
    width: '100%',
    height: '100%'
}
