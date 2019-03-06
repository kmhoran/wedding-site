import React from "react";
import WebBar from "../../menuBars/webBar";
import MobileBar from "../../menuBars/mobileBar";
import Footer from "../footer";

import { Carousel } from "react-responsive-carousel";

import "./carousel.min.css";
import "./photoPage.css";

import { gallarySet } from "../../../constants/photos";

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
              {gallarySet.map((item, index, arr) => (
                <div>
                  <img src={gallarySet[index].image} />
                  <p className="legend">{gallarySet[index].label}</p>
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
