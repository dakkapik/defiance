import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import globalcss from "../../global-css/styled-component-variable";
import IconButton from "@material-ui/core/IconButton";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { makeStyles } from "@material-ui/core/styles";
const Container = styled.div`
  border: 1px solid ${globalcss.textcolor};
  margin: auto;

  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  text-align: center;
  display: flex;
  justify-content: center;
  /* width: 200px; */
`;
const OrderDetails = styled.div`
  width: 300px;
  margin-right: 3vh;
  word-break: break-all;
  margin-right: ${(props) => (props.delete_mark ? "3vh" : "0px")};
`;
const Info = styled.div`
  padding: 5px;
`;
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0px",
  },
}));
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Order = ({ order, index, delete_mark }) => {
  const classes = useStyles();
  /*
  A Draggable expects its child to be a function 
  Required to have an ID
  */
  const removeOrderFromDriver = (orderid) => {
    console.log(x);
  };
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
          <OrderDetails delete_mark={delete_mark}>
            <Info>Order : {order.id}</Info>
            <Info>{order.address}</Info>
            <Info> Date : {order.datePosted}</Info>
            <Info> Time : {order.date}</Info>
          </OrderDetails>
          {delete_mark ? (
            <ButtonContainer>
              <IconButton
                onClick={() => removeOrderFromDriver(order.id)}
                color="inherit"
                className={classes.root}
                aria-label="delete"
              >
                <CloseRoundedIcon />
              </IconButton>
            </ButtonContainer>
          ) : (
            <div></div>
          )}
        </Container>
      )}
    </Draggable>
  );
};

export default Order;
