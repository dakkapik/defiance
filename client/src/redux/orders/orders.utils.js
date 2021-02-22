import axios from "axios";

export const addDragDropToCollection = (
  dragdropcollection,
  { orders: NewOrders, storename: NewStoreName }
) => {
  const existingDragDrop = dragdropcollection.find(
    (collection) => collection.storename === NewStoreName
  );
  // if the drag and drop is in the collection?
  if (existingDragDrop) {
    return dragdropcollection;
  }

  return [...dragdropcollection, CreateNewDragDrop(NewOrders, NewStoreName)];
};

export const getCurrentDragandDrop = (
  dragdropcollection,
  { orders: NewOrders, storename: NewStoreName }
) => {
  const existingDragDrop = dragdropcollection.find(
    (collection) => collection.storename === NewStoreName
  );
  // if the drag and drop is in the collection?
  if (existingDragDrop) {
    return existingDragDrop;
  }

  return CreateNewDragDrop(NewOrders, NewStoreName);
};

export const CreateNewDragDrop = (NewOrders, NewStoreName) => {
  let newDragDropData = {
    storename: NewStoreName,
    orders: {},
    columns: {
      "column-1": {
        id: "column-1",
        title: "Orders",
        orderIds: [],
      },
    },
    columnOrder: ["column-1"],
  };
  NewOrders.forEach((order) => {
    //create a newObject without the key ordernumber
    let { orderNumber, ...WithoutorderNumber } = order;
    // put orderNumber back in the object however rename it as
    WithoutorderNumber["id"] = orderNumber.toString();

    newDragDropData.orders[orderNumber] = WithoutorderNumber;
    //push data into column 1 orderIds
    newDragDropData.columns["column-1"].orderIds.push(orderNumber.toString());
  });
  return newDragDropData;
};

export const PresistOrderColumn = (
  currentDragDropData,
  //OnDragEndProperties
  { destination, draggableId, source, start, startorderids }
) => {
  const newOrderIds = Array.from(startorderids);

  newOrderIds.splice(source.index, 1);
  newOrderIds.splice(destination.index, 0, draggableId);
  const newColumn = {
    ...start,
    orderIds: newOrderIds,
  };
  const newDragDropData = {
    ...currentDragDropData,
    columns: {
      ...currentDragDropData.columns,
      [newColumn.id]: newColumn,
    },
  };
  return newDragDropData;
};

export const UpdateDragDropCollection = (
  dragdropcollection,
  NewDragDropData
) => {
  return dragdropcollection.map((dragdrop) =>
    dragdrop.storename === NewDragDropData.storename
      ? NewDragDropData
      : dragdrop
  );
};

export const fetchOrders = () => {
  var CancelToken = axios.CancelToken;
  var { token } = CancelToken.source();
  return axios
    .get("/api/orders", { cancelToken: token })
    .then((res) => res.data);
};
