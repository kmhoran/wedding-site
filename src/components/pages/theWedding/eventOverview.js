import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import RsvpDialog from "../../rsvp";
import { ceremony, reception } from "./venueInfo";
import "./eventOverview.css";
import WhenAndWhere from "./whenAndWhere";

const EventSiteCard = props => {
  return (
    <div className="event-site">
      <div className="event-name">{props.eventName}</div>
      {/* <Button>Get Directions</Button> */}
      <div className="event-site-title">{props.siteTitle}</div>
      <WhenAndWhere when={props.time} where={props.address} />
      <Link to={props.to}>
        <Button variant="contained" color="secondary">
          Find Out More
        </Button>
      </Link>
    </div>
  );
};

const EventOverview = props => {
  return (
    <div id="the-wedding-event-overview-frame">
      <h2>Save the Date</h2>
      <RsvpDialog>
        <Button variant="outlined" color="primary">
          RSVP Now
        </Button>
      </RsvpDialog>
      <div className="info-line event-date">
        <i className="far fa-calendar-alt info-line-icon" />
        <div className="info-line-content">May 30, 2020</div>
      </div>
      <EventSiteCard
        eventName="Ceremony"
        siteTitle={ceremony.fullTitle || ceremony.title}
        address={ceremony.address}
        time={ceremony.time}
        to={ceremony.to}
      />
      <EventSiteCard
        eventName="Reception"
        siteTitle={reception.fullTitle || reception.title}
        address={reception.address}
        time={reception.time}
        to={reception.to}
      />
    </div>
  );
};

export default EventOverview;
