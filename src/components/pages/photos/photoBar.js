import React from "react";
import { Link } from "react-router-dom";
// import imageSet from "./imageSet";
import { gallarySet } from "../../../constants/photos";
import "./photoBar.css";
import routes from "../../../constants/routes";

const imageSet = gallarySet;

class PhotoBar extends React.Component {

  render() {
    if (!this.props.loaded) return <div />;
    return (
      <div className="photo-bar-frame">
        <div className="cell-duo">
          <div className="bar-cell">
            <Link to={routes.Photos}>
              <img
              style={this.props.images[0].a.barAdjustment}
                src={this.props.images[0].a.image}
                className={`bar-image ${
                  this.props.images[0].showA ? "" : "hidden"
                }`}
              />
              <img
              style={this.props.images[0].b.barAdjustment}
                src={this.props.images[0].b.image}
                className={`bar-image ${
                  !this.props.images[0].showA ? "" : "hidden"
                }`}
              />
            </Link>
          </div>
          <div className="bar-cell">
            <Link to={routes.Photos}>
              <img
                style={this.props.images[1].a.barAdjustment}
                src={this.props.images[1].a.image}
                className={`bar-image ${
                  this.props.images[1].showA ? "" : "hidden"
                }`}
              />
              <img
                style={this.props.images[1].b.barAdjustment}
                src={this.props.images[1].b.image}
                className={`bar-image ${
                  !this.props.images[1].showA ? "" : "hidden"
                }`}
              />
            </Link>
          </div>
        </div>
        <div className="cell-duo">
          <div className="bar-cell">
            <Link to={routes.Photos}>
              <img
                style={this.props.images[2].a.barAdjustment}
                src={this.props.images[2].a.image}
                className={`bar-image ${
                  this.props.images[2].showA ? "" : "hidden"
                }`}
              />
              <img
                style={this.props.images[2].b.barAdjustment}
                src={this.props.images[2].b.image}
                className={`bar-image ${
                  !this.props.images[2].showA ? "" : "hidden"
                }`}
              />
            </Link>
          </div>
          <div className="bar-cell">
            <Link to={routes.Photos}>
              <img
                style={this.props.images[3].a.barAdjustment}
                src={this.props.images[3].a.image}
                className={`bar-image ${
                  this.props.images[3].showA ? "" : "hidden"
                }`}
              />
              <img
                style={this.props.images[3].b.barAdjustment}
                src={this.props.images[3].b.image}
                className={`bar-image ${
                  !this.props.images[3].showA ? "" : "hidden"
                }`}
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default PhotoBar;
