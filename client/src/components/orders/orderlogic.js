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
