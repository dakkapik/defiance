import React, { useState } from "react";

import Data from "./data.js";

import DynamicDriverList from "../dynamic-driverlist/dynamic-driverlist.component";
import { Container } from "./orders.styles";

import { DragDropContext } from "react-beautiful-dnd";
import Column from "../column/column.component";
/*
We will use styled components for this to changed dynamic styling with 
React Beautiful DND
*/

const Orders = ({ isexpanded }) => {
  const [data, setData] = useState(Data);
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    //if the task is dragged out of bounds
    if (!destination) {
      return;
    }
    // if the task is in the same spot
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    //when a task stays in the same column
    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];
    //conditional statement when task stays at the same column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
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
    }
    //When a task move to a different columns
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.taskIds);
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
  return (
    <div>
      {isexpanded ? (
        <Container>
          <DragDropContext onDragEnd={onDragEnd}>
            {data.columnOrder.map((columnId, index) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map(
                (taskIds) => data.tasks[taskIds]
              );

              return <Column key={column.id} column={column} tasks={tasks} />;
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
