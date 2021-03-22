import { saveOrders } from "../../redux/orders/orders.action";
import { connect } from "react-redux";
import React from "react";
import Modal from "@material-ui/core/Modal";

import { useStyles, Fade } from "./modal.styles";
import Button from "@material-ui/core/Button";
export const ModalButton = ({ saveOrders, drivers_with_orders }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    saveOrders();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="inherit" onClick={handleOpen}>
        Save
      </Button>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title">Spring modal</h2>
            {drivers_with_orders.map((order, i) => (
              <p key={i} id="spring-modal-description">
                {order.firstName}, {JSON.stringify(order.orders)}
              </p>
            ))}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  drivers_with_orders: state.orders.drivers_with_orders,
});

const mapDispatchToProps = (dispatch) => ({
  saveOrders: () => dispatch(saveOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalButton);
