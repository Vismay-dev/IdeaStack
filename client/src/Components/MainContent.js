import NavBar from "./NavMenu/NavBar";
import Landing from "../pages/landing";
import Browse from "../pages/browse";
import Profile from "../pages/profile";
import MyProjects from "../pages/myprojects";
import Onboarding from "../pages/onboarding";
import AdminPage from "../pages/adminPage";
import ViewProfile from "../pages/viewProfile";
import TeamOnboarding from "../pages/teamOnboarding";
import { Switch, Route, Redirect, useRouter } from "next/router";
import Team from "../pages/team";
import SignUp from "../pages/signUp";
import MentorSignUp from "../pages/mentorSignUp";
import WhyUs from "../pages/whyUs";
import StartupMentorship from "../pages/startupMentorship";
import { io } from "socket.io-client";
import { useEffect, useContext } from "react";
import Mentors from "../pages/mentorsMain";
import userContext from "../context/userContext";
import MentorProfile from "../pages/mentorProfile";
import mentorAccContext from "../context/mentorAccContext";

const MainContent = () => {
  const location = useRouter();
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
