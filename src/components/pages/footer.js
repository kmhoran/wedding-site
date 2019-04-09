import React from "react";
import { Link } from "react-router-dom";
import { menuItems } from "../menuBars/menuContents";
import MenuLogo from "../menuBars/menuLogo";
import { observer, inject } from "mobx-react";

import "./footer.css";

const Footer = props => {
  const handleLogoClick = () => {
    if (!props.onLogoClick) return;
    props.onLogoClick();
  };
  return (
    <div className="footer-frame">
      <div className="footer-details">
        <div
          className="footer-detail-pane footer-logo"
          onClick={handleLogoClick}
        >
          <MenuLogo color="LIGHT" className="logo" />
        </div>
        <div className="footer-detail-pane footer-info">
          <div className="footer-detail-pane footer-links">
            {menuItems
              .filter(i => !i.mobileOnly)
              .filter(
                i =>
                  props.flagStore.isFeatureEnabled("registry") ||
                  i.displayName !== "Registry"
              )
              .map((i, index) => {
                return (
                  <div className="footer-link-item" key={index}>
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

const FooterView = inject("flagStore")(observer(Footer));

export default FooterView;
