import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

window.alert = msg => {
  console.log(msg);
};
window.matchMedia = () => ({});
window.scrollTo = () => {};

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
