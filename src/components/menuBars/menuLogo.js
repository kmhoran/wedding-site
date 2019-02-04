import React from "react";
import { Link } from "react-router-dom";
import "./menuLogo.css";
import logo from "../../logo.png";


const MenuLogo = props => {
const {color} = props;
const textClass = color && color.toLowerCase() == 'light' ?  "menu-logo-text light" : "menu-logo-text";
  return (
      <Link to="/" className="menu-logo">
        <img src={logo} className="menu-logo-img" alt="" />
        <div className={textClass}>Katie & Kevin</div>
      </Link>
  );
};

export default MenuLogo;
