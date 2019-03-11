import React from "react";
import { Link } from "react-router-dom";
import IntersectionVisible from "react-intersection-visible";

import "./storyCell.css";
import { Button } from "@material-ui/core";
import photos from '../../../constants/photos';
import routes from '../../../constants/routes'


class StoryCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.setState({
      imagePaneClass: 'image-pane',
      contentClass: "content-pane"
    });
  }

  onShow(e) {
    this.setState({
      imagePaneClass: 'image-pane visible',
      contentClass: "content-pane visible"

    });
  }

  ImagePane = props => {
    return (
      <div className={`${this.state.imagePaneClass}`}>
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
  render() {
    return (
      <IntersectionVisible className="story-cell-frame" onShow={e => this.onShow(e)}>
          <div
            className={this.state.contentClass}
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
            <Link to={routes.OurStory}>
            <Button variant="contained" color="secondary">Read More</Button>
            </Link>
          </div>
          <this.ImagePane
            
            src={[photos.paris, photos.lille]}
          />
      </IntersectionVisible>
    );
  }
}

export default StoryCell;
