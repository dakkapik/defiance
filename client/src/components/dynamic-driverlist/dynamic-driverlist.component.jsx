import React from "react";
import "./dynamic-driverlist.styles.scss";
import DynamicDriver from "../dynamic-driver/dynamic-driver.componet";
import { connect } from "react-redux";

const DynamicDriverList = ({ Activedriver }) => {
  return (
    <div className="side-bar">
      {Activedriver.map((element, index) => (
        <DynamicDriver key={index} userinfo={element} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  Activedriver: state.drivers.currentDrivers,
});

export default connect(mapStateToProps, null)(DynamicDriverList);
