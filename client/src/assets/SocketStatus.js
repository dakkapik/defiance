import React, {useState, useEffect} from 'react'
import io from 'socket.io-client'

const endpoint = "http://localhost:3001"

export default function SocketStatus (props) {

    const [ socket, setSocket ] = useState()
    const [ positions, setPositions ] = useState([])
    const [ history, setHistory ] = useState([])

    useEffect(() => {
        const socket = io(endpoint)
        setSocket(socket)

        socket.on('connect',()=>{

            socket.emit('new-user', {id: 'mission-control', room: 'Royal', ms: true})

        })

        socket.on('current-users', (data)=>{
            const drivers = []
            Object.values(data.users).forEach((id)=>{
                drivers.push({id})
            })
            setPositions(drivers)
        })
        //on disconnect update
        

        socket.on('d-position', (position, id)=>{
            // setHistory(history.push(positions))

            positions.forEach(driver=>{
                if(driver.id === id){
                    console.log(positions.id)
                }
            })

            // Object.values(activeDriversIds).forEach((activeId)=>{
            //     if(activeId === id){
            //         setPositions()
            //     }
            // })
            
            
            //set up some for of history and a form to refer to each client and give it a coords value
        })

        return ()=>{ socket.disconnect() }

    }, [props.store])

    useEffect(()=>{

        console.log(positions)

    }, [positions])

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
