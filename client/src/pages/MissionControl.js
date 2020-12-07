import React, {useState, useEffect} from 'react'
// import { Loader } from  '@googlemaps/js-api-loader'

import SocketStatus from '../assets/SideBar'
import MapContainer from '../assets/MapContainer'

import '../style/MissionControl.css'

const url = 'https://defiance.herokuapp.com/'



export default function MissionControl (){
    
    const [ loadSocket, setLoadSocket ] = useState(false)
    const [ store, setStore ] = useState({store:{}})
    
    return (
        <div className="body">
            
            <div className="map">
                <MapContainer
                    store = {store.store}
                /> 
                {loadSocket ?  
                <SocketStatus
                    store = {store}
                    handleConnect = {handleConnect}
                /> 
                :
                <StoreSelect
                    handleConnect = {handleConnect}
                />}
            </div>

            <div className="bottom-bar">bottom bar</div>
        </div>
    )

    function handleConnect(i){

        setStore({store: {name: i.name, id: i.number, location: i.location}})
        setLoadSocket(prevState => !prevState)
    }
}

function StoreSelect (props) {

    const [stores, setStores] = useState()

    useEffect(() => {

        const items = []

        fetch(url + 'api/stores')
        .then(res=>res.json())
        .then(result=>{
            for(let i = 0; i < result.length; i++){
                items.push(    
                <StoreItem
                    key={result[i]._id}
                    name={result[i].name}
                    number={result[i].number}
                    location={result[i].location}
                    handleConnect={()=>props.handleConnect(result[i])}
                />)
            }
            setStores(items)
        })
        .catch(error=>'fetch error: ' + console.log(error))

    }, [])

    return (
        <div className="store-item-list">
            {stores}
        </div>
    )
}

function StoreItem (props) {
    return (
        <div className="store-item">
            {props.name}
            <button onClick={props.handleConnect}>CONNECT</button>
        </div>
    )
}
