import logo from "../NavMenu/logo.png";
import { useState, useEffect, useContext } from "react";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

import AOS from "aos";

import "aos/dist/aos.css";

import Mentors from "../Mentors/MentorsMain";
import NetworksMain from "./NetworksMain";

const Networks = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const history = useHistory();

  return (
    <>
      <Switch>
        <Route path="/networks/main">
          <NetworksMain />
        </Route>

        <Route path="/networks/mentorship">
          <Mentors />
        </Route>

        <Route path="/networks">
          <Redirect to="/networks/main" />
        </Route>
      </Switch>
    </>
  );
};

export default Networks;
