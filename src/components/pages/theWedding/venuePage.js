import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import WebBar from "../../menuBars/webBar";
import MobileBar from "../../menuBars/mobileBar";
import venuInfo from "./venueInfo";
import { ceremony, reception } from "./venueInfo";
import routes from "../../../constants/routes";
import AreaMap from "./areaMap";
import WhenAndWhere from "./whenAndWhere";
import Footer from "../footer";

import "./venuePage.css";

class VenuePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      venue: null,
      loaded: false
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    const venue = venuInfo[this.props.match.params.id];
    if (!venue) this.props.history.push(routes.Home);
    this.setState({
      loaded: true,
      venue
    });
  }
  componentWillReceiveProps(nextProps) {
    window.scrollTo(0, 0);
    const venue = venuInfo[nextProps.match.params.id];
    if (!venue) this.props.history.push(routes.Home);
    this.setState({
      loaded: true,
      venue
    });
  }
  render() {
    const { venue, loaded } = this.state;
    if (!venue) return <div />;
    const isCeremonyPage = venue.id === ceremony.id;
    return (
      <div className="venue-page">
        <MobileBar />
        <WebBar />
        <div className="venue-content">
          <div className="venue-pane venue-detail">
            <div className="venue-title">{venue.fullTitle || venue.title}</div>
            <WhenAndWhere when={venue.time} where={venue.address} />
            <div className={"venue-description"}>
              {venue.description.split("\n").map((i, key) => {
                return (
                  <div key={key} className={"description-paragraph"}>
                    {i}
                  </div>
                );
              })}
            </div>
            <div className={"action-buttons"}>
              <Link to={isCeremonyPage ? reception.to : ceremony.id}>
                <Button color={"secondary"} variant="contained">
                  {isCeremonyPage ? "Preview Reception" : "Preview Ceremony"}
                </Button>
              </Link>
            </div>
          </div>
          <div className="venue-pane images">
            <div className={`venue-image-pane image ${venue.id}`}>
              <img className={"venue-image"} src={venue.image} />
            </div>
            <div className={"venue-image-pane map"}>
              <AreaMap />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default VenuePage;
