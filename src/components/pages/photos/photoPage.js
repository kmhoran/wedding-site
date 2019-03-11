import React from "react";
import WebBar from "../../menuBars/webBar";
import MobileBar from "../../menuBars/mobileBar";
import Footer from "../footer";

//import { Carousel } from "react-responsive-carousel";
import Carousel from './carousel/carousel'
import "./carousel.min.css";
import "./photoPage.css";

import { gallarySet } from "../../../constants/photos";

var carouselImages = [
	'http://placekitten.com/g/600/400',
	'http://placebear.com/600/400',
	'http://placehold.it/600x400'
];


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
            {/* <Carousel infiniteLoop useKeyboardArrows autoPlay>
              {gallarySet.map((item, index, arr) => (
                <div>
                  <img src={gallarySet[index].image} />
                  <p className="legend">{gallarySet[index].label}</p>
                </div>
              ))}
            </Carousel> */}
            <Carousel images={carouselImages }/>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default PhotoCarousel;
