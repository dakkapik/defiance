import React, { useState } from "react";

import Data from "./data.js";

import DynamicDriverList from "../dynamic-driverlist/dynamic-driverlist.component";
import { Container, ContainerDriver } from "./orders.styles";

import { DragDropContext } from "react-beautiful-dnd";
import Column from "../column/column.component";

/*
We will use styled components for this to changed dynamic styling with 
React Beautiful DND
*/

/*
@Params  isexpanded
is a boolean prop value from  map-sidebar component
which is the dynamic styling when the arrow is clicke
*/

const Orders = ({ isexpanded }) => {
  const [data, setData] = useState(Data);

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
    }
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
                return <Column key={column.id} column={column} tasks={tasks} />;
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

export default Orders;
