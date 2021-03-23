import React from "react";
import Modal from "@material-ui/core/Modal";
//styling
import { ordersSocketOff } from "../../redux/orders/orders.action";
import { Fade, useStyles } from "./arrow-expanded-modal-button.styles";
import "./arrow-modal-expanded-button.styles.scss";
import { connect } from "react-redux";
import { discardOrderChanges } from "../../redux/orders/orders.action";
/*
The reason why this modal is Odd
is because animation were not working within mapsidebar conditionalloading

further explanation:

if you were to replace <img className='expanded-arrow'/> with <ArrowModalButton/> in mapsidebar-component
the animation where it smoothly goes to the left and right would not work

Solution:

so the work arounds were to just pass function to the child component  and call the parent
component function to work around the werid  css animation bug.
without effecting the <img className='expanded-arrow'/>
*/
export const ArrowModalButton = ({
  x,
  handleClose,
  discardOrderChanges,
  ordersSocketOff,
}) => {
  const classes = useStyles();
  const discardorderChanges = () => {
    discardOrderChanges();
    ordersSocketOff();
    handleClose();
  };
  const SaveButGoToFullMap = () => {
    ordersSocketOff();
    handleClose();
  };
  const clearButStayOnPage = () => {
    discardOrderChanges();
    handleClose();
  };
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={x}
        onClose={handleClose}
      >
        <Fade in={x}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title">U WANNA DELETE EVERYTHING BOI?</h2>
            <br />
            <button onClick={clearButStayOnPage} style={{ color: "black" }}>
              CONFIRM DELETION BUT STAY ON THE PAGE
            </button>
            <br />
            <br />
            <button onClick={discardorderChanges} style={{ color: "black" }}>
              CONFIRM DELETION BUT LEAVE PAGE
            </button>
            <br />
            <br />
            <button onClick={handleClose} style={{ color: "black" }}>
              CANCEL DELETION BUT KEEP EDITING
            </button>
            <br />
            <br />
            <button onClick={SaveButGoToFullMap} style={{ color: "black" }}>
              CANCEL DELETION BUT GO TO FULLMAP
            </button>
            <br />
            <br />
            but felipe what if
            <br /> i wanna keep the changes and go to the full map???? btw
            everything is automatically saved when you go to fullmap disconnect
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  discardOrderChanges: () => dispatch(discardOrderChanges()),
  ordersSocketOff: () => dispatch(ordersSocketOff()),
});

export default connect(null, mapDispatchToProps)(ArrowModalButton);
