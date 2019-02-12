import React from "react";
import { Link } from "react-router-dom";
import imageSet from './imageSet';
import "./photoBar.css";
import routes from '../../../constants/routes'


class PhotoBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      images: {
        0: null,
        1: null,
        2: null,
        3: null
      },
      displayedIndexes: [],
      lastIndexSeen: null,
      imageSet: imageSet
    };
    this.runCarousel = this.runCarousel.bind(this);
  }

  componentDidMount() {
    this.setState({
      loaded: true,
      images: {
        0: {
          a: this.state.imageSet[0].image,
          b: null,
          showA: true,
          onDisplay: 0
        },
        1: {
          a: this.state.imageSet[1].image,
          b: null,
          showA: true,
          onDisplay: 1
        },
        2: {
          a: this.state.imageSet[2].image,
          b: null,
          showA: true,
          onDisplay: 3
        },
        3: {
          a: this.state.imageSet[3].image,
          b: null,
          showA: true,
          onDisplay: 3
        }
      },
      lastIndexSeen: 3,
      onDisplay: [0, 1, 2, 3]
    });
    setInterval(() => {
      this.runCarousel();
    }, 5000);
  }

  runCarousel() {
    const { imageSet, images, onDisplay } = this.state;
    let { lastIndexSeen } = this.state;
    const arrLength = imageSet.length;
    let nextIndex = (lastIndexSeen + 1) % arrLength;
    let nextToUpdateId;
    let confliftExists = false;
    do {
      // image is already displayed
      if (onDisplay.indexOf(nextIndex) >= 0) {
        confliftExists = true;
        nextIndex = (nextIndex + 1) % arrLength;
        continue;
      }
      // cell already contains image
      nextToUpdateId = Math.floor(Math.random() * 4);
      if (!images[nextToUpdateId]) {
        confliftExists = true;
        continue;
      }
      confliftExists = images[nextToUpdateId].onDisplay === nextIndex;
    } while (confliftExists);

    const removedFromView = images[nextToUpdateId].onDisplay;
    if (images[nextToUpdateId].showA) {
      images[nextToUpdateId] = {
        a: images[nextToUpdateId].a,
        showA: false,
        b: imageSet[nextIndex].image,
        onDisplay: nextIndex
      };
    } else {
      images[nextToUpdateId] = {
        b: images[nextToUpdateId].b,
        showA: true,
        a: imageSet[nextIndex].image,
        onDisplay: nextIndex
      };
    }
    const newOndisplay = onDisplay.filter(x => {
      return x !== removedFromView;
    });
    newOndisplay.push(nextIndex);

    this.setState({ images: images, onDisplay: newOndisplay });
  }
  render() {
    const { loaded, images } = this.state;
    if (!loaded) return <div />;
    return (
      <div className="photo-bar-frame">
        <div className="cell-duo">
          <div className="bar-cell">
          <Link to={routes.Photos}>
            <img
              src={images[0].a}
              className={`bar-image ${images[0].showA ? "" : "hidden"}`}
            />
            <img
              src={images[0].b}
              className={`bar-image ${!images[0].showA ? "" : "hidden"}`}
            />
            </Link>
          </div>
          <div className="bar-cell">
          <Link to={routes.Photos}>
            <img
              src={images[1].a}
              className={`bar-image ${images[1].showA ? "" : "hidden"}`}
            />
            <img
              src={images[1].b}
              className={`bar-image ${!images[1].showA ? "" : "hidden"}`}
            />
            </Link>
          </div>
        </div>
        <div className="cell-duo">
          <div className="bar-cell">
          <Link to={routes.Photos}>
            <img
              src={images[2].a}
              className={`bar-image ${images[2].showA ? "" : "hidden"}`}
            />
            <img
              src={images[2].b}
              className={`bar-image ${!images[2].showA ? "" : "hidden"}`}
            />
            </Link>
          </div>
          <div className="bar-cell">
          <Link to={routes.Photos}>
            <img
              src={images[3].a}
              className={`bar-image ${images[3].showA ? "" : "hidden"}`}
            />
            <img
              src={images[3].b}
              className={`bar-image ${!images[3].showA ? "" : "hidden"}`}
            />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default PhotoBar;
