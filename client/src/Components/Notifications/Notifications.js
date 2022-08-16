import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import projectContext from "../../context/projectContext";
import { createSocket } from "../../Socket";
import AOS from "aos";
import "aos/dist/aos.css";
const Notifications = (props) => {
  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

  const location = useLocation();
  let user;
  const projects = useContext(projectContext).projects;
  let messageCount = 0;
  let cnt = 0;
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token") !== null) {
      if (props.user) {
        user = props.user;
      }
      const socket = createSocket();

      socket.on("disconnect", () => console.log("Socket Server Disconnected"));
      socket.on("redistributeMessages", (data) => {
        cnt++;
        let project = projects.filter((proj) => {
          return JSON.stringify(proj._id) === JSON.stringify(data.id);
        })[0];
        console.log(
          location.pathname != "/myprojects/manageproject/collaborate" &&
            project
        );
        if (
          location.pathname != "/myprojects/manageproject/collaborate" &&
          project
        ) {
          if (
            (cnt === 0 && project.messages.length < data.feed.length) ||
            (cnt > 0 && messageCount < data.feed.length)
          ) {
            if (
              JSON.stringify(data.feed[data.feed.length - 1].from) !==
              JSON.stringify(user.firstName + " " + user.lastName)
            ) {
              console.log(
                project.name +
                  " - " +
                  data.feed[data.feed.length - 1].from +
                  " sent a new message"
              );
              let img = null;
              for (let i = 0; i < project.team.length; i++) {
                if (
                  project.team[i].name === data.feed[data.feed.length - 1].from
                ) {
                  img = project.team[i].pic;
                }
              }
              setShowNotif({
                title: `IdeaStack: New Messages (${data.feed.length})`,
                subtitle:
                  data.feed[data.feed.length - 1].from + " sent a message...",
                userImg: img,
              });
              setTimeout(() => {
                setShowNotif(false);
              }, 5000);
            }
          }
          messageCount = data.feed.length;
        }
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [sessionStorage.getItem("token")]);
  return (
    <>
      {showNotif != false ? (
        <section
          data-aos={"fade-up"}
          data-aos-once="true"
          class="from-blue-200 to-indigo-200 bg-gradient-to-b rounded-lg shadow-xl fixed z-[500] right-10 top-[105px] py-2"
        >
          <div class="container px-2 mx-auto">
            <div class="mx-auto p-6 bg-white border border-gray-100 rounded-md shadow-dashboard">
              <div class="flex flex-wrap justify-between -m-2">
                <div class="flex-1 p-2">
                  <div class="flex flex-wrap -m-1">
                    <div class="w-auto p-1">
                      <svg
                        class="relative top-0.5"
                        width="16"
                        height="16"
                        viewbox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.4732 4.80667C12.4112 4.74418 12.3375 4.69458 12.2563 4.66074C12.175 4.62689 12.0879 4.60947 11.9999 4.60947C11.9119 4.60947 11.8247 4.62689 11.7435 4.66074C11.6623 4.69458 11.5885 4.74418 11.5266 4.80667L6.55989 9.78L4.47322 7.68667C4.40887 7.62451 4.33291 7.57563 4.24967 7.54283C4.16644 7.51003 4.07755 7.49394 3.9881 7.49549C3.89865 7.49703 3.81037 7.51619 3.72832 7.55185C3.64627 7.58751 3.57204 7.63898 3.50989 7.70333C3.44773 7.76768 3.39885 7.84364 3.36605 7.92688C3.33324 8.01011 3.31716 8.099 3.31871 8.18845C3.32025 8.2779 3.3394 8.36618 3.37507 8.44823C3.41073 8.53028 3.4622 8.60451 3.52655 8.66667L6.08655 11.2267C6.14853 11.2892 6.22226 11.3387 6.3035 11.3726C6.38474 11.4064 6.47188 11.4239 6.55989 11.4239C6.64789 11.4239 6.73503 11.4064 6.81627 11.3726C6.89751 11.3387 6.97124 11.2892 7.03322 11.2267L12.4732 5.78667C12.5409 5.72424 12.5949 5.64847 12.6318 5.56414C12.6688 5.4798 12.6878 5.38873 12.6878 5.29667C12.6878 5.2046 12.6688 5.11353 12.6318 5.02919C12.5949 4.94486 12.5409 4.86909 12.4732 4.80667Z"
                          fill="#2AD168"
                        ></path>
                      </svg>
                    </div>
                    <div class="flex-1 p-1">
                      <h3 class="mb-0.5 font-medium text-sm text-gray-900">
                        {showNotif.title}
                      </h3>
                      <p class="font-medium text-sm text-gray-600">
                        {showNotif.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="w-auto p-2">
                  <a
                    href="#"
                    onClick={() => {
                      setShowNotif(false);
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewbox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.93999 8L13.14 3.80667C13.2655 3.68113 13.3361 3.51087 13.3361 3.33333C13.3361 3.1558 13.2655 2.98554 13.14 2.86C13.0145 2.73446 12.8442 2.66394 12.6667 2.66394C12.4891 2.66394 12.3189 2.73446 12.1933 2.86L8 7.06L3.80666 2.86C3.68113 2.73446 3.51086 2.66394 3.33333 2.66394C3.15579 2.66394 2.98553 2.73446 2.85999 2.86C2.73446 2.98554 2.66393 3.1558 2.66393 3.33333C2.66393 3.51087 2.73446 3.68113 2.85999 3.80667L7.06 8L2.85999 12.1933C2.79751 12.2553 2.74791 12.329 2.71407 12.4103C2.68022 12.4915 2.6628 12.5787 2.6628 12.6667C2.6628 12.7547 2.68022 12.8418 2.71407 12.9231C2.74791 13.0043 2.79751 13.078 2.85999 13.14C2.92197 13.2025 2.9957 13.2521 3.07694 13.2859C3.15818 13.3198 3.24532 13.3372 3.33333 13.3372C3.42134 13.3372 3.50847 13.3198 3.58971 13.2859C3.67095 13.2521 3.74469 13.2025 3.80666 13.14L8 8.94L12.1933 13.14C12.2553 13.2025 12.329 13.2521 12.4103 13.2859C12.4915 13.3198 12.5787 13.3372 12.6667 13.3372C12.7547 13.3372 12.8418 13.3198 12.923 13.2859C13.0043 13.2521 13.078 13.2025 13.14 13.14C13.2025 13.078 13.2521 13.0043 13.2859 12.9231C13.3198 12.8418 13.3372 12.7547 13.3372 12.6667C13.3372 12.5787 13.3198 12.4915 13.2859 12.4103C13.2521 12.329 13.2025 12.2553 13.14 12.1933L8.93999 8Z"
                        fill="#8896AB"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default Notifications;
