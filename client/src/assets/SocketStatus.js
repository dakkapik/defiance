import React, {useState, useEffect} from 'react'
import io from 'socket.io-client'
import '../style/socket-status.css'

const endpoint = "https://localhost:3001/"

export default function SocketStatus (props) {

    const [ socket, setSocket ] = useState()
    
    useEffect(() => {
        const socket = io(process.env.REACT_APP_endpoint)
        setSocket(socket)

        socket.on('connect',()=>{

            socket.emit('new-user', {id: 'mission-control', room: 'Royal Palm', ms: true})
            //on disconnect update from logged in drivers
        })

        socket.on('current-users', (data)=>{
            const drivers = []

            Object.values(data.users).forEach((id)=>{
                drivers.push({id})
            })

            props.setActiveDrivers(drivers)
        })

        //on disconnect update
        

        socket.on('d-position', (position, id)=>{

            props.setPosition({id, position})

            // add on transmition stop event
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
       </div>
   )

   function handleMessage(socket, store) {
       socket.send('Royal')
   }
}
