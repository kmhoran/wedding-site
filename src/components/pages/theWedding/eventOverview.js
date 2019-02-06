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
        <Button variant="contained" color="secondary">
          RSVP Now
        </Button>
      </RsvpDialog>
      <div className="info-line event-date">
        <i class="far fa-calendar-alt info-line-icon" />
        <div className="info-line-content">May 30, 2020</div>
      </div>
      <EventSiteCard
        eventName="Ceremony"
        siteTitle="Old St. Mary's Catholic Church"
        address="3155 Sherilyn Ln, Cincinnatti, OH, 45103, USA"
        time="2:00 pm"
      />
      <EventSiteCard
        eventName="Reception"
        siteTitle="Music Hall, Cincinnatti"
        address="3155 Sherilyn Ln, Cincinnatti, OH, 45103, USA"
        time="5:00 pm"
      />
    </div>
  );
};

export default EventOverview;
