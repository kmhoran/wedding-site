import React from "react";
import { Link } from "react-router-dom";
import { menuItems } from "../menuBars/menuContents";
import MenuLogo from "../menuBars/menuLogo";

import "./footer.css";

const Footer = props => {
  return (
    <div className="footer-frame">
      <div className="footer-details">
        <div className="footer-detail-pane footer-logo">
          <MenuLogo color="LIGHT" className="logo" />
        </div>
        <div className="footer-detail-pane footer-info">
          <div className="footer-detail-pane footer-links">
            {menuItems.map(i => {
              return (
                <div className="footer-link-item">
                  <Link to={i.url}>{i.displayName}</Link>
                </div>
              );
            })}
          </div>
          <div className="footer-copyright">Copyright 2019</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
