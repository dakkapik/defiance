import React, {useState, useEffect} from 'react'

const url = 'https://defiance.herokuapp.com/'

export default function DynamicDriverList(props) {

    const [ drivers, setDrivers ] =  useState()

    // console.log(props.positions)s

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
    }, [props.positions])


    const list = []

    Object.values(props.driversIds).forEach(driverId=>{
        // console.log(props.positions[driverId])
        list.push(
            <DriverListItem
            key={drivers[driverId]._id}
            firstName={drivers[driverId].firstName}
            employeeId={drivers[driverId].employeeId}
            // position={props.positions[driverId]}
            ></DriverListItem>)
        
    })
    
    // console.log(list)

    // props.driverIds.forEach(driverId=>{
    //     console.log(drivers[driverId])
    //     // list.push(
    //     // <DriverListItem
    //     // key={driver._id}
    //     // firstName={driver.firstName}
    //     // employeeId={driver.employeeId}
    //     // ></DriverListItem>)
    // })

    return(
        <div>
            {list}
        </div>
    )
}

function DriverListItem (props) {
    // console.log(props.position)
    return (
        <div className="side-bar-item">
            <h3>{props.firstName} {props.employeeId}</h3>
            {/* <p> transmiting: {props.position? props.position.coords.latitude: null}</p>s */}
            
        </div>
    )
}