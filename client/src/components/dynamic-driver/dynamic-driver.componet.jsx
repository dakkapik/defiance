import React from "react";
import "./dynamic-driver.styles.scss";
import MockImage from "./driver.jpg";
const DynamicDriver = ({ userinfo: { firstName, employeeId, lastName } }) => {
  return (
    <div className="sidecard">
      <img alt="mock" className="sidecard__avatar" src={MockImage} />
      <div className="sidecard__content">
        <div className="sidecard__content__name">
          {firstName} {lastName}
        </div>
        <div className="sidecard__content__sub">
          <div className="sidecard__content__sub__text">
            <div>
              Position:
              {/* id: {employeeId} */}
              {/* pos: {props.position ? props.position.coords.latitude : null} */}
            </div>

            <span>Lorem ipsum{/*props.position.timestamp*/}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicDriver;
