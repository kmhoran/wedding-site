import React from "react";
import { Link } from "react-router-dom";
import IntersectionVisible from "react-intersection-visible";

import "./storyCell.css";
import { Button } from "@material-ui/core";

const ImagePane = props => {
  if (!props.clazzes) props.clazzes = [];
  props.clazzes.push("image-pane");
  return (
    <div className={props.clazzes.join(" ")}>
      {props.src.map(path => {
        return (
          <div className="image-frame">
            <img className="image" src={path} />
          </div>
        );
      })}
    </div>
  );
};

class StoryCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.setState({
      presentationClasses: []
    });
  }

  onShow(e) {
    this.setState({
      presentationClasses: ["visible"]
    });
  }

  // onHide(e){
  //   console.log("hidden");
  // }

  // onIntersect(e){
  //   console.log("intersected!")
  // }
  render() {
    if (!this.state.presentationClasses)
      return <div>{JSON.stringify(this.state)}</div>;
    console.log("presentationClasses: ", this.state.presentationClasses);
    return (
      <IntersectionVisible className="container" onShow={e => this.onShow(e)}>
        <div className="story-cell-frame">
          <ImagePane
            clazzes={this.state.presentationClasses.concat(["mobile"])}
            src={["./assets/images/eiffel.jpg", "./assets/images/lille.jpg"]}
          />
          <div
            className={this.state.presentationClasses
              .concat(["content-pane"])
              .join(" ")}
          >
            <div className="content-heading">Romance in the North of France</div>
            <div className="content-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </div>
            <Link to="/our-story">
            <Button variant="contained" color="secondary">Read More</Button>
            </Link>
          </div>
          <ImagePane
            clazzes={this.state.presentationClasses.concat(["web"])}
            src={["./assets/images/eiffel.jpg", "./assets/images/lille.jpg"]}
          />
        </div>
      </IntersectionVisible>
    );
  }
}

export default StoryCell;
