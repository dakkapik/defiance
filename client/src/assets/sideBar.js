import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'

import '../style/socketStatus.css'

const endpoint = "http://localhost:3001"
const url = 'https://defiance.herokuapp.com/'

export default function SideBar (props) {

    const [socket, setSocket] = useState()

    useEffect(() => {
        const socket = io(endpoint)
        setSocket(socket)

        socket.on('connect',()=>{

            socket.emit('new-user', {id: 'mission-control', room: 'Royal', ms: true})

        })

        socket.on('current-users', (users)=>{
            console.log(users)
        })
        
        socket.on('new-user', (user)=>{
            console.log(user)
        })

        socket.on('d-position', (position, id)=>{
            console.log(id)
        })

        return ()=>{ socket.disconnect() }

    }, [props.store])

   return(
       <div className="socket-status">
        <div>
            <h3 className="store-name">{props.store.name}</h3>
            <button onClick={props.handleConnect}>DISCONNECT</button>
            <p>socket server: {endpoint}</p>
            <button onClick={()=>handleMessage(socket, props.store.name)}>send message</button>
        </div>
        <DriverList/>
       </div>
   )
}

function handleMessage(socket, store) {
    socket.send('Royal')
}


function DriverList () {

    const [users, setUsers] = useState([])

    useEffect(() => {

        const items = [];

        fetch(url+'api/users')
        .then(res=>res.json())
        .then(result=>{

            for(let i = 0; i < result.length; i++){
                items.push(
                    <SideBarItem
                        key={result[i]._id}
                        firstName={result[i].firstName}
                        employeeId={result[i].employeeId}
                        isActive={result[i].isActive}
                        isAdmin={result[i].isAdmin}
                    />)
            }

            setUsers(items)
        })
        .catch(error=>{console.log('fetch error: ' + error)})

    }, [])

    return(
        <div className="side-bar">
            {users}
        </div>
    )
}

function SideBarItem (props) {
    return (
        <div className="side-bar-item">
            {props.firstName}
            {props.employeeId}
        </div>
    )
}