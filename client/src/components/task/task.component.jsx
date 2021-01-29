import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`;

const Task = ({ task, index }) => {
  /*
  A Draggable expects its child to be a function 
  Required to have an ID
  */
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          /*{...provided.dragHandleProps} can be used alternativly 
          for another dom element to make drags like if you wanted a tiny square in
          the side of this task component to be dragged *task  u can drag the star instead
          */
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
