import React, { useState, useEffect } from "react";
import "../style/MissionControl.css";
import Image from "../Imagefolder/driver.jpg";

const url = "https://defiance.herokuapp.com/";

export default function MissionControl() {
  return (
    <div className="body">
      <div className="map">
        <SideBar name="person" />
      </div>
      <div className="bottom-bar">bottom bar</div>
    </div>
  );
}

function SideBar() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const items = [];

    fetch(url + "api/users")
      .then((res) => res.json())
      .then((result) => {
        for (let i = 0; i < result.length; i++) {
          items.push(
            <SideBarItem
              key={result[i]._id}
              firstName={result[i].firstName}
              employeeId={result[i].employeeId}
              isActive={result[i].isActive}
              isAdmin={result[i].isAdmin}
            />
          );
        }

        setUsers(items);
      })
      .catch((error) => {
        console.log("fetch error: " + error);
      });
  }, []);

  return <div className="side-bar">{users}</div>;
}

function SideBarItem(props) {
  return (
    <div className="side-bar-item">
      <h3>{props.firstName}</h3>
      <h4>{props.employeeId}</h4>

      <img src={Image} alt="driver" className="driver-img" />
    </div>
  );
}

//Estimated time of Return

// function getDistanceOneToOne(lat1, lng1, lat2, lng2)
//     {
//        const Location1Str = lat1 + "," + lng1;
//        const Location2Str = lat2 + "," + lng2;

//        let ApiURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";

//        let params = `origins=${Location1Str}&destinations=${Location2Str}&key=${GOOGLE_API_KEY}`; // you need to get a key
//        let finalApiURL = `${ApiURL}${encodeURI(params)}`;

//        let fetchResult =  await fetch(finalApiURL); // call API
//        let Result =  await fetchResult.json(); // extract json

//        return Result.rows[0].elements[0].distance;
//     }
