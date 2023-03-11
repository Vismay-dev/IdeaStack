import BrowseWorkshops from "./BrowseWorkshops";
import Dashboard from "./Dashboard";
import { useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

export default function Mentors() {
  const [currChoice, setChoice] = useState(0);

  const history = useHistory();
  const location = useLocation();

  return (
    <>
      <div class="block mx-auto text-center px-3 pt-16 mb-3 rounded-lg">
        <a
          onClick={() => {
            history.push("/mentorship/yourmentor");
          }}
          class={` ${
            location.pathname == "/mentorship/yourmentor"
              ? "bg-blue-700 text-gray-100 border-blue-700 border shadow-md"
              : "bg-white shadow-md  text-gray-800"
          } hover:cursor-pointer sm:normal-case uppercase hover:bg-blue-700 hover:border-r-indigo-50  hover:shadow-sm hover:border-blue-700 inline-flex items-center justify-center sm:rounded-l-lg sm:rounded-r-none rounded-t-lg border py-[10px] px-[30px] text-center text-base font-semibold  transition-all hover:text-gray-100 sm:py-4 sm:px-[60px]`}
        >
          <span class="pr-2">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              class="fill-current"
            >
              <path d="M12.5391 0.28125H11.3438C10.4063 0.28125 9.63281 1.05469 9.63281 1.99219V11.3906C9.63281 11.4609 9.65625 11.5313 9.70313 11.6016L11.4141 14.4141C11.5313 14.6016 11.7422 14.7188 11.9766 14.7188C12.2109 14.7188 12.4219 14.6016 12.5391 14.4141L14.25 11.6016C14.2969 11.5313 14.3203 11.4609 14.3203 11.3906V1.99219C14.25 1.05469 13.4766 0.28125 12.5391 0.28125ZM11.3438 1.10156H12.5391C13.0312 1.10156 13.4297 1.5 13.4297 1.99219V2.78906H10.4531V1.99219C10.4531 1.5 10.8516 1.10156 11.3438 1.10156ZM11.9297 13.7344L10.4297 11.2734V3.60938H13.4062V11.2734L11.9297 13.7344Z"></path>
              <path d="M5.27344 0.304688H2.10938C1.35938 0.304688 0.75 0.914063 0.75 1.66406V13.3594C0.75 14.1094 1.35938 14.7188 2.10938 14.7188H5.27344C6.02344 14.7188 6.63281 14.1094 6.63281 13.3594V1.66406C6.60938 0.914063 6 0.304688 5.27344 0.304688ZM5.78906 13.3359C5.78906 13.6172 5.55469 13.875 5.25 13.875H2.10938C1.82813 13.875 1.57031 13.6406 1.57031 13.3359V12.3047C1.59375 12.3047 1.64062 12.3281 1.6875 12.3281H3.42188C3.65625 12.3281 3.84375 12.1406 3.84375 11.9063C3.84375 11.6719 3.65625 11.4844 3.42188 11.4844H1.6875C1.64062 11.4844 1.61719 11.4844 1.57031 11.5078V10.0078C1.59375 10.0078 1.64062 10.0313 1.6875 10.0313H2.20312C2.4375 10.0313 2.625 9.84375 2.625 9.60938C2.625 9.375 2.4375 9.1875 2.20312 9.1875H1.6875C1.64062 9.1875 1.61719 9.1875 1.57031 9.21094V7.73438C1.59375 7.73438 1.64062 7.75781 1.6875 7.75781H3.42188C3.65625 7.75781 3.84375 7.57031 3.84375 7.33594C3.84375 7.10156 3.65625 6.91406 3.42188 6.91406H1.6875C1.64062 6.91406 1.61719 6.91406 1.57031 6.9375V5.4375C1.59375 5.4375 1.64062 5.46094 1.6875 5.46094H2.20312C2.4375 5.46094 2.625 5.27344 2.625 5.03906C2.625 4.80469 2.4375 4.61719 2.20312 4.61719H1.6875C1.64062 4.61719 1.61719 4.61719 1.57031 4.64063V3.14063C1.59375 3.14063 1.64062 3.16406 1.6875 3.16406H3.42188C3.65625 3.16406 3.84375 2.97656 3.84375 2.74219C3.84375 2.50781 3.65625 2.34375 3.42188 2.34375H1.6875C1.64062 2.34375 1.61719 2.34375 1.57031 2.36719V1.66406C1.57031 1.38281 1.80469 1.125 2.10938 1.125H5.27344C5.55469 1.125 5.8125 1.35938 5.8125 1.66406V13.3359H5.78906Z"></path>
            </svg>
          </span>
          Your Mentor
        </a>
        <br class="sm:hidden block" />
        <a
          onClick={() => {
            history.push("/mentorship/bookworkshops");
            sessionStorage.removeItem("index");
          }}
          class={`${
            location.pathname === "/mentorship/bookworkshops"
              ? "bg-blue-700 border-blue-700 text-gray-100 border shadow-md"
              : "bg-white shadow-md text-gray-800"
          } hover:cursor-pointer sm:normal-case uppercase hover:bg-blue-700 hover:shadow-sm hover:border-l-indigo-50 hover:border-blue-700 active:border-blue-700 inline-flex items-center justify-center sm:rounded-r-lg sm:rounded-l-none  rounded-b-lg  border py-[10px] px-[25px] text-center text-base font-semibold  transition-all hover:text-gray-100 sm:py-4 sm:px-[60px]`}
        >
          <span class="pr-2">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              class="fill-current"
            >
              <path d="M7.5 8.53125C9.42187 8.53125 10.9922 6.96094 10.9922 5.03906C10.9922 3.11719 9.42187 1.52344 7.5 1.52344C5.57812 1.52344 4.00781 3.09375 4.00781 5.01562C4.00781 6.9375 5.57812 8.53125 7.5 8.53125ZM7.5 2.34375C8.97656 2.34375 10.1719 3.53906 10.1719 5.01562C10.1719 6.49219 8.97656 7.6875 7.5 7.6875C6.02344 7.6875 4.82812 6.49219 4.82812 5.01562C4.82812 3.5625 6.02344 2.34375 7.5 2.34375Z"></path>
              <path d="M14.555 12.75C12.6097 11.0859 10.1019 10.1719 7.50034 10.1719C4.89878 10.1719 2.39096 11.0859 0.445651 12.75C0.258151 12.8906 0.234714 13.1484 0.398776 13.3359C0.539401 13.5 0.797214 13.5234 0.984714 13.3828C2.7894 11.8594 5.10971 11.0156 7.52378 11.0156C9.93784 11.0156 12.2582 11.8594 14.0628 13.3828C14.1332 13.4531 14.2269 13.4766 14.3207 13.4766C14.4378 13.4766 14.555 13.4297 14.6253 13.3359C14.766 13.1484 14.7425 12.8906 14.555 12.75Z"></path>
            </svg>
          </span>
          Browse Mentors
        </a>
      </div>

      <>
        <Switch>
          <Route path="/mentorship/yourmentor">
            <Dashboard />
          </Route>

          <Route path="/mentorship/bookworkshops">
            <BrowseWorkshops />
          </Route>

          <Route path="/mentorship">
            <Redirect to="/mentorship/yourmentor" />
          </Route>

          <Route path="/mentorship/">
            <Redirect to="/mentorship/yourmentor" />
          </Route>
        </Switch>
      </>
    </>
  );
}
