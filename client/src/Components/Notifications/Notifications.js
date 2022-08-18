import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import projectContext from "../../context/projectContext";
import { createSocket } from "../../Socket";
import AOS from "aos";
import "aos/dist/aos.css";
import userContext from "../../context/userContext";
import axios from "axios";

const Notifications = (props) => {
  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);
  var currTimeout;
  const location = useLocation();
  let user;
  const userCont = useContext(userContext);
  const projects = useContext(projectContext).projects;
  let messageCount = 0;
  let fileCount = 0;
  let cnt = 0;
  let cnt2 = 0;
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token") !== null) {
      if (props.user) {
        user = props.user;
      }
      const socket = createSocket();

      socket.on("disconnect", () => console.log("Socket Server Disconnected"));

      socket.on("redistributeMessages", async (data) => {
        setShowNotif(false);
        console.log("here");
        window.clearTimeout(currTimeout);
        await setTimeout(async () => {
          await axios
            .post(
              process.env.NODE_ENV === "production"
                ? "https://ideastack.herokuapp.com/api/user/getNotifications"
                : "http://localhost:4000/api/user/getNotifications",
              { token: sessionStorage.getItem("token") }
            )
            .then(async (res) => {
              userCont.setUser({ ...user, notifications: res.data });
            });
        }, 3000);
        cnt++;
        let project = projects.filter((proj) => {
          return JSON.stringify(proj._id) === JSON.stringify(data.id);
        })[0];
        console.log(
          location.pathname !== "/myprojects/manageproject/collaborate" &&
            project
        );
        if (
          location.pathname !== "/myprojects/manageproject/collaborate" &&
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
                title: project.name + `: New Messages (${data.feed.length})`,
                subtitle:
                  data.feed[data.feed.length - 1].from + " sent a message...",
                userImg: img,
                type: "messages",
              });
              currTimeout = setTimeout(() => {
                setShowNotif(false);
              }, 15000);
            }
          }
          messageCount = data.feed.length;
        }
      });

      socket.on("redistributeFiles", async (data) => {
        setShowNotif(false);
        window.clearTimeout(currTimeout);
        await setTimeout(async () => {
          await axios
            .post(
              process.env.NODE_ENV === "production"
                ? "https://ideastack.herokuapp.com/api/user/getNotifications"
                : "http://localhost:4000/api/user/getNotifications",
              { token: sessionStorage.getItem("token") }
            )
            .then(async (res) => {
              userCont.setUser({ ...user, notifications: res.data });
            });
        }, 3000);
        cnt2++;
        let project = projects.filter((proj) => {
          return JSON.stringify(proj._id) === JSON.stringify(data.id);
        })[0];
        console.log(location.pathname);
        if (
          location.pathname !== "/myprojects/manageproject/collaborate" &&
          project
        ) {
          if (
            (cnt2 === 0 && project.documents.length < data.files.length) ||
            (cnt2 > 0 && fileCount < data.files.length)
          ) {
            console.log(
              JSON.stringify(data.files[data.files.length - 1].uploadedBy) !==
                JSON.stringify(user.firstName + " " + user.lastName)
            );
            if (
              JSON.stringify(data.files[data.files.length - 1].uploadedBy) !==
              JSON.stringify(user.firstName + " " + user.lastName)
            ) {
              console.log(
                project.name +
                  " - " +
                  data.files[data.files.length - 1].uploadedBy +
                  " uploaded a new file"
              );
              let img = null;
              for (let i = 0; i < project.team.length; i++) {
                if (
                  project.team[i].name ===
                  data.files[data.files.length - 1].uploadedBy
                ) {
                  img = project.team[i].pic;
                }
              }
              setShowNotif({
                title: project.name + `: New Files (${data.files.length})`,
                subtitle:
                  data.files[data.files.length - 1].uploadedBy +
                  " uploaded a file...",
                userImg: img,
                type: "files",
              });
              currTimeout = setTimeout(() => {
                setShowNotif(false);
              }, 15000);
            }
          }
          fileCount = data.files.length;
        }
      });

      socket.on("sentApplication", async (data) => {
        setShowNotif(false);
        window.clearTimeout(currTimeout);
        await setTimeout(async () => {
          await axios
            .post(
              process.env.NODE_ENV === "production"
                ? "https://ideastack.herokuapp.com/api/user/getNotifications"
                : "http://localhost:4000/api/user/getNotifications",
              { token: sessionStorage.getItem("token") }
            )
            .then(async (res) => {
              userCont.setUser({ ...user, notifications: res.data });
            });
        }, 3000);
        let project = projects.filter((proj) => {
          return JSON.stringify(proj._id) === JSON.stringify(data.id);
        })[0];

        if (project) {
          if (JSON.stringify(project.admin.id) === JSON.stringify(user._id)) {
            console.log(
              project.name +
                " - " +
                data.user.firstName +
                " " +
                data.user.lastName +
                " sent a join request!"
            );

            let img = data.user.profilePic;

            setShowNotif({
              title:
                project.name +
                `: New Join Request (${
                  project.joinRequests.filter(
                    (jR) => jR.isInvite == false || jR.isInvite == null
                  ).length
                })`,
              subtitle:
                data.user.firstName +
                " " +
                data.user.lastName +
                " applied to join!",
              userImg: img,
              type: "joinRequests",
            });
            currTimeout = setTimeout(() => {
              setShowNotif(false);
            }, 30000);
          }
        }
      });

      socket.on("acceptanceConfirmed", async (data) => {
        setShowNotif(false);
        window.clearTimeout(currTimeout);
        await setTimeout(async () => {
          await axios
            .post(
              process.env.NODE_ENV === "production"
                ? "https://ideastack.herokuapp.com/api/user/getNotifications"
                : "http://localhost:4000/api/user/getNotifications",
              { token: sessionStorage.getItem("token") }
            )
            .then(async (res) => {
              userCont.setUser({ ...user, notifications: res.data });
            });
        }, 3000);
        let project = projects.filter((proj) => {
          return JSON.stringify(proj._id) === JSON.stringify(data.id);
        })[0];

        if (project) {
          if (JSON.stringify(project.admin.id) === JSON.stringify(user._id)) {
            console.log(
              project.name +
                " - " +
                data.user.firstName +
                " " +
                data.user.lastName +
                " has Joined!"
            );

            let img = data.user.profilePic;

            setShowNotif({
              title:
                project.name +
                `: New Team Member (${project.joinRequests.length + 1})`,
              subtitle:
                data.user.firstName + " " + data.user.lastName + " has joined!",
              userImg: img,
              type: "acceptanceConfirmed",
            });
            currTimeout = setTimeout(() => {
              setShowNotif(false);
            }, 30000);
          }
        }
      });

      socket.on("applicationAccepted", async (data) => {
        setShowNotif(false);
        window.clearTimeout(currTimeout);
        await setTimeout(async () => {
          await axios
            .post(
              process.env.NODE_ENV === "production"
                ? "https://ideastack.herokuapp.com/api/user/getNotifications"
                : "http://localhost:4000/api/user/getNotifications",
              { token: sessionStorage.getItem("token") }
            )
            .then(async (res) => {
              userCont.setUser({ ...user, notifications: res.data });
            });
        }, 3000);
        let project = data.project;
        console.log("here1");

        if (JSON.stringify(data.acceptedUserId) === JSON.stringify(user._id)) {
          console.log(project.name + " - " + " you've been accepted!");

          let img = user.profilePic;

          setShowNotif({
            title: project.name + `: Join Request Accepted!`,
            subtitle:
              " Congrats, your application to " +
              project.name +
              " has been accepted!",
            userImg: img,
            type: "joinRequests",
          });
          currTimeout = setTimeout(() => {
            setShowNotif(false);
          }, 30000);
        }
      });

      socket.on("inviteSent", async (data) => {
        setShowNotif(false);
        window.clearTimeout(currTimeout);
        await setTimeout(async () => {
          await axios
            .post(
              process.env.NODE_ENV === "production"
                ? "https://ideastack.herokuapp.com/api/user/getNotifications"
                : "http://localhost:4000/api/user/getNotifications",
              { token: sessionStorage.getItem("token") }
            )
            .then(async (res) => {
              userCont.setUser({ ...user, notifications: res.data });
            });
        }, 3000);
        let project = data.project;

        if (project) {
          console.log(
            JSON.stringify(data.invitee._id) === JSON.stringify(user._id)
          );
          if (JSON.stringify(data.invitee._id) === JSON.stringify(user._id)) {
            console.log(
              project.admin.name +
                " from " +
                project.name +
                " " +
                " sent you an invite!"
            );

            setShowNotif({
              title: "You've been invited to " + project.name,
              subtitle: "Project Admin" + ": " + project.admin.name,
              userImg: project.admin.pic,
              type: "joinRequests",
            });
            currTimeout = setTimeout(() => {
              setShowNotif(false);
            }, 30000);
          }
        }
      });

      socket.on("flagInviteRejection", async (data) => {
        setShowNotif(false);
        window.clearTimeout(currTimeout);
        await setTimeout(async () => {
          await axios
            .post(
              process.env.NODE_ENV === "production"
                ? "https://ideastack.herokuapp.com/api/user/getNotifications"
                : "http://localhost:4000/api/user/getNotifications",
              { token: sessionStorage.getItem("token") }
            )
            .then(async (res) => {
              userCont.setUser({ ...user, notifications: res.data });
            });
        }, 3000);
        let project = data.project;

        if (project) {
          console.log(
            JSON.stringify(project.admin.id) === JSON.stringify(user._id)
          );
          if (JSON.stringify(project.admin.id) === JSON.stringify(user._id)) {
            console.log(
              project.name +
                ": " +
                data.user.firstName +
                " rejected your invite!"
            );

            setShowNotif({
              title: "Invite Rejected - " + project.name,
              subtitle: data.user.firstName + " rejected your invite..",
              userImg: data.user.profilePic,
              type: "rejected",
            });
            currTimeout = setTimeout(() => {
              setShowNotif(false);
            }, 30000);
          }
        }
      });

      socket.on("applicationRejected", async (data) => {
        setShowNotif(false);
        window.clearTimeout(currTimeout);
        await setTimeout(async () => {
          await axios
            .post(
              process.env.NODE_ENV === "production"
                ? "https://ideastack.herokuapp.com/api/user/getNotifications"
                : "http://localhost:4000/api/user/getNotifications",
              { token: sessionStorage.getItem("token") }
            )
            .then(async (res) => {
              userCont.setUser({ ...user, notifications: res.data });
            });
        }, 3000);
        let project = data.project;
        console.log("here1");

        if (JSON.stringify(data.acceptedUserId) === JSON.stringify(user._id)) {
          console.log(project.name + " - " + " you've been rejected :(");

          let img = user.profilePic;

          setShowNotif({
            title: project.name + `: Join Request Rejected`,
            subtitle: " Application to " + project.name + " has been rejected",
            userImg: img,
            type: "rejected",
          });
          currTimeout = setTimeout(() => {
            setShowNotif(false);
          }, 30000);
        }
      });

      socket.on("mentorBooked", async (data) => {
        setShowNotif(false);
        window.clearTimeout(currTimeout);
        await setTimeout(async () => {
          await axios
            .post(
              process.env.NODE_ENV === "production"
                ? "https://ideastack.herokuapp.com/api/user/getNotifications"
                : "http://localhost:4000/api/user/getNotifications",
              { token: sessionStorage.getItem("token") }
            )
            .then(async (res) => {
              userCont.setUser({ ...user, notifications: res.data });
            });
        }, 3000);
        let project = projects.filter((proj) => {
          return JSON.stringify(proj._id) === JSON.stringify(data.id);
        })[0];

        if (project) {
          console.log(
            project.name +
              " - " +
              data.info.name +
              ": Mentor booked" +
              data.info.isFirstFree
              ? "for a free trial.."
              : "!"
          );

          let img = data.info.pic;

          setShowNotif({
            title:
              project.name +
              `: New Mentor Booked (${
                data.info.isFirstFree
                  ? "Free Trial"
                  : data.info.numberOfSessionsRemaining + " Sessions"
              })`,
            subtitle: data.info.name + " - " + " Complete Pending Payment!",
            userImg: img,
            type: "mentorBooked",
          });
          currTimeout = setTimeout(() => {
            setShowNotif(false);
          }, 30000);
        }
      });

      socket.on("latestMentorCancelled", async (data) => {
        setShowNotif(false);
        window.clearTimeout(currTimeout);
        await setTimeout(async () => {
          await axios
            .post(
              process.env.NODE_ENV === "production"
                ? "https://ideastack.herokuapp.com/api/user/getNotifications"
                : "http://localhost:4000/api/user/getNotifications",
              { token: sessionStorage.getItem("token") }
            )
            .then(async (res) => {
              userCont.setUser({ ...user, notifications: res.data });
            });
        }, 3000);
        let project = projects.filter((proj) => {
          return JSON.stringify(proj._id) === JSON.stringify(data.id);
        })[0];

        if (project) {
          console.log(
            JSON.stringify(project.admin.id) !== JSON.stringify(user._id)
          );
          if (JSON.stringify(project.admin.id) !== JSON.stringify(user._id)) {
            console.log(
              project.name +
                " - " +
                ": Latest mentor booking with " +
                data.info.name +
                "cancelled"
            );

            let img = data.info.pic;

            setShowNotif({
              title: project.name + `: Latest Booking Cancelled `,
              subtitle: data.info.name + " - " + " Booking Cancelled....",
              userImg: img,
              type: "mentorCancelled",
            });
            currTimeout = setTimeout(() => {
              setShowNotif(false);
            }, 30000);
          }
        }
      });

      socket.on("memberPaid", async (data) => {
        setShowNotif(false);
        window.clearTimeout(currTimeout);
        await setTimeout(async () => {
          await axios
            .post(
              process.env.NODE_ENV === "production"
                ? "https://ideastack.herokuapp.com/api/user/getNotifications"
                : "http://localhost:4000/api/user/getNotifications",
              { token: sessionStorage.getItem("token") }
            )
            .then(async (res) => {
              userCont.setUser({ ...user, notifications: res.data });
            });
        }, 3000);
        let project = data.project;

        if (
          project &&
          JSON.stringify(data.user._id) !== JSON.stringify(user._id)
        ) {
          console.log(
            project.name +
              " - " +
              data.user.firstName +
              " has completed pending payment.."
          );

          let img = data.user.profilePic;

          setShowNotif({
            title: project.name + ": " + ` - 1 Pending Payment Completed`,
            subtitle: data.user.firstName + " - " + "paid their amount!",
            userImg: img,
            type: "memberPaid",
          });
          setTimeout(() => {
            setShowNotif(false);
            if (data.allPaymentsCompleted) {
              setShowNotif({
                title:
                  project.name + ": " + ` - All Pending Payments Completed`,
                subtitle: "Admin - Confirm Mentorship Schedule",
                userImg: img,
                type: "memberPaid",
              });
              currTimeout = setTimeout(() => {
                setShowNotif(false);
              }, 20000);
            }
          }, 15000);
        }
      });

      socket.on("paymentCompleted", async (data) => {
        setShowNotif(false);
        window.clearTimeout(currTimeout);
        await setTimeout(async () => {
          await axios
            .post(
              process.env.NODE_ENV === "production"
                ? "https://ideastack.herokuapp.com/api/user/getNotifications"
                : "http://localhost:4000/api/user/getNotifications",
              { token: sessionStorage.getItem("token") }
            )
            .then(async (res) => {
              userCont.setUser({ ...user, notifications: res.data });
            });
        }, 3000);
        let project = data.project;

        if (project) {
          console.log(project.name + " - " + " All Payments Completed!!");

          let img = data.user.profilePic;

          setShowNotif({
            title: project.name + ": " + ` - All Pending Payments Completed`,
            subtitle: "Admin - Confirm Mentorship Schedule",
            userImg: img,
            type: "memberPaid",
          });
          currTimeout = setTimeout(() => {
            setShowNotif(false);
          }, 20000);
        }
      });

      socket.on("packageApproved", async (data) => {
        setShowNotif(false);
        window.clearTimeout(currTimeout);
        let project = data.project;
        await setTimeout(async () => {
          await axios
            .post(
              process.env.NODE_ENV === "production"
                ? "https://ideastack.herokuapp.com/api/user/getNotifications"
                : "http://localhost:4000/api/user/getNotifications",
              { token: sessionStorage.getItem("token") }
            )
            .then(async (res) => {
              userCont.setUser({ ...user, notifications: res.data });
            });
        }, 3000);
        if (project) {
          console.log(project.name + " - " + " Mentorship Package Approved!");

          let img = data.package.pic;

          setShowNotif({
            title: project.name + ` - Mentorship Package Approved`,
            subtitle: "Mentorship - " + data.package.name,
            userImg: img,
            type: "packageApproved",
          });
          currTimeout = setTimeout(() => {
            setShowNotif(false);
          }, 20000);
        }
      });

      socket.on("packageCompleted", async (data) => {
        setShowNotif(false);
        window.clearTimeout(currTimeout);
        await setTimeout(async () => {
          await axios
            .post(
              process.env.NODE_ENV === "production"
                ? "https://ideastack.herokuapp.com/api/user/getNotifications"
                : "http://localhost:4000/api/user/getNotifications",
              { token: sessionStorage.getItem("token") }
            )
            .then(async (res) => {
              userCont.setUser({ ...user, notifications: res.data });
            });
        }, 3000);
        let project = data.project;
        console.log("here");

        if (project) {
          console.log(project.name + " - " + " Mentorship Package Completed!");

          let img = data.package.pic;

          setShowNotif({
            title: project.name + ` - Mentorship Package Completed!`,
            subtitle: data.package.name,
            userImg: img,
            type: "packageApproved",
          });
          currTimeout = setTimeout(() => {
            setShowNotif(false);
          }, 20000);
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
          class="from-blue-200 to-indigo-200 bg-gradient-to-b rounded-lg shadow-xl fixed z-[35] right-10 top-[105px] py-2"
        >
          <div class="container px-2 mx-auto">
            <div
              class={`mx-auto p-6 ${
                showNotif.type === "mentorBooked" ||
                showNotif.type === "memberPaid" ||
                showNotif.type === "packageApproved"
                  ? ""
                  : "pl-3"
              } bg-white border border-gray-100 rounded-md shadow-dashboard`}
            >
              <div class="flex flex-wrap justify-between -m-2">
                <div class="flex-1 p-2">
                  <div class="flex flex-wrap -m-1">
                    <div class="w-auto p-1 relative left-6">
                      {showNotif.type === "messages" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-[17px] w-[17px] relative bottom-[0.4px] -mr-[1px] text-blue-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                          />
                        </svg>
                      ) : showNotif.type === "files" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-[17px] w-[17px] relative bottom-[0.6px] right-[-1px] -mr-[1px] text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      ) : showNotif.type === "rejected" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-[17px] w-[17px] relative bottom-[0.6px] right-[-1px] -mr-[1px] text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"
                          />
                        </svg>
                      ) : showNotif.type === "joinRequests" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-[17px] w-[17px] relative bottom-[0.6px] right-[-1px] -mr-[1px] text-indigo-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                        </svg>
                      ) : showNotif.type === "acceptanceConfirmed" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-[17px] w-[17px] relative bottom-[0.6px] right-[-1px] -mr-[1px] text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : showNotif.type === "mentorBooked" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-[17px] w-[17px] relative bottom-[0.6px] right-[25px] -mr-[1px] text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                          />
                        </svg>
                      ) : showNotif.type === "mentorCancelled" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-[17px] w-[17px] relative bottom-[0.6px] right-[-1px] -mr-[1px] text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : showNotif.type === "memberPaid" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-[17px] w-[17px] relative bottom-[0.5px] right-[25px] -mr-[1px] text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : showNotif.type === "packageApproved" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-[17px] w-[17px] relative bottom-[0.4px] right-[25px] -mr-[1px] text-indigo-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : (
                        ""
                      )}
                    </div>
                    <div class="flex-1 p-1 ">
                      <h3
                        class={`mb-2 relative ${
                          showNotif.type === "mentorBooked" ||
                          showNotif.type === "memberPaid" ||
                          showNotif.type === "packageApproved"
                            ? "-left-1"
                            : "left-6"
                        } bottom-[2px] font-medium text-sm text-gray-900`}
                      >
                        {showNotif.title}
                      </h3>
                      <div class="flex mt-4 right-2.5 relative">
                        <img
                          class="mr-3 w-7 h-7 top-[15px] border-[1px] border-dashed border-gray-600 rounded-full object-cover"
                          src={
                            showNotif.userImg
                              ? showNotif.userImg
                              : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
                          }
                        ></img>
                        <p class="font-medium text-sm top-1 relative right-1 text-gray-600">
                          {showNotif.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w-auto p-2">
                  <a
                    class="relative cursor-pointer -top-1"
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
