import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { Fade, useStyles } from "./x-mark-modal.styles";

import { connect } from "react-redux";
import { removeOrderFromDriver } from "../../redux/orders/orders.action";
import IconButton from "@material-ui/core/IconButton";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import "./x-mark-modal-button.styles.scss";
export const XmarkModalButton = ({
  order_to_delete,
  removeOrderFromDriver,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [clicked_deletion, setClickedOrderDeletion] = useState({});
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const removeorderFromDriver = () => {
    removeOrderFromDriver(clicked_deletion);
  };
  return (
    <div className="xmark">
      {/*X mark logic resides in persistAllColumn function in redux */}
      <div onClick={() => setClickedOrderDeletion(order_to_delete)}>
        <IconButton
          onClick={handleOpen}
          color="inherit"
          className={classes.root}
          aria-label="delete"
        >
          <CloseRoundedIcon />
        </IconButton>
      </div>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title">
              delete order {clicked_deletion.orderid} ?
            </h2>
            <br />
            from driver {clicked_deletion.drivername}
            <br />
            <button style={{ color: "black" }} onClick={handleClose}>
              close
            </button>
            <button style={{ color: "black" }} onClick={removeorderFromDriver}>
              delete
            </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeOrderFromDriver: (order_to_delete) =>
    dispatch(removeOrderFromDriver(order_to_delete)),
});

export default connect(null, mapDispatchToProps)(XmarkModalButton);
