import React from "react";
import "./photoBar.css";

const imageSet = [
  "https://images.pexels.com/photos/942317/pexels-photo-942317.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "https://images.pexels.com/photos/1338789/pexels-photo-1338789.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "https://images.pexels.com/photos/1563286/pexels-photo-1563286.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "https://images.pexels.com/photos/1317844/pexels-photo-1317844.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/1831536/pexels-photo-1831536.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/808465/pexels-photo-808465.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
];

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
          a: this.state.imageSet[0],
          b: null,
          showA: true,
          onDisplay: 0
        },
        1: {
          a: this.state.imageSet[1],
          b: null,
          showA: true,
          onDisplay: 1
        },
        2: {
          a: this.state.imageSet[2],
          b: null,
          showA: true,
          onDisplay: 3
        },
        3: {
          a: this.state.imageSet[3],
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
        b: imageSet[nextIndex],
        onDisplay: nextIndex
      };
    } else {
      images[nextToUpdateId] = {
        b: images[nextToUpdateId].b,
        showA: true,
        a: imageSet[nextIndex],
        onDisplay: nextIndex
      };
    }
    const newOndisplay = onDisplay.filter(x => {
      return x !== removedFromView;
    });
    newOndisplay.push(nextIndex);

    this.setState({ images: images, onDisplay: newOndisplay });
    console.log(this.state);
  }
  render() {
    const { loaded, images } = this.state;
    if (!loaded) return <div />;
    return (
      <div className="photo-bar-frame">
        <div className="cell-duo">
          <div className="bar-cell">
            <img
              src={images[0].a}
              className={`bar-image ${images[0].showA ? "" : "hidden"}`}
            />
            <img
              src={images[0].b}
              className={`bar-image ${!images[0].showA ? "" : "hidden"}`}
            />
          </div>
          <div className="bar-cell">
            <img
              src={images[1].a}
              className={`bar-image ${images[1].showA ? "" : "hidden"}`}
            />
            <img
              src={images[1].b}
              className={`bar-image ${!images[1].showA ? "" : "hidden"}`}
            />
          </div>
        </div>
        <div className="cell-duo">
          <div className="bar-cell">
            <img
              src={images[2].a}
              className={`bar-image ${images[2].showA ? "" : "hidden"}`}
            />
            <img
              src={images[2].b}
              className={`bar-image ${!images[2].showA ? "" : "hidden"}`}
            />
          </div>
          <div className="bar-cell">
            <img
              src={images[3].a}
              className={`bar-image ${images[3].showA ? "" : "hidden"}`}
            />
            <img
              src={images[3].b}
              className={`bar-image ${!images[3].showA ? "" : "hidden"}`}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PhotoBar;
