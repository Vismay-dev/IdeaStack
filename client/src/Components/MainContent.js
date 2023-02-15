import NavBar from "./NavMenu/NavBar";
import Landing from "./Landing/Landing";
import Browse from "./Browse/Browse";
import Profile from "./Profile/Profile";
import MyProjects from "./MyProjects/MyProjects";
import AdminPage from "./adminPage";
import ViewProfile from "./Profile/ViewProfile";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Team from "./Team/Team";
import OurJourney from "./Our Journey/Our Journey";
import { io } from "socket.io-client";
import { useEffect } from "react";
import Mentors from "../Components/Mentors/MentorsMain";

const MainContent = () => {
  const location = useLocation();

  return (
    <>
      <div
        class={`relative  ${
          sessionStorage.getItem("token")
            ? "sm:top-[143px] md:top-[121px] lg:top-[90px] md:mb-[260px] relative  sm:mb-[270px] -mb-12 lg:mb-0"
            : "sm:top-[90px]"
        }`}
      >
        <Switch>
          <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />

          <Route path="/home">
            {!sessionStorage.getItem("token") ? (
              <Landing />
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route path="/team">
            {!sessionStorage.getItem("token") ? <Team /> : <Redirect to="/" />}
          </Route>

          <Route path="/ourjourney">
            {!sessionStorage.getItem("token") ? (
              <OurJourney />
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route
            path="/profile"
            render={() =>
              sessionStorage.getItem("token") ? (
                <Profile />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/browse"
            render={() =>
              sessionStorage.getItem("token") ? <Browse /> : <Redirect to="/" />
            }
          />
          <Route
            path="/myprojects"
            render={() =>
              sessionStorage.getItem("token") ? (
                <MyProjects />
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route
            path="/viewProfile"
            render={() =>
              localStorage.getItem("viewToken") ? (
                <ViewProfile />
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route
            path="/mentors"
            render={() =>
              localStorage.getItem("viewToken") ? (
                <Mentors />
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route path="/admin-operations-passcode-IdeaStackOperations300305">
            <AdminPage />
          </Route>

          <Route path="/">
            {!sessionStorage.getItem("token") ? (
              <Redirect to="/home" />
            ) : (
              <Redirect to="/profile" />
            )}
          </Route>
        </Switch>
        {/* <Landing/> */}
      </div>
    </>
  );
};

export default MainContent;
