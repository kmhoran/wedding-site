import React, { Component } from "react";
import { observer, inject, Provider } from "mobx-react";
import MobileBar from "../../menuBars/mobileBar";
import WebBar from "../../menuBars/webBar";
import EventOverview from "../theWedding/eventOverview";
import StoryCell from "../ourStory/storyCell";
import ViewCell from "../viewCell";
import Hero from "../../hero";
import LocationTileBar from './locationTile';
import PhotoBar from "../photos/photoBar";
import Footer from "../footer";

import "./index.css";

const HomeView = inject("photobarStore")(
  observer(
    class Home extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    console.log('mounted');
    this.props.photobarStore.activate();
  }
  componentWillUnmount() {
    this.props.photobarStore.deactivate();
  }

  render() {
    const {photobarStore} = this.props; 
    return (
      <div className="App">
        <MobileBar />
        <Hero imageSrc="./assets/images/hero.jpg" text="Katie & Kevin 2020" />
        <WebBar />
        <ViewCell height="69">
          <EventOverview />
        </ViewCell>
        <ViewCell height="70">
          <StoryCell />
        </ViewCell>
        <LocationTileBar/>
        <PhotoBar images={photobarStore.images} loaded={photobarStore.loaded} />
        <Footer />
      </div>
    );
  }
}
  )
);

export default HomeView;
