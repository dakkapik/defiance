import React, { useState, useEffect } from "react";
import axios from "axios";
import StoreItem from "../store-item/store-item.component";
import "./store-list.styles.scss";
const StoreList = ({ handleConnect }) => {
  const [stores, setStores] = useState([]);
  useEffect(() => {
    axios.get("/api/stores").then((res) => {
      setStores(res.data);
    });
  }, []);
  return (
    <div className="store-list">
      {stores.map((e, i) => (
        <StoreItem
          i={i}
          key={e._id}
          name={e.name}
          number={e.number}
          location={e.location}
          handleConnect={handleConnect}
        />
      ))}
    </div>
  );
};

export default StoreList;
