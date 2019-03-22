import React from "react";
import { observer, inject, Provider } from "mobx-react";
import Icon from "@material-ui/core/Icon";
import classNames from "classnames";

import "./carousel.css";

const CarouselView = inject("carouselStore")(
  observer(
    class Carousel extends React.Component {
      constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleActionToggle = this.handleActionToggle.bind(this);
      }

      componentDidMount() {
        this.props.carouselStore.startSlideshow();
      }

      componentWillUnmount() {
        this.props.carouselStore.stopSlideshow();
      }

      render() {
        const { carouselStore } = this.props;
        return (
          <div
            className={`main-image-area`}
            onKeyDown={this.handleKeyDown}
            fo
            tabIndex={0}
          >
            <div className={"main-image-frame"}>
              <img
                className={"main-image"}
                src={carouselStore.selectedImage.image}
              />
            </div>
            <div className={"steppers"}>
              <div
                className={"stepper-pane previous-pane"}
                onClick={carouselStore.stepLeft}
              >
                <Icon className={"icon fas fa-chevron-left"} />
              </div>
              <div
                className={"stepper-pane action-pane"}
                onClick={this.handleActionToggle}
              >
                {carouselStore.isRunning ? (
                  <Icon className={"icon fas fa-pause"} />
                ) : (
                  <Icon className={"icon fas fa-play"} />
                )}
              </div>
              <div
                className={"stepper-pane next-pane"}
                onClick={carouselStore.stepRight}
              >
                <Icon className={"icon fas fa-chevron-right"} />
              </div>
            </div>
          </div>
        );
      }

      handleActionToggle() {
        const { carouselStore } = this.props;
        if (carouselStore.isRunning) carouselStore.stopSlideshow();
        else carouselStore.startSlideshow();
      }

      handleKeyDown(event) {
        const left = 37;
        const right = 39;
        const key = event.which;

        if (key === left) {
          this.props.carouselStore.stepLeft();
        } else if (key === right) {
          this.props.carouselStore.stepRight();
        }
      }
    }
  )
);

export default CarouselView;
