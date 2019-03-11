import React from "react";
import { Link } from "react-router-dom";
import { observer, inject, Provider } from "mobx-react";
import "./photoBar.css";
import routes from "../../../constants/routes";

const PhotoBarView = inject("photobarStore")(
  observer(
    class PhotoBar extends React.Component {
    componentDidMount(){
      this.props.photobarStore.activate();
    }
    componentWillUnmount() {
      this.props.photobarStore.deactivate();
    }
  render() {
    const { photobarStore } = this.props;

    if (! photobarStore.loaded) return <div />;
    return (
      <div className="photo-bar-frame">
        <div className="cell-duo">
          <div className="bar-cell">
            <Link to={routes.Photos}>
              <img
              style={ photobarStore.jsImages[0].a.barAdjustment}
                src={ photobarStore.jsImages[0].a.image}
                className={`bar-image ${
                  photobarStore.jsImages[0].showA ? "" : "hidden"
                }`}
              />
              <img
              style={ photobarStore.jsImages[0].b.barAdjustment}
                src={ photobarStore.jsImages[0].b.image}
                className={`bar-image ${
                  ! photobarStore.jsImages[0].showA ? "" : "hidden"
                }`}
              />
            </Link>
          </div>
          <div className="bar-cell">
            <Link to={routes.Photos}>
              <img
                style={ photobarStore.jsImages[1].a.barAdjustment}
                src={ photobarStore.jsImages[1].a.image}
                className={`bar-image ${
                  photobarStore.jsImages[1].showA ? "" : "hidden"
                }`}
              />
              <img
                style={ photobarStore.jsImages[1].b.barAdjustment}
                src={ photobarStore.jsImages[1].b.image}
                className={`bar-image ${
                  ! photobarStore.jsImages[1].showA ? "" : "hidden"
                }`}
              />
            </Link>
          </div>
        </div>
        <div className="cell-duo">
          <div className="bar-cell">
            <Link to={routes.Photos}>
              <img
                style={ photobarStore.jsImages[2].a.barAdjustment}
                src={ photobarStore.jsImages[2].a.image}
                className={`bar-image ${
                  photobarStore.jsImages[2].showA ? "" : "hidden"
                }`}
              />
              <img
                style={ photobarStore.jsImages[2].b.barAdjustment}
                src={ photobarStore.jsImages[2].b.image}
                className={`bar-image ${
                  ! photobarStore.jsImages[2].showA ? "" : "hidden"
                }`}
              />
            </Link>
          </div>
          <div className="bar-cell">
            <Link to={routes.Photos}>
              <img
                style={ photobarStore.jsImages[3].a.barAdjustment}
                src={ photobarStore.jsImages[3].a.image}
                className={`bar-image ${
                  photobarStore.jsImages[3].showA ? "" : "hidden"
                }`}
              />
              <img
                style={ photobarStore.jsImages[3].b.barAdjustment}
                src={ photobarStore.jsImages[3].b.image}
                className={`bar-image ${
                  ! photobarStore.jsImages[3].showA ? "" : "hidden"
                }`}
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}  )
);

export default PhotoBarView;
