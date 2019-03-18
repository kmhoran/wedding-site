import React from "react";
import WebBar from "../../../menuBars/webBar";
import MobileBar from "../../../menuBars/mobileBar";
import Hero from "../../../hero";
import RegistryCard from "../registryCard/registryCard";
import "./registryPage.css";
import { items } from "../regiser";

import Footer from '../../footer';
import photos from '../../../../constants/photos';

class RegistryPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="registry-page-frame">
        <MobileBar />
        <WebBar />
        <Hero imageSrc={photos.rosesHero} height="50vh" text="Registry" />
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
