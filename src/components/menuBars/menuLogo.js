import React from "react";
import { Link } from "react-router-dom";
import "./menuLogo.css";
import logo from "../../logo.png";


const MenuLogo = props => {
const {color} = props;
const menuClass = color && color.toLowerCase() == 'light' ?  "menu-logo light" : "menu-logo";
  return (
      <Link to="/" className={menuClass}>
        <img src={logo} className="menu-logo-img" alt="" />
        <div className={'menu-logo-text'}>Katie & Kevin</div>
      </Link>
  );
};

export default MenuLogo;
