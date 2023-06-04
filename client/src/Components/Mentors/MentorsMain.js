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
      {/* <div class="block mx-auto text-center px-3 pt-16 sm:mb-3 -mb-2.5 rounded-lg">
        <a
          onClick={() => {
            history.push("/mentorship/yourmentor");
          }}
          class={` ${
            location.pathname.split("/").includes("yourmentor")
              ? "bg-blue-700 text-gray-100 border-blue-700 border shadow-md"
              : "bg-white shadow-md  text-gray-800"
          } hover:cursor-pointer normal-case hover:bg-blue-700 hover:border-r-indigo-50  hover:shadow-sm hover:border-blue-700 inline-flex items-center justify-center rounded-l-lg rounded-r-none border py-[10px] px-[20px] sm:px-[60px] text-center sm:text-base text-sm font-semibold  transition-all hover:text-gray-100 sm:py-4 `}
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
          Your Mentor
        </a>
        <a
          onClick={() => {
            history.push("/mentorship/bookworkshops");
            sessionStorage.removeItem("index");
          }}
          class={`${
            location.pathname === "/mentorship/bookworkshops"
              ? "bg-blue-700 border-blue-700 text-gray-100 border shadow-md"
              : "bg-white shadow-md text-gray-800"
          } hover:cursor-pointer normal-case hover:bg-blue-700 hover:shadow-sm hover:border-l-indigo-50 hover:border-blue-700 active:border-blue-700 inline-flex items-center justify-center rounded-r-lg rounded-l-none border py-[10px] px-[20px] sm:px-[60px] text-center sm:text-base text-sm font-semibold  transition-all hover:text-gray-100 sm:py-4`}
        >
          <span class="pr-[7px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 relative bottom-[0px] mt-[-1px]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </span>
          Browse Mentors
        </a>
      </div> */}

      <Switch>
        <Route path="/networks/mentorship">
          <BrowseWorkshops />
        </Route>

        <Route path="/networks/mentorship/">
          <Redirect to="/networks/mentorship" />
        </Route>
      </Switch>
    </>
  );
}
