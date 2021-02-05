import React, { useState, useEffect } from "react";
import axios from "axios";
import Data from "./data.js";
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

const Orders = ({ isexpanded, currentDrivers }) => {
  const [data, setData] = useState(Data);
  const [dragOrders, setdragOrders] = useState();
  const [apiorders, setapiOrders] = useState([]);
  //get the data and set it
  useEffect(() => {
    axios.get("/api/orders").then((res) => {
      setapiOrders(res.data);
    });
  }, []);
  //Parse the data to properly display it in drag and drop column
  useEffect(() => {
    let ParseOrders = {
      Orders: {},
      columns: {
        "column-1": {
          id: "column-1",
          title: "Orders",
          OrderIds: [],
        },
      },
      columnOrder: ["column-1"],
    };
    let cloneapiOrder = [...apiorders];
    //Big O of O(n)
    cloneapiOrder.map((order, index) => {
      //create a newObject without the key ordernumber
      let { orderNumber, ...WithoutorderNumber } = order;
      // put orderNumber back in the object however rename it as
      // id
      WithoutorderNumber["id"] = orderNumber;

      ParseOrders.Orders[orderNumber] = WithoutorderNumber;
    });

    //because currentDrivers starts off as undefined
    if (currentDrivers) {
      currentDrivers.map((driver, index) => {
        let { employeeId, ...WithoutemployeeId } = driver;
        WithoutemployeeId["id"] = employeeId;
        ParseOrders.columns[employeeId] = WithoutemployeeId;
        const columnindex = ParseOrders.columnOrder.indexOf(employeeId);
        if (columnindex) {
          ParseOrders.columnOrder.push(employeeId);
        }
      });
    }
  }, [apiorders, currentDrivers]);

  // console.log(dragOrders);

  /*

   
    
  */

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
      taskIds: newTaskIds,
    };
    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      },
    };
    setData(newState);
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
      taskIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finishTaskId);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setData(newState);
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

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    // If a draggable object remained in the first column
    // we presist the value within the first column
    if (start === finish) {
      presistTaskFirstColumn(
        start.taskIds,
        source,
        destination,
        draggableId,
        start
      );
      return;
    } else {
      //when a task moves to a different column
      presistTaskAllColumns(
        start.taskIds,
        finish.taskIds,
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
            {data.columnOrder.map((columnId, index) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map(
                (taskIds) => data.tasks[taskIds]
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
              if (data.columnOrder.length - 1 === index) {
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
});

export default connect(mapStateToProps, null)(Orders);
