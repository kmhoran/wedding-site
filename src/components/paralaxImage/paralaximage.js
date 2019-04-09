import React from "react";

import "./paralaxImage.css";

const path =
  "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";

const ParalaxImage = props => {
  return (
    // <div className={"wrapper"}>
    //   <div className={"paralax"}>
    //     <div className={"content-container"}>
    //       <div className={"content"}>{props.children}</div>
    //     </div>
    //   </div>
    // </div>
    <div class="MainContainer">
      <div class="ParallaxContainer">
        <h1>Aloha!</h1>
      </div>
    </div>
  );
};
export default ParalaxImage;
