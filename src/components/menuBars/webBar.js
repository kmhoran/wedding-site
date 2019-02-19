import React from "react";
import { Link } from "react-router-dom";
import "./webBar.css";
import MenuLogo from "./menuLogo";
import RsvpDialog from "../rsvp";
import { menuItems } from "./menuContents";
import { Button } from "@material-ui/core";

const renderItem = items => {
  if (!items) return;
  const menuArray = [];
  items.forEach(item => {
    if (!item.rsvpDialog) {
      menuArray.push(
        <li className="web-bar-item">
          <Link className="link" to={item.url}>
            {item.displayName}
          </Link>
        </li>
      );
    } else {
      menuArray.push(
        <li className="web-bar-item">
          <RsvpDialog>
            <Button  variant="contained"  color={'secondary'}>{item.displayName}</Button>
          </RsvpDialog>
        </li>
      );
    }
  });
  return menuArray;
};

// ## TODO: Check out Dollar Shave club's stickybits module to detect when the app bar is stuck to top of page

const WebBar = props => {
  return (
    <div id="web-bar-frame">
      <MenuLogo />
      <ul className="web-bar-list">{renderItem(menuItems)}</ul>
    </div>
  );
};

export default WebBar;
