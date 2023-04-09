import NavBar from "./NavMenu/NavBar";
import Landing from "./Landing/Landing";
import Browse from "./Browse/Browse";
import Profile from "./Profile/Profile";
import MyProjects from "./MyProjects/MyProjects";
import Onboarding from "./Onboarding/Onboarding";
import AdminPage from "./adminPage";
import ViewProfile from "./Profile/ViewProfile";
import TeamOnboarding from "./TeamOnboarding/TeamOnboarding";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Team from "./Team/Team";
import SignUp from "./SignUp/SignUp";
import MentorSignUp from "./SignUp/MentorSignUp";
import WhyUs from "./WhyUs/WhyUs";
import StartupMentorship from "./Mentors/StartupMentorship";
import { io } from "socket.io-client";
import { useEffect, useContext } from "react";
import Mentors from "./Mentors/MentorsMain";
import userContext from "../context/userContext";
import MentorProfile from "./Profile/MentorProfile";
import mentorAccContext from "../context/mentorAccContext";

const MainContent = () => {
  const location = useLocation();
  const user = useContext(userContext).user;
  const mentor = useContext(mentorAccContext).mentor;
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

          <Route
            path="/signup"
            render={() =>
              !sessionStorage.getItem("token") ? (
                <SignUp />
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route
            path="/mentor/"
            render={() =>
              !sessionStorage.getItem("token") ? (
                <MentorSignUp />
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route
            path="/mentorProfile"
            render={() =>
              sessionStorage.getItem("mentorToken") && mentor ? (
                <MentorProfile />
              ) : (
                <Redirect to="/mentor" />
              )
            }
          />

          <Route path="/whyUs">
            {!sessionStorage.getItem("token") ? <WhyUs /> : <Redirect to="/" />}
          </Route>

          <Route path="/teamonboarding">
            {!sessionStorage.getItem("token") ? (
              <TeamOnboarding />
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route path="/onboarding">
            {sessionStorage.getItem("token") && user ? (
              !user.initialized ? (
                <Onboarding />
              ) : (
                <Redirect to="/profile" />
              )
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route
            path="/profile"
            render={() =>
              sessionStorage.getItem("token") && user ? (
                user.initialized ? (
                  <Profile />
                ) : (
                  <Redirect to="/onboarding" />
                )
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
            path="/dashboard"
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
            path="/mentorship"
            render={() =>
              sessionStorage.getItem("token") ? (
                <Mentors />
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route
            path="/startupmentorship"
            render={() =>
              sessionStorage.getItem("mentorToken") ? (
                <StartupMentorship />
              ) : (
                <Redirect to="/mentor" />
              )
            }
          />

          <Route path="/admin-operations-passcode-IdeaStackOperations300305">
            <AdminPage />
          </Route>

          <Route path="/">
            {sessionStorage.getItem("mentorToken") ? (
              <Redirect to="/mentorProfile" />
            ) : !sessionStorage.getItem("token") ? (
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
