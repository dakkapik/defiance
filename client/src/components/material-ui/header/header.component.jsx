import React from "react";
import "./header.styles.scss";
import img from "./logo.png";
const Header = () => {
  return (
    <div className="header">
      <img className="header__img" src={img} />
    </div>
  );
};

export default Header;
