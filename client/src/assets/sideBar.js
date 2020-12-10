import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'

import DynamicDriverList from '../assets/DynamicDriverList'

import '../style/sideBar.css'

const endpoint = "http://localhost:3001"
const url = 'https://defiance.herokuapp.com/'

export default function SideBar (props) {

    const [socket, setSocket] = useState()
    const [activeDriversIds, setActiveDriversIds] = useState({})
    const [driversPostions, setDriversPositions] = useState({})

    //IT HAS TO BE A REFERENCE

    useEffect(() => {
        const socket = io(endpoint)
        setSocket(socket)

        socket.on('connect',()=>{

            socket.emit('new-user', {id: 'mission-control', room: 'Royal', ms: true})

        })

        socket.on('current-users', (data)=>{
            setActiveDriversIds(data.users)
        })
        //on disconnect update
        
        const driversPos = {}

        socket.on('d-position', (position, id)=>{
            driversPos[id] = position
            setDriversPositions(driversPos)
        })

        return ()=>{ socket.disconnect() }

    }, [props.store])

    useEffect(()=>{
        console.log(driversPostions)
    }, [driversPostions])
    // useEffect(() => {
        

    //     const activeList = Object.values(activeDriversIds).reduce((active, driverId)=>{
            
    //         if(drivers[driverId] != null ) active.push(drivers[driverId])
    //         return active
            
    //     }, [])

    //     setActiveDriversArray(activeList)
        
    // }, [activeDriversIds])

   return(
       <div className="socket-status">
        <div>
            <h3 className="store-name">{props.store.name}</h3>
            <button onClick={props.handleConnect}>DISCONNECT</button>
            <p>socket server: {endpoint}</p>
            <button onClick={()=>handleMessage(socket, props.store.name)}>send message</button>
        </div>
        {activeDriversIds? <DynamicDriverList driversIds={activeDriversIds} positions={driversPostions}/>: null}
       </div>
   )
}

function handleMessage(socket, store) {
    socket.send('Royal')
}
