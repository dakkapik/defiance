import axios from "axios";
import { differenceBy } from "lodash";
/*ACTION TYPE FOR "ADD_DRAG_DROP_TO_COLLECTION"
If a store exist within a draganddropcollection then we leave it as is
otherwise if the manager clicks on a new store then 
we generate a newDragAndDrop and add it to draganddrop collectio*/

export const addDragDropToCollection = (
  dragdropcollection,
  { orders: NewOrders, storename: NewStoreName }
) => {
  const existingDragDrop = dragdropcollection.find(
    (collection) => collection.storename === NewStoreName
  );

  if (existingDragDrop) {
    return dragdropcollection;
  }

  //if it doesn't exist then take the existing dragdropcollection and add a new dragdrop to it
  return [...dragdropcollection, createNewDragDrop(NewOrders, NewStoreName)];
};

/* ACTION TYPE FOR "ADD_DRAG_DROP_TO_COLLECTION"
We look for the current Draganddrop from a specific store
by iterating through the Draganddropcollection.
if we find it then we set the currentdragdrop
Otherwise we create a newdragdrop and set it to the currentdragdrop*/
export const getCurrentDragandDrop = (
  dragdropcollection,
  { orders: NewOrders, storename: NewStoreName }
) => {
  const existingDragDrop = dragdropcollection.find(
    (collection) => collection.storename === NewStoreName
  );
  // if the drag and drop is in the collection?
  if (existingDragDrop) return existingDragDrop;

  return createNewDragDrop(NewOrders, NewStoreName);
};

//ACTION TYPE FOR "PERSIST_ORDER_COLUMN"
export const persistOrderColumn = (
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
  return { ...newDragDropData };
};

export const persistAllColumn = (
  currentDragDropData,
  {
    startorderids,
    finishorderids,
    source,
    destination,
    draggableId,
    start,
    finish,
  }
) => {
  const Newstartorderids = Array.from(startorderids);
  Newstartorderids.splice(source.index, 1);

  const newStart = {
    ...start,
    orderIds: Newstartorderids,
  };
  const Newfinishorderids = Array.from(finishorderids);
  Newfinishorderids.splice(destination.index, 0, draggableId);
  const newFinish = {
    ...finish,
    orderIds: Newfinishorderids,
  };
  const newDragDropData = {
    ...currentDragDropData,
    columns: {
      ...currentDragDropData.columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    },
  };

  return newDragDropData;
};

//ACTION TYPE FOR "PERSIST_ORDER_COLUMN"
export const saveDragDropCollection = (dragdropcollection, NewDragDropData) => {
  return dragdropcollection.map((dragdrop) =>
    dragdrop.storename === NewDragDropData.storename
      ? NewDragDropData
      : dragdrop
  );
};
//FUNCTION FOR ACTION TYPE FOR "INITALIZE_DRIVER_FOR_DRAG_AND_DROP"
export const addDriver = (drivers, currentdragdrop) => {
  /*
  drivers                       = [{employeeId: 4545'}]
  currentdragdrop.currentdriver = [{employeeId:'4545'}, {employeeId:'5578'}, {employeeId::"8954"}]
  because both drivers and currentdriver contain [{employeeId: 4545'}]
  the output is [{employeeId:'5578'},{employeeId::"8954"}]*/
  const add_driver = differenceBy(
    drivers,
    currentdragdrop.currentdriver,
    "employeeId"
  );

  /*We iterate through the addDriver the drivers that were just added
  and create new KEYS and VALUES for currentdragdrop object

  currentdragdrop:{
  columnOrder: (3) ["column-1", "5578", "8954"] <- drivers to be added
  columns: {5578: {…}, 8954: {…}, column-1: {…}} <- drivers to be added
  }
  */
  add_driver.forEach(
    ({ employeeId, ...the_rest_of_the_object_data_without_employeeid }) => {
      currentdragdrop.columns[employeeId.toString()] = {
        id: employeeId.toString(),
        orderIds: [],
        ...the_rest_of_the_object_data_without_employeeid,
      };
      currentdragdrop.columnOrder.push(employeeId.toString());
    }
  );
  return currentdragdrop;
};
//FUNCTION FOR ACTION TYPE FOR "INITALIZE_DRIVER_FOR_DRAG_AND_DROP"
export const removeDriver = (drivers, currentdragdrop) => {
  const removedriver = differenceBy(
    currentdragdrop.currentdriver,
    drivers,
    "employeeId"
  );

  // if there's nothing to remove we just return the currentdragdrop
  if (removedriver.length === 0) return currentdragdrop;

  let restoreOrdersIds = []; //retore the ids back to the Order Column
  let deletedriver = []; //update the order column

  removedriver.forEach(({ employeeId }) => {
    deletedriver.push(employeeId.toString());
    restoreOrdersIds.push(
      currentdragdrop.columns[employeeId.toString()].orderIds
    );
    delete currentdragdrop.columns[employeeId.toString()];
  });

  // filter to remove a number in an array
  currentdragdrop.columnOrder = currentdragdrop.columnOrder.filter(
    (x) => !deletedriver.includes(x)
  );
  // because restoreOrderIds is collections of arrays
  // like this orderIds = [['15',16], ['12','13']]
  // we flatten it like this ['15','16','12','13']
  let flattenRestoreOrderIds = [].concat.apply([], restoreOrdersIds);
  currentdragdrop.columns["column-1"].orderIds = [
    ...currentdragdrop.columns["column-1"].orderIds,
    ...flattenRestoreOrderIds,
  ];

  return currentdragdrop;
};

//ACTION TYPE FOR "INITALIZE_DRIVER_FOR_DRAG_AND_DROP"
export const initalizeDriverDragDrop = (currentdragdrop, drivers) => {
  //Check if a driver was added or removed
  currentdragdrop = addDriver(drivers, currentdragdrop);
  currentdragdrop = removeDriver(drivers, currentdragdrop);
  return {
    ...currentdragdrop,
    currentdriver: [...drivers],
  };
};

// ACTION TYPE FOR REMOVE_DRIVER_FOR_DRAG_AND_DROP
export const removeDriverFromDragAndDrop = (
  dragdrop,
  { currentdrivers, remove }
) => {
  dragdrop.currentdriver = currentdrivers;
  dragdrop.columnOrder = dragdrop.columnOrder.filter(
    (item) => item !== remove.toString()
  );
  let restoreOrder = dragdrop.columns[remove.toString()].orderIds; //grab the removed driver orderids
  dragdrop.columns["column-1"].orderIds = dragdrop.columns[
    "column-1"
  ].orderIds.concat(restoreOrder);
  delete dragdrop.columns[remove.toString()];
  return dragdrop;
};

//This Parses the data that we feed it and turns it into a draganddrop
export const createNewDragDrop = (NewOrders, NewStoreName) => {
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

export const fetchOrders = () => {
  var CancelToken = axios.CancelToken;
  var { token } = CancelToken.source();
  return axios
    .get("/api/orders", { cancelToken: token })
    .then((res) => res.data);
};
