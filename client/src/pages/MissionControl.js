import React, {useState, useEffect} from 'react'
import '../style/MissionControl.css'

const url = 'https://defiance.herokuapp.com/'

export default function MissionControl (){
    return (
        <div className="body">
            <div className="map">
                <SideBar/>
            </div>
            <div className="bottom-bar">bottom bar</div>
        </div>
    )
}

function SideBar () {

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