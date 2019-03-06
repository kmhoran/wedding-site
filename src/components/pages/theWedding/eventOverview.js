import React from "react";
import Button from "@material-ui/core/Button";
import RsvpDialog from "../../rsvp";

import "./eventOverview.css";

const EventSiteCard = props => {
  return (
    <div className="event-site">
      <div className="event-name">{props.eventName}</div>
      {/* <Button>Get Directions</Button> */}
      <div className="event-site-title">{props.siteTitle}</div>
      <div className="event-site-address  info-line">
        <i class="fas fa-map-marker-alt info-line-icon" />
        <div className="info-line-content">{props.address}</div>
      </div>
      <div className="event-site-time  info-line">
        <i class="far fa-clock" />
        <div className="info-line-content">{props.time}</div>
      </div>
    </div>
  );
};

const EventOverview = props => {
  return (
    <div id="the-wedding-event-overview-frame">
      <h2>Save the Date</h2>
      <RsvpDialog>
        <Button variant="contained" color="primary">
          RSVP Now
        </Button>
      </RsvpDialog>
      <div className="info-line event-date">
        <i class="far fa-calendar-alt info-line-icon" />
        <div className="info-line-content">May 30, 2020</div>
      </div>
      <EventSiteCard
        eventName="Ceremony"
        siteTitle="St. Louis Catholic Church"
        address="29 E 8th St, Cincinnati, OH 45202"
        time="4:45 pm"
      />
      <EventSiteCard
        eventName="Reception"
        siteTitle="The Cincinnati Club"
        address="4300, 30 Garfield Pl, Cincinnati, OH 45202"
        time="5:45 pm"
      />
    </div>
  );
};

export default EventOverview;
