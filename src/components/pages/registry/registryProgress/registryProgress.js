import React from "react";

import "./registryProgress.css";

function RegistryProgress(props) {
  const { item } = props;
  return (
    <div className={'registry-progress'}>
      {item.fundraiserGoal && item.fundraiserTotal && (
        <div className={'fundraiser'}>
          <span className={'red'}>${item.fundraiserTotal}</span> of{" "}
          <span className={'red'}>${item.fundraiserGoal}</span> raised
        </div>
      )}

      {item.countDesired != null && item.countReceived != null && (
        <div className={'count-desired'}>
          <div className={'count-desired-text'}>
            Desired: {item.countDesired}
          </div>
          <div className={'count-desired-text'}>
            Received: {item.countReceived}
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistryProgress;
