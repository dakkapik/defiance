import React, { useState, useEffect } from "react";

import MockImage from '../Imagefolder/driver.jpg'

export default function DynamicDriverList(props) {
  /*
  Mock driver
  */
  const [driverList, setDriverList] = useState([]);
  console.log(driverList);
  useEffect(() => {
    const list = [];
    props.drivers.forEach((driver) => {
      list.push(
        <DriverListItem
          key={driver._id}
          firstName={driver.firstName}
          employeeId={driver.employeeId}
          position={driver.position}
        />
      );
    });
    setDriverList(list);
  }, [props.drivers]);

  return <div className="side-bar">{driverList}</div>;
}

function DriverListItem(props) {
  return (
    <div>
      <h3>
        {props.firstName} {props.employeeId}
      </h3>
      <p>timestamp: {props.position ? props.position.timestamp : null}</p>
      {/* <p>{props.position.timestamp}</p> */}
      {/* <p> transmiting: {props.position? props.position.coords.latitude: null}</p>s */}

      <img src={MockImage} alt="driver" className="driver-img" />
    </div>
  );
}
