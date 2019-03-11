import React from "react";

import './whenAndWhere.css'

function WhenAndWhere(props) {
    if(!(props.when && props.where)) return (<div/>)
    const{when, where} = props;
  return (
    <div>
      <div className="wnw-where info-line">
        <i class="fas fa-map-marker-alt info-line-icon" />
        <div className="wnw-content">{where}</div>
      </div>
      <div className="wnw-when info-line">
        <i class="far fa-clock" />
        <div className="wnw-content">{when}</div>
      </div>
    </div>
  );
}

export default WhenAndWhere;