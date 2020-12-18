import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker} from '@react-google-maps/api'

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
    const [ driverMarkers, setDriverMarkers ] = useState([])

    useEffect(() => {
        if(props.store.location){
            setCenter(props.store.location)
            setZoom(14)
        }else{
            setCenter(defaultCenter)
            setZoom(12)
        }

    }, [props.store])

    useEffect(()=>{

        const markers = []
        props.drivers.forEach(driver=>{
            if(driver.position){
                markers.push(
                    <Marker
                        key= {driver._id} 
                        position={{
                            lat:driver.position.coords.latitude, 
                            lng: driver.position.coords.longitude}}
                    />
                )
            }
        })
        setDriverMarkers(markers)

    }, [props.drivers])

    
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
            {driverMarkers ? driverMarkers : null}

            </GoogleMap>
        </LoadScript>
    );
}


const style = {
    width: '100%',
    height: '100%'
}
