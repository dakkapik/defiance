import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import globalcss from '../../global-css/styled-component-variable'
const Container = styled.div`
  border: 1px solid ${globalcss.textcolor};
  margin: auto;

  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  text-align: center;
  /* width: fit-content; */
`;

const Order = ({ order, index }) => {
  /*
  A Draggable expects its child to be a function 
  Required to have an ID
  */
  return (
    <Draggable draggableId={order.id} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          /*{...provided.dragHandleProps} can be used alternativly 
          for another dom element to make drags like if you wanted a tiny square in
          the side of this order component to be dragged *order  u can drag the star instead
          */
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div> id : {order.id}</div>
          <div> Address : {order.address}</div>
          <div> Time : {order.time}</div>
        </Container>
      )}
    </Draggable>
  );
};

export default Order;
