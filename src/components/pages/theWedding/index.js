import React from "react";

import EventOverview from "./eventOverview";
import AreaMap from "./areaMap";

import "./index.css";

// Wedding Page [https://medmen.com/stores]
// +---------------+------------+
// |               |            |
// | * event       |  Grey Map  |
// |   overview    |  with Pins |
// | * party       |            |
// |   members     |  [link to  |
// | * scroll is   |   venu     |
// |   cool        |   pages]   |
// |               |            |
// +---------------+------------+

// Venu Page [https://medmen.com/stores/venice-beach-abbot-kinney]
// +-------------+--------------+
// |             |   Venu       |
// | * venu      |   Image      |
// |    contact  |              |
// |    info     +--------------+
// |             |              |
// | * time      |   Google     |
// |             |   Map        |
// |             |              |
// +-------------+--------------+

const TheWedding = props => {
  return (
    <div id="the-wedding-frame">
      <div className="the-wedding-pane">
        <EventOverview />
      </div>
      <div className="the-wedding-pane">
        <AreaMap />
      </div>
    </div>
  );
};

export default TheWedding;
