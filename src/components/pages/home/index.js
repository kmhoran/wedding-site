import React, { Component } from "react";
import { observer, inject, Provider } from "mobx-react";
import MobileBar from "../../menuBars/mobileBar";
import WebBar from "../../menuBars/webBar";
import EventOverview from "../theWedding/eventOverview";
import StoryCell from "../ourStory/storyCell";
import ViewCell from "../viewCell";
import Hero from "../../hero";
import LocationTileBar from "./locationTile";
import PhotoBar from "../photos/photoBar";
import Footer from "../footer";
import photos from "../../../constants/photos";

import "./index.css";

class Home extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className={"App"}>
        <MobileBar />
        <Hero imageSrc={photos.weddingHero} text={"Katie & Kevin 2020"} />
        <WebBar />
        <EventOverview />
        <StoryCell />
        <LocationTileBar />
        <PhotoBar />
        <Footer />
      </div>
    );
  }
}

export default Home;
