import React from "react";
import WebBar from "../../menuBars/webBar";
import MobileBar from "../../menuBars/mobileBar";
import Footer from "../footer";

import { Carousel } from "react-responsive-carousel";

import "./carousel.min.css";
import "./photoPage.css";

import imageSet from './imageSet'

class PhotoCarousel extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="photo-page-frame">
        <MobileBar />
        <WebBar />
        <div>
        <div className="carrousel-frame">
          <Carousel infiniteLoop useKeyboardArrows autoPlay>
              {imageSet.map((item, index, arr) => (
                <div>
              <img src={imageSet[index].image} />
              <p className="legend">{imageSet[index].label}</p>
            </div>
              ))}
          </Carousel>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default PhotoCarousel;
