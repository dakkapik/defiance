import React, { useState, useEffect } from "react";

import MockImage from "../Imagefolder/driver.jpg";
import "./dynamic-driver-list.styles.scss";
export default function DynamicDriverList(props) {
  /*
  Mock driver
  */
  const [driverList, setDriverList] = useState([]);

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
    <div className="sidecard">
      <img alt="mock" className="sidecard__avatar" src={MockImage} />
      <div className="sidecard__content">
        <div className="sidecard__content__name">
          {props.firstName} {props.employeeId}
        </div>
        <div className="sidecard__content__sub">
          <div className="sidecard__content__sub__text">
            <div>
              pos: {props.position ? props.position.coords.latitude : null}
            </div>
            <span>Timestamp {props.position.timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
