import React from "react";
import { Link } from "react-router-dom";
import "./webBar.css";
import MenuLogo from "./menuLogo";

import { menuItems } from "./menuContents";

const renderItem = items => {
  if (!items) return;
  const menuArray = [];
  items.forEach(item => {
    menuArray.push(
      <li className="web-bar-item">
        <Link className="link" to={item.url}>
          {item.displayName}
        </Link>
      </li>
    );
  });
  return menuArray;
};

// ## TODO: Check out Dollar Shave club's stickybits module to detect when the app bar is stuck to top of page

const WebBar = props => {
  return (
    <div id="web-bar-frame">
      <MenuLogo />
      <ul className="web-bar-list">
        {renderItem(menuItems)}
      </ul>
    </div>
  );
};

export default WebBar;
