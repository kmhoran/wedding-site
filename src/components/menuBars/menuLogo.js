import React from "react";
import { Link } from "react-router-dom";
import "./menuLogo.css";
import logo from "../../logo.png";

const MenuLogo = props => {
  const { color, short } = props;
  const lightClass = color && color.toLowerCase() == "light" ? "light" : "";
  const shortClass = short ? "short" : "";
  const menuClass = ["menu-logo", lightClass, shortClass].join(" ");

  return (
    <Link to="/" className={menuClass}>
      <img src={logo} className="menu-logo-img" alt="" />
      <div className={"menu-logo-text"}>Katie & Kevin</div>
    </Link>
  );
};

export default MenuLogo;
