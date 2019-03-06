import React from "react";
import WebBar from "../../menuBars/webBar";
import MobileBar from "../../menuBars/mobileBar";
import Hero from "../../hero";
import ViewCell from "../viewCell";
import Footer from '../footer';
import photos from '../../../constants/photos'

import "./cincinnatiPage.css";

class CincinnatiPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <MobileBar />
        <WebBar />
        <Hero
          imageSrc={photos.cincyHero}
          text="Cincinnati: the Queen City"
          height="100vh"
        />
        <ViewCell height="100">
          <h1>Where to stay</h1>
        </ViewCell>
        <ViewCell height="80">
          <h1>What to do</h1>
        </ViewCell>
        <Footer/>
      </div>
    );
  }
}

export default CincinnatiPage;
