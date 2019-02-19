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
      main: "#1a237e"
    },
    secondary: {
      // main: "#5b6b90",
      //main: "#5b6b90", --> navy
      main: "#c62828"
      
    },
    contrastThreshold: 3,
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();

// .colors{
//   /* primary */
//   color: #c2185b;
//   color: #fa5788;
//   color: #8c0032;
//   /* secondary */
//   color: #1a237e;
//   color: #534bae;
//   color: #000051;
// }