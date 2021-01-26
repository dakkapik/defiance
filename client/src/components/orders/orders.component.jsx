import React, { useState } from "react";
import Data from "./data.js";
import "./orders.styles.scss";
import DynamicDriverList from "../dynamic-driverlist/dynamic-driverlist.component";
const Orders = ({ isexpanded }) => {
  const [data] = useState(Data);
  console.log(data);
  return (
    <div>
      {isexpanded ? (
        <div className="columns-fade-in">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus
          optio ipsum explicabo iste illum quam inventore, saepe eveniet nemo
          recusandae! Ad quos unde corrupti fugit quam eligendi recusandae omnis
          sapiente!
          <DynamicDriverList />
        </div>
      ) : (
        <DynamicDriverList />
      )}
    </div>
  );
};

export default Orders;
