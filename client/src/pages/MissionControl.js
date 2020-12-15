import React, {useState, useEffect} from 'react'

// import MapContainer from '../assets/MapContainer'
import SocketStatus from '../assets/SocketStatus'
import DynamicDriverList from '../assets/DynamicDriverList'

import StoreSelect from '../components/StoreSelect'

import '../style/MissionControl.css'

export default function MissionControl (){
    
    const [ loadSocket, setLoadSocket ] = useState(false)
    const [ store, setStore ] = useState({store:{}})

    const [ driversPositions, setDriversPositions ] = useState({})
  

    useEffect(()=>{
        console.log(driversPositions)
    }, [driversPositions])

    return (
        <div className="body">
            <div className="map">
                {/* <MapContainer
                    store = {store.store}
                />  */}
                {loadSocket ?  
                <SocketStatus
                    store = {store}
                    handleConnect = {handleStore}
                    driversPositions = {driversPositions}
                    setDriversPositions = {setDriversPositions}
                /> 
                :
                null}

                {loadSocket ?
                <DynamicDriverList
                    positions = {driversPositions}
                />
                :
                <StoreSelect
                    handleConnect = {handleStore}
                />
                }
            </div>

            <div className="bottom-bar">bottom bar</div>
        </div>
    )

    function handleStore(i){

        setStore({store: {name: i.name, id: i.number, location: i.location}})
        setLoadSocket(prevState => !prevState)

    }
}


