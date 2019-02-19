import React, { Component } from "react";
import MobileBar from "../../menuBars/mobileBar";
import WebBar from "../../menuBars/webBar";
import EventOverview from "../theWedding/eventOverview";
import StoryCell from "../ourStory/storyCell";
import ViewCell from "../viewCell";
import Hero from "../../hero";
import PhotoBar from '../photos/photoBar';
import Footer from '../footer';

import "./index.css";

class Home extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
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
        <ViewCell height="60" />
        <PhotoBar/>
        <Footer/>
      </div>
    );
  }
}

export default Home;
