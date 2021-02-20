import React, { useState, useEffect } from "react";
import axios from "axios";

import { connect } from "react-redux";
import DynamicDriverList from "../dynamic-driverlist/dynamic-driverlist.component";
import { Container, ContainerDriver, ContainerOrder } from "./orders.styles";

import { DragDropContext } from "react-beautiful-dnd";
import Column from "../column/column.component";
// import Orderdata from "./order";

/*
We will use styled components for this to changed dynamic styling with 
React Beautiful DND
*/

/*
@Params  isexpanded
is a boolean prop value from  map-sidebar component
which is the dynamic styling when the arrow is clicke
*/

/*
BUG SAY WE HAVE MULTIPLE DRIVERS CONNECTED ALREADY
we reconnect again and there's only one driver );

BUG HAPPENS DURING TRANSPORT CLOSED ASWELL


IMPLEMENTATION maybe within server.js we can add a funcitonality
where we get one driver instead of the whole thing
*/

const Orders = ({
  isexpanded,
  justadded,
  disconnectedDriver,
  disconnectTrigger,
}) => {
  const [apiorders, setapiOrders] = useState([]);

  const [dragdropdata, setDragDropData] = useState({
    orders: {},
    columns: {
      "column-1": {
        id: "column-1",
        title: "Orders",
        orderIds: [],
      },
    },
    columnOrder: ["column-1"],
  });

  useEffect(() => {
    axios.get("/api/orders").then((res) => {
      setapiOrders(res.data);
    });
  }, []);
  //set Orders within column 1
  useEffect(() => {
    // console.log("Order UseEffect has been called");
    let ParseOrders = {
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
    // columnOrder string
    // order id has to be a string
    // column-1 taskIds has to be strings as well
    let cloneapiOrder = [...apiorders];

    cloneapiOrder.forEach((order, index) => {
      //create a newObject without the key ordernumber
      let { orderNumber, ...WithoutorderNumber } = order;
      // put orderNumber back in the object however rename it as
      // id
      //also convert id to string
      WithoutorderNumber["id"] = orderNumber.toString();

      ParseOrders.orders[orderNumber] = WithoutorderNumber;
      //push data into column 1 orderIds
      ParseOrders.columns["column-1"].orderIds.push(orderNumber.toString());
    });

    setDragDropData(ParseOrders);
  }, [apiorders]);
  //preserve Orders when Users is added only
  useEffect(() => {
    console.log("ADD useeffect");
    if (justadded && "employeeId" in justadded) {
      let NewcolumnDriver = {};
      let { employeeId, ...Replace_Key_EmployeeId } = justadded;
      Replace_Key_EmployeeId["id"] = employeeId.toString();
      Replace_Key_EmployeeId["orderIds"] = [];
      NewcolumnDriver[employeeId.toString()] = Replace_Key_EmployeeId;

      setDragDropData((dragdropdata) => {
        return {
          orders: { ...dragdropdata.orders },
          columns: { ...dragdropdata.columns, ...NewcolumnDriver },
          columnOrder: [...dragdropdata.columnOrder, employeeId.toString()],
        };
      });
    }
  }, [justadded]);
  //preserve column when user is disconnected
  useEffect(() => {
    console.log("REMOVE useeffect");
    if (disconnectedDriver) {
      setDragDropData((dragdropdata) => {
        const employeeId = disconnectedDriver.toString();

        let Column_1 = {};
        const {
          [`${employeeId}`]: Disconnected_Driver_Info,
          "column-1": { orderIds, ...restoring_column_1 },
          ...Objects_Without_Driver
        } = dragdropdata.columns;
        let { columnOrder } = dragdropdata;

        // Try catch because when user connects and disconnects
        // really quickly orderIds will go undefined
        try {
          let Restore_Ids_To_Column1 = orderIds.concat(
            Disconnected_Driver_Info.orderIds
          );

          restoring_column_1["orderIds"] = Restore_Ids_To_Column1;

          Column_1["column-1"] = restoring_column_1;
          columnOrder = columnOrder.filter((e) => e !== employeeId);
          //new columns
          console.log({ ...Column_1, ...Objects_Without_Driver });
          //new columnOrders

          return {
            orders: { ...dragdropdata.orders },
            columns: { ...Column_1, ...Objects_Without_Driver },
            columnOrder: columnOrder,
          };
        } catch (err) {
          console.log(
            "Etheir the App restarted or multiple users went offline and online really quickly"
          );
          return {
            orders: { ...dragdropdata.orders },
            columns: { ...dragdropdata.columns },
            columnOrder: [...dragdropdata.columnOrder],
          };
        }
      });
    }
  }, [disconnectedDriver, disconnectTrigger]);

  const presistTaskFirstColumn = (
    startTaskId,
    source,
    destination,
    draggableId,
    start
  ) => {
    const newTaskIds = Array.from(startTaskId);

    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...start,
      orderIds: newTaskIds,
    };
    const newState = {
      ...dragdropdata,
      columns: {
        ...dragdropdata.columns,
        [newColumn.id]: newColumn,
      },
    };
    setDragDropData(newState);
    return;
  };
  const presistTaskAllColumns = (
    startTaskId,
    finishTaskId,
    source,
    destination,
    draggableId,
    start,
    finish
  ) => {
    //When a task move to a different columns
    const startTaskIds = Array.from(startTaskId);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      orderIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finishTaskId);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      orderIds: finishTaskIds,
    };
    const newState = {
      ...dragdropdata,
      columns: {
        ...dragdropdata.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setDragDropData(newState);
  };

  const onDragEnd = (result) => {
    /*
    @result parameter
    is an object that contains info about
    what happened during onDragend 

    Here is the object
    
    const result = {
     draggableid: 'task-1'
     type: 'TYPE'
     reason 'DROP', //can be dropped or canceled

     //****IMPORTANT****
     //source contains info of where the draggable started
     //destination contains info of where it finished
     source:{
         droppableId: 'column-1'
         index:0
     }
    //destination can be null where the user dragged the task outside of the column
     destination:{
        droppableId: 'column-1'
        index:1
     }
    }
    */

    //source is where draggable object started at
    //destination is where the draggable object finished at
    const { destination, source, draggableId } = result;
    // console.log(
    //   "belonged at column",
    //   source.droppableId,
    //   " ",
    //   source.droppableId === "column-1"
    // );
    // console.log(
    //   "dropped at column",
    //   destination.droppableId,
    //   " ",
    //   destination.droppableId !== "column-1"
    // );

    // if (
    //   (source.droppableId === "column-1" ||
    //     source.droppableId !== "column-1") &&
    //   destination.droppableId !== "column-1"
    // ) {
    //   alert(
    //     `Are you sure you want to give order ${draggableId} to driver ${destination.droppableId}`
    //   );

    // }
    //if the draggable object went out of bounds we don't do anything
    if (!destination) {
      return;
    }
    // if a draggable object stayed at the same position then
    // we don't need to do anything
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = dragdropdata.columns[source.droppableId];
    const finish = dragdropdata.columns[destination.droppableId];

    // If a draggable object remained in the first column
    // we presist the value within the first column
    if (start === finish) {
      presistTaskFirstColumn(
        start.orderIds,
        source,
        destination,
        draggableId,
        start
      );
      return;
    } else {
      //when a task moves to a different column
      presistTaskAllColumns(
        start.orderIds,
        finish.orderIds,
        source,
        destination,
        draggableId,
        start,
        finish
      );
    }
  };
  //Array of html elements
  let drivers = [];

  return (
    <div>
      {isexpanded ? (
        <Container>
          {/*DragDropContext is the responder top level application events 
            They are different life cycle such as onDragEnd, onDragStart etc...

            OnDragEnd is (required):
            A drag has ended. It is the responsibility of this responder 
            to synchronously apply changes that has resulted from the drag
          */}
          <DragDropContext onDragEnd={onDragEnd}>
            {dragdropdata.columnOrder.map((columnId, index) => {
              const column = dragdropdata.columns[columnId];
              // console.log("error", column.orderIds);
              const tasks = column.orderIds.map(
                (orderIds) => dragdropdata.orders[orderIds]
              );

              if (column.id === "column-1") {
                return (
                  <ContainerOrder key={index}>
                    <Column key={column.id} column={column} tasks={tasks} />
                  </ContainerOrder>
                );
              } else {
                drivers.push(
                  <Column key={column.id} column={column} tasks={tasks} />
                );
              }
              //At the final iteration we want to display the driver in a containerized
              // div
              if (dragdropdata.columnOrder.length - 1 === index) {
                return (
                  <ContainerDriver key={index}>
                    {drivers.map((e, i) => e)}
                  </ContainerDriver>
                );
              }
              return null; //placeholder
            })}
          </DragDropContext>
        </Container>
      ) : (
        <DynamicDriverList />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentDrivers: state.drivers.currentDrivers,
  justadded: state.drivers.justadded,
  disconnectedDriver: state.drivers.disconnectedDriver,
  disconnectTrigger: state.drivers.disconnectTrigger,
});

// Map dispatch to props  justadded and disconnected
// we can pass drivers and socket

export default connect(mapStateToProps, null)(Orders);
