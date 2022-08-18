import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import logo from "./logo2.png";
import userContext from "../../context/userContext";
import ExitModal from "../Modals/ExitModal";
import { returnSocket } from "../../Socket";
import axios from "axios";

const NotifModal = (props) => {
  const history = useHistory();
  const myRef = useRef();
  const userCont = useContext(userContext);
  const user = userCont.user;
  const setUser = userCont.setUser;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const [notifications, setNotifications] = useState([]);
  const [notifArray, setNotifArray] = useState();

  const seeAllNotifs = async (notifs) => {
    let notifsDummy = notifs;
    for (let i = 0; i < notifsDummy.length; i++) {
      notifsDummy[i].seen = true;
    }

    setNotifications(notifsDummy);
    setNotifArray(
      notifsDummy.map((notif, i) => {
        console.log(notif);
        return (
          <div
            id="toast-notification"
            class={`p-4 w-full mb-3 pb-7 overflow-hidden  rounded-lg  ${
              notif.seen === true
                ? "bg-gray-600 shadow-sm"
                : "bg-gray-800 shadow-xl border-2 border-red-600"
            } text-gray-300`}
            role="alert"
            key={i}
          >
            <div class="flex items-center mb-3">
              <span class="mb-1 text-base font-semibold text-white">
                {notif.title}
              </span>
              <button
                onClick={() => {
                  deleteNotif(i);
                }}
                type="button"
                class="ml-auto -mx-1.5 -my-1.5 -mt-2.5  rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8 text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700"
                data-dismiss-target="#toast-notification"
                aria-label="Close"
              >
                <span class="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
            <div class="flex items-center top-2 relative ">
              <div class="inline-block relative shrink-0">
                <img
                  class="w-12 h-12 bg-white relative left-3 rounded-full"
                  src={
                    notif.icon
                      ? notif.icon
                      : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                  }
                />
                <span class="inline-flex absolute -right-4 bottom-0 justify-center items-center w-6 h-6 bg-blue-600 rounded-full">
                  <svg
                    aria-hidden="true"
                    class="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Message icon</span>
                </span>
              </div>
              <div class="ml-3 relative left-1 mb-1 text-sm font-normal">
                <div class="text-sm font-semibold text-white">
                  {notif.subtitle}
                </div>
              </div>
            </div>
          </div>
        );
      })
    );

    userCont.setUser({ ...user, notifications: notifsDummy });
    console.log(notifsDummy);

    await axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/updateNotifications"
          : "http://localhost:4000/api/user/updateNotifications",
        { token: sessionStorage.getItem("token"), notifs: notifsDummy }
      )
      .then((res) => {});
  };

  useEffect(() => {
    setLoading(true);
    setNotifications(user.notifications ? user.notifications : []);
    setNotifArray(
      user.notifications.map((notif, i) => {
        console.log(notif);
        return (
          <div
            id="toast-notification"
            class={`p-4 w-full mb-3 pb-7 overflow-hidden  rounded-lg  ${
              notif.seen === true
                ? "bg-gray-600 shadow-sm"
                : "bg-gray-800 shadow-xl border-2 border-red-600"
            } text-gray-300`}
            role="alert"
            key={i}
          >
            <div class="flex items-center mb-3">
              <span class="mb-1 text-base font-semibold text-white">
                {notif.title}
              </span>
              <button
                onClick={() => {
                  deleteNotif(i);
                }}
                type="button"
                class="ml-auto -mx-1.5 -my-1.5 -mt-2.5  rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8 text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700"
                data-dismiss-target="#toast-notification"
                aria-label="Close"
              >
                <span class="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
            <div class="flex items-center top-2 relative">
              <div class="inline-block relative shrink-0">
                <img
                  class="w-12 h-12 bg-white relative left-3 rounded-full"
                  src={
                    notif.icon
                      ? notif.icon
                      : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                  }
                />
                <span class="inline-flex absolute -right-4 bottom-0 justify-center items-center w-6 h-6 bg-blue-600 rounded-full">
                  <svg
                    aria-hidden="true"
                    class="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Message icon</span>
                </span>
              </div>
              <div class="ml-3 relative w-fit  px-4 left-1 mb-1 text-center text-sm font-normal">
                <div class="text-sm text-center font-semibold text-white">
                  {notif.subtitle}
                </div>
              </div>
            </div>
          </div>
        );
      })
    );
    if (user.notifications.filter((notif) => notif.seen === false).length > 0) {
      seeAllNotifs(user.notifications);
    }
    setLoading(false);
  }, [userCont.user.notifications]);

  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (
        !myRef.current ||
        myRef.current.contains(event.target) ||
        exitModalShow
      ) {
        return;
      }
      props.close();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [myRef, () => props.close()]);

  const [exitModalShow, setExitModalShow] = useState(false);

  const deleteNotif = async (i) => {
    let notifsDummy = notifications;

    let deletedNotif = notifsDummy.splice(i, 1);
    console.log(notifsDummy);
    setNotifications(notifsDummy);
    setNotifArray(
      notifsDummy.map((notif, i) => {
        console.log(notif);
        return (
          <div
            id="toast-notification"
            class="p-4 w-full mb-3 pb-7 overflow-hidden  rounded-lg shadow bg-gray-800 text-gray-300"
            role="alert"
            key={i}
          >
            <div class="flex items-center mb-3">
              <span class="mb-1 text-base font-semibold text-white">
                {notif.title}
              </span>
              <button
                onClick={() => {
                  deleteNotif(i);
                }}
                type="button"
                class="ml-auto -mx-1.5 -my-1.5 -mt-2.5 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8 text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700"
                data-dismiss-target="#toast-notification"
                aria-label="Close"
              >
                <span class="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
            <div class="flex items-center top-2 relative">
              <div class="inline-block relative shrink-0">
                <img
                  class="w-12 h-12 bg-white relative left-3 rounded-full"
                  src={
                    notif.icon
                      ? notif.icon
                      : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                  }
                />
                <span class="inline-flex absolute -right-4 bottom-0 justify-center items-center w-6 h-6 bg-blue-600 rounded-full">
                  <svg
                    aria-hidden="true"
                    class="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Message icon</span>
                </span>
              </div>
              <div class="ml-3 relative left-1 mb-1 text-sm font-normal">
                <div class="text-sm font-semibold text-white">
                  {notif.subtitle}
                </div>
              </div>
            </div>
          </div>
        );
      })
    );

    await axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/updateNotifications"
          : "http://localhost:4000/api/user/updateNotifications",
        { token: sessionStorage.getItem("token"), notifs: notifsDummy }
      )
      .then((res) => {});
    userCont.setUser({ ...userCont.user, notifications: notifsDummy });
    console.log(notifsDummy);
  };

  return (
    <div
      class="fixed z-[200] inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="items-end justify-center min-h-screen  text-center block p-0">
        {/* Background overlay, show/hide based on modal state. */}
        <div
          class="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div
          data-aos={"fade-left"}
          data-aos-once="true"
          ref={myRef}
          class="bg-gradient-to-r from-blue-200 to-indigo-300 h-screen w-[430px] z-40 right-0 absolute"
        >
          <div class="z-50 absolute flex flex-col  h-full right-0  py-8 pb-3  px-8  w-[430px] border-r bg-gradient-to-r from-blue-200 to-indigo-300 border-gray-600">
            <div class="h-[250px]">
              <button
                onClick={props.close}
                type="button"
                class="bg-white rounded-md mb-5 p-2 absolute left-4 top-4 text-gray-400 hover:text-gray-500 hover:bg-gray-100 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span class="sr-only">Close menu</span>
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-24 w-24 bg-blue-700 text-white p-4 rounded-md shadow-lg my-6  block mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>

              <div class="absolute mt-6 w-fit left-[50%] translate-x-[-50%]">
                <span class="absolute inset-y-0  left-0 flex items-center pl-3">
                  <svg
                    class="w-5 h-5 bottom-4 relative text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </span>

                <input
                  type="text"
                  class="w-full py-2 pl-10 mb-8 pr-4  text-gray-900 bg-white border-0 shadow-md rounded-md  focus:border-blue-00  focus:ring-blue-700 focus:ring-opacity-40 focus:outline-none focus:ring"
                  placeholder="Search"
                />
              </div>
            </div>

            <div
              id="scrollbar"
              class={`bg-white mb-4 absolute ${
                notifArray && notifArray.length === 0
                  ? "top-[316px]"
                  : "top-[280px]"
              } w-[425px] left-[30px]  mx-auto flex-grow -ml-7  overflow-y-scroll shadow-md  p-3 rounded-md`}
            >
              {notifArray}
              {notifArray && notifArray.length === 0 ? (
                <div class="top-[16%] mb-8 relative">
                  <img
                    src={
                      "https://cdn.dribbble.com/users/1373705/screenshots/6457914/no_notification_yiran.png?compress=1&resize=400x300&vertical=top"
                    }
                  ></img>
                  <h1 class="font-semibold uppercase text-gray-700 mt-3 text-3xl">
                    No Notifications
                  </h1>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotifModal;
