import React, {useState, useEffect} from 'react'

import '../style/MissionControl.css'
import SocketStatus from '../assets/SideBar'

const url = 'https://defiance.herokuapp.com/'

export default function MissionControl (){

    const [ loadSocket, setLoadSocket ] = useState(false)
    const [ store, setStore ] = useState( )

    return (
        <div className="body">
            <div className="map">

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
        setStore({name: i.name, id: i.number})
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
