import React from "react";
import "./locationTile.css";
import photos from "../../../constants/photos";
import routes from "../../../constants/routes";
import { Link } from "react-router-dom";

const testImage =
  "https://farm8.staticflickr.com/7847/46566375834_6036ec7894_b.jpg";

const locations = [
  {
    key: "ceremony",
    messge: "St. Louis Church",
    button: "Preview the Ceremony",
    image: photos.stLouis,
    to: routes.Cincinnati
  },
  {
    key: "reception",
    messge: "The Cincinnati Club",
    button: "Preview the Reception",
    image: photos.cincinnatiClub,
    to: routes.Cincinnati
  },
  {
    key: "cincy",
    messge: "The Queen City",
    button: "Discover the Sights of Cincinnati",
    image: photos.cincy,
    to: routes.Cincinnati
  }
];

const LocationTile = props => {
  const { to, image, messageText, buttonText } = props;
  return (
    <Link className="tile-frame" to={to}>
      <div className={"tile-message"}>
        <div className="test-message-title">{messageText}</div>
        <div className="test-message-button">{buttonText}</div>
      </div>
      <img className={"tile-image"} src={image} />
    </Link>
  );
};

const LocationTileBar = props => {
  return (
    <div className="bar-frame">
      <div className="bar-content">
        {locations.map(l => (
          <LocationTile
            key={l.key}
            image={l.image}
            messageText={l.messge}
            buttonText={l.button}
            to={l.to}
          />
        ))}
      </div>
    </div>
  );
};

export default LocationTileBar;
