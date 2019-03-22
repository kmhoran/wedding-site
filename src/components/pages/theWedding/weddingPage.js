import React from "react";
import TheWedding from ".";
import WebBar from "../../menuBars/webBar";
import MobileBar from "../../menuBars/mobileBar";

import "./weddingPage.css";

class WeddingPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="wedding-page">
        <MobileBar />
        <WebBar />
        <TheWedding />
      </div>
    );
  }
}

export default WeddingPage;
