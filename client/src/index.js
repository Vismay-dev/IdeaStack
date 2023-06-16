import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AutoLogoutTimer from "./AutologoutTimer";

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

ReactDOM.render(
  <BrowserRouter>
    <AutoLogoutTimer ComposedClass={App} />
  </BrowserRouter>,
  document.getElementById("root")
);
