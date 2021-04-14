import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../redux/orders/orders.utils";
import OrderCard from "../order-card/order-card.component";
const AllApiOrders = () => {
  const [api, setApi] = useState({});
  useEffect(() => {
    fetchOrders().then((data) => {
      setApi(data);
    });
  }, []);

  return (
    <div>
      {api.length
        ? api.map((order, index) => <OrderCard key={index} order={order} />)
        : null}
    </div>
  );
};

export default AllApiOrders;
