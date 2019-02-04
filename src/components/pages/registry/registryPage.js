import React from "react";
import WebBar from "../../menuBars/webBar";
import MobileBar from "../../menuBars/mobileBar";
import Hero from "../../hero";
import RegistryCard from "./registryCard";
import "./registryPage.css";
import { items } from "./regiser";

import Footer from '../footer';

class RegistryPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="registry-page-frame">
        <MobileBar />
        <WebBar />
        <Hero imageSrc="./assets/images/roses.jpeg" text="Registry" />
        <h1>Register</h1>
        <div className="card-frame">
          {items.map(item => {
            return <RegistryCard item={item} />;
          })}
        </div>
        <Footer/>
      </div>
    );
  }
}

export default RegistryPage;
