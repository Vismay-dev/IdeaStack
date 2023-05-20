import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { useEffect, useContext, Suspense, lazy } from "react";
import userContext from "../context/userContext";
import MentorProfile from "./Profile/MentorProfile";
import mentorAccContext from "../context/mentorAccContext";

const Mentors = lazy(() => import("./Mentors/MentorsMain"));
const StartupMentorship = lazy(() => import("./Mentors/StartupMentorship"));
const WhyUs = lazy(() => import("./WhyUs/WhyUs"));
const MentorSignUp = lazy(() => import("./SignUp/MentorSignUp"));
const SignUp = lazy(() => import("./SignUp/SignUp"));
const Team = lazy(() => import("./Team/Team"));
const TeamOnboarding = lazy(() => import("./TeamOnboarding/TeamOnboarding"));
const ViewProfile = lazy(() => import("./Profile/ViewProfile"));
// const AdminPage = lazy(() => import("./adminPage"));
const Landing = lazy(() => import("./Landing/Landing"));
const Browse = lazy(() => import("./Browse/Browse"));
const Profile = lazy(() => import("./Profile/Profile"));
const MyProjects = lazy(() => import("./MyProjects/MyProjects"));
const Onboarding = lazy(() => import("./Onboarding/Onboarding"));

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
              <Suspense>
                <Landing />
              </Suspense>
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route path="/team">
            {!sessionStorage.getItem("token") ? (
              <Suspense>
                <Team />
              </Suspense>
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route
            path="/signup"
            render={() =>
              !sessionStorage.getItem("token") ? (
                <Suspense>
                  {" "}
                  <SignUp />
                </Suspense>
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route
            path="/mentor/"
            render={() =>
              !sessionStorage.getItem("token") ? (
                <Suspense>
                  <MentorSignUp />
                </Suspense>
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route
            path="/mentorProfile"
            render={() =>
              sessionStorage.getItem("mentorToken") && mentor ? (
                <Suspense>
                  <MentorProfile />
                </Suspense>
              ) : (
                <Redirect to="/mentor" />
              )
            }
          />

          <Route path="/whyUs">
            {!sessionStorage.getItem("token") ? (
              <Suspense>
                <WhyUs />
              </Suspense>
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route path="/teamonboarding">
            {!sessionStorage.getItem("token") ? (
              <Suspense>
                <TeamOnboarding />
              </Suspense>
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route path="/onboarding">
            {sessionStorage.getItem("token") && user ? (
              !user.initialized ? (
                <Suspense>
                  <Onboarding />
                </Suspense>
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
                  <Suspense>
                    <Profile />
                  </Suspense>
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
              sessionStorage.getItem("token") ? (
                <Suspense>
                  <Browse />
                </Suspense>
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/dashboard"
            render={() =>
              sessionStorage.getItem("token") ? (
                <Suspense>
                  {" "}
                  <MyProjects />
                </Suspense>
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route
            path="/viewProfile"
            render={() =>
              localStorage.getItem("viewToken") ? (
                <Suspense>
                  {" "}
                  <ViewProfile />
                </Suspense>
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route
            path="/mentorship"
            render={() =>
              sessionStorage.getItem("token") ? (
                <Suspense>
                  <Mentors />
                </Suspense>
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <Route
            path="/startupmentorship"
            render={() =>
              sessionStorage.getItem("mentorToken") ? (
                <Suspense>
                  <StartupMentorship />
                </Suspense>
              ) : (
                <Redirect to="/mentor" />
              )
            }
          />

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
