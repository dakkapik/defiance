import React, {useState, useEffect} from 'react'


export default function DynamicDriverList(props) {

    const [ driverList, setDriverList ] = useState([])

    useEffect(() => {

        const list = []
        props.drivers.forEach(driver=>{
            list.push(
                <DriverListItem
                    key = {driver._id}
                    firstName = {driver.firstName}
                    employeeId = {driver.employeeId}
                    position = {driver.position}
                />
            )
        })
        setDriverList(list)

    }, [props.drivers])



    
    return(
        <div>
            {driverList}
        </div>
    )
}


function DriverListItem (props) {

    return (
        <div className="side-bar-item">
            <h3>{props.firstName} {props.employeeId}</h3>
            <p>timestamp: {props.position ? props.position.timestamp : null}</p>
            {/* <p>{props.position.timestamp}</p> */}
            {/* <p> transmiting: {props.position? props.position.coords.latitude: null}</p>s */}
            
        </div>
    )
}