import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const theme = createMuiTheme({
  palette: {
    primary: {
      //main: "#f06292",
      //main: "#aed581" --> green
      main: "#000"
    },
    secondary: {
      // main: "#5b6b90",
      //main: "#5b6b90", --> navy
      main: "#960709"
    },
    contrastThreshold: 3
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
