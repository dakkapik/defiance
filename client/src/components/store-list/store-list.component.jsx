import React, { useState, useEffect } from "react";
import axios from "axios";
import StoreItem from "../store-item/store-item.component";
import "./store-list.styles.scss";
const StoreList = ({ handleConnect }) => {
  const [stores, setStores] = useState([]);
  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get("/api/stores", {
        cancelToken: source.token,
      })
      .then((res) => {
        setStores(res.data);
      });
    return () => {
      source.cancel("Component got unmounted");
    };
  }, []);
  return (
    <div className="store-list">
      {stores.map((storeinfo, index) => (
        <StoreItem
          key={storeinfo._id}
          storeInfo={storeinfo}
          handleConnect={handleConnect}
        />
      ))}
    </div>
  );
};

export default StoreList;
