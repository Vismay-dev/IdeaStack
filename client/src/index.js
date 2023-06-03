import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AutoLogoutTimer from "./AutologoutTimer";

ReactDOM.render(
  <BrowserRouter>
    <AutoLogoutTimer ComposedClass={App} />
  </BrowserRouter>,
  document.getElementById("root")
);
