import React, { Component } from "react";
import PropTypes from "prop-types";
import LazyHero from "react-lazy-hero";
import MobileBar from "../menuBars/mobileBar";
import WebBar from "../menuBars/webBar";

import "./index.css";

class Hero extends Component {
  constructor(props) {
    super(props);
    this.state = { popUp: false };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        popUp: true
      });
    }, 250);
  }

  render() {
    if (!this.state) return <div />;
    const { popUp } = this.state;
    return (
      <LazyHero
        color="#000000"
        isCentered={true}
        isFixed={false}
        opacity={0.2}
        parallaxOffset={100}
        transitionDuration={500}
        minHeight={this.props.height || "75vh"}
        transitionTimingFunction="ease-in-out"
        imageSrc={this.props.imageSrc}
      >
        <div className={popUp ? "hero-card active" : "hero-card"}>
          <h1 id="hero-card-title">{this.props.text}</h1>
        </div>
      </LazyHero>
    );
  }
}

Hero.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default Hero;
