import React from "react";
import { observer, inject, Provider } from "mobx-react";
import Icon from "@material-ui/core/Icon";
import classNames from "classnames";

import "./carousel.css";

const CarouselView = inject("carouselStore")(
  observer(
    class Carousel extends React.Component {
        constructor(props){
            super(props);
            this.handleKeyDown = this.handleKeyDown.bind(this);
        }

      componentDidMount() {
        this.props.carouselStore.startSlideshow();
      }

      render() {
        //var Animation = React.addons.CSSTransitionGroup;
        const { carouselStore } = this.props;
        return (
              <div
                className={`main-image-area`}
                onMouseEnter={carouselStore.stopSlideshow}
                onMouseLeave={carouselStore.startSlideshow}
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
                    className={"stepper-pane next-pane"}
                    onClick={carouselStore.stepRight}
                  >
                    <Icon className={"icon fas fa-chevron-right"} />
                  </div>
                </div>
              </div>
        );
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
