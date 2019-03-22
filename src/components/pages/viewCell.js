import React from "react";
import "./viewCell.css";

const ViewCell = props => {
  return (
    <div className="view-cell" style={{ height: props.height + "vh" }}>
      {props.children}
    </div>
  );
};

export default ViewCell;
