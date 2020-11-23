import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client'
const endpoint = "http://69.65.91.236:3001"

let socket;

export function SocketStatus () {
    
    const [ socketServer, setSocketServer ] = useState('')
    const [ online, setOnline ] = useState(false)

    const handleConnect = ()=> {
        if(!online){
            setSocketServer(endpoint)
        }else{
            setSocketServer('')
        }
        setOnline(!online)
    }

    useEffect(() => {
        socket = io(socketServer, {reconnection: false})
        socket.on('connect', ()=>{
            console.log('connected')
        })
        socket.on('message', message=>{
            console.log(message)
        })

        return () => socket.disconnect();
        
    }, [socketServer])


   return(
       <div>
        <div>{online ? 'online' : 'offline'}</div>
        <div>server: {socketServer}</div>
        <button onClick={handleConnect}>{online? 'disconnect' : 'connect'}</button>
        <button onClick={handleMessage}>send message</button>
       </div>
   )

    
    function handleMessage() {
        console.log(socket.connected)
        socket.send('message')
    }
}

