import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'

import '../style/sideBar.css'

const endpoint = "http://localhost:3001"
const url = 'https://defiance.herokuapp.com/'

export default function SideBar (props) {

    const [socket, setSocket] = useState()
    const [drivers, setDrivers] = useState([])
    const [activeDriversIds, setActiveDriversIds] = useState()
    const [activeDrivers, setActiveDrivers] = useState([])

    useEffect(() => {

        fetch(url+'api/users')
        .then(res=>res.json())
        .then(result=>{setDrivers(result)})
        .catch(error=>{console.log('fetch error: ' + error)})

    }, [])

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
        
        socket.on('d-position', (position, id)=>{
            // console.log(id)
        })

        return ()=>{ socket.disconnect() }

    }, [props.store])

    useEffect(() => {
        
        const list = []

        if(activeDriversIds){
            Object.values(activeDriversIds).forEach(driverId=>{
                drivers.forEach(driver=>{
                    if(driver.employeeId === driverId){
                        list.push(driver)
                    }
                })
            })
        }

        setActiveDrivers(list)
        
    }, [activeDriversIds])

   return(
       <div className="socket-status">
        <div>
            <h3 className="store-name">{props.store.name}</h3>
            <button onClick={props.handleConnect}>DISCONNECT</button>
            <p>socket server: {endpoint}</p>
            <button onClick={()=>handleMessage(socket, props.store.name)}>send message</button>
        </div>
        {activeDrivers[0] ? <DriverList activeDrivers={activeDrivers}/> : null}
       </div>
   )
}

function DriverList (props){
    const list = []

    props.activeDrivers.forEach(driver=>{
        list.push(
        <SideBarItem
        key={driver._id}
        firstName={driver.firstName}
        employeeId={driver.employeeId}
        ></SideBarItem>)
    })

    return(
        <div>
            {list}
        </div>
    )
}

function handleMessage(socket, store) {
    socket.send('Royal')
}



function SideBarItem (props) {
    return (
        <div className="side-bar-item">
            {props.firstName}
            {props.employeeId}
        </div>
    )
}