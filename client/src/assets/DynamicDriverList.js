import React, {useState, useEffect} from 'react'

const url = 'https://defiance.herokuapp.com/'

export default function DynamicDriverList(props) {

    const [ drivers, setDrivers ] =  useState({})
    const [ positions, setPositions ] = useState({})

    useEffect(() => {

        fetch(url+'api/users')
        .then(res=>res.json())
        .then(result=>{
            let drivers = {}
            result.forEach(driver =>{
                    drivers[driver.employeeId] = driver
                }
            )
            setDrivers(drivers)
        })
        .catch(error=>{console.log('fetch error: ' + error)})

    }, [])

    useEffect(() => {
        console.log(props.positions)
    }, [props.position])


    const list = []

    // Object.keys(props.positions).forEach(driverId=>{
    //     // console.log(props.positions[driverId])
    //     list.push(
    //         <DriverListItem
    //         key={drivers[driverId]._id}
    //         firstName={drivers[driverId].firstName}
    //         employeeId={drivers[driverId].employeeId}
    //         position={positions[driverId]}
    //         ></DriverListItem>)
        
    // })
    return(
        <div>
            {list}
        </div>
    )
}


function DriverListItem (props) {
    return (
        <div className="side-bar-item">
            <h3>{props.firstName} {props.employeeId}</h3>
            {/* <p>{props.position.timestamp}</p> */}
            {/* <p> transmiting: {props.position? props.position.coords.latitude: null}</p>s */}
            
        </div>
    )
}