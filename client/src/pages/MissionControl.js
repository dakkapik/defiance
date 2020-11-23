import React, { useState }from 'react'

import '../style/MissionControl.css'

import { SocketStatus }from '../assets/SocketStatus.js'

const url = 'https://defiance.herokuapp.com'
// const socketEndPoint = 'http://localhost:3001'
const test = [{name: "juan", id: 1}, {name: "pedro", id: 2}, {name: "jose", id:3}, {name: "manuel", id:4}]


export default function MissionControl () {

    return (
        <div className="body">
            <div className="map">
                <SocketStatus/>
                <SideBar/> 
            </div>
            <div className="bottom-bar">bottom bar</div>
        </div>
    )
}

function SideBar () {

    const [users, setUsers] = useState(test)

    const drivers = []

    for(let i = 0; i < users.length; i++){
        drivers.push(
        <Driver
            key={test[i].id}
            onClick={()=>handleClick(test[i])}
            driver={test[i].name}
        />)
    }

    return(
        <div className="side-bar">
            {drivers}
        </div>
    )
}

function handleClick(i){
    console.log(i)
}

function Driver (props) {

    return(
        <button
        key={props}
        className="driver"
        onClick={props.onClick}>
            {props.driver}
        </button>
    )
}

async function getUsers() {
    const users = await fetch(`${url}/api/users`)
    .then((response)=>response.json())
    .then((json)=>{
        return json
    })
    .catch((error)=>{console.error('this error: '+error)})
    return users
}