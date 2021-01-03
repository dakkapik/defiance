import React, { useState, useEffect } from "react";
import "./dynamic-driverlist.styles.scss";
import DynamicDriver from "../dynamic-driver/dynamic-driver.componet";

const DynamicDriverList = ({ drivers }) => {
  const [driverList, setDriverList] = useState([]);

  useEffect(() => {
    const list = [];
    drivers.forEach((driver) => {
      list.push(
        <DynamicDriver
          key={driver.employeeId}
          firstName={driver.firstName}
          employeeId={driver.employeeId}
          position={driver.position}
        />
      );
    });
    setDriverList(list);
  }, [drivers]);

  return <div className="side-bar">{driverList}</div>;
};

export default DynamicDriverList;
