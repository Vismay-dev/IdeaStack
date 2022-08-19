import { useEffect, useState } from "react";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";

import AOS from "aos";
import "aos/dist/aos.css";
import { useHistory } from "react-router-dom";

const JoinRequests = () => {
  const [joinRequests, setJoinRequests] = useState([]);
  const [projects1, setProjects1] = useState();
  const [projects2, setProjects2] = useState();

  useEffect(() => {
    setLoading(true);
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/user/getUser"
          : "http://localhost:4000/api/user/getUser",

        { token: sessionStorage.getItem("token") }
      )
      .then((res) => {
        setJoinRequests(res.data.joinRequests);
        let joinReqTemp = res.data.joinRequests;
        let arr1T = [];
        let arr2T = [];
        for (let i = 0; i < joinReqTemp.length; i++) {
          if (!joinReqTemp[i].isInvite) {
            arr1T.push(joinReqTemp[i]);
            setArr1(arr1T);
          } else {
            arr2T.push(joinReqTemp[i]);
            setArr2(arr2T);
          }
        }

        setArr2(arr2T);
        setArr1(arr1T);
        axios
          .post(
            process.env.NODE_ENV === "production"
              ? "https://ideastack.herokuapp.com/api/user/getAllProjects"
              : "http://localhost:4000/api/user/getAllProjects",
            { token: sessionStorage.getItem("token") }
          )
          .then((res) => {
            let projTemp1 = [];
            let projTemp2 = [];

            for (let i = 0; i < res.data.length; i++) {
              for (let j = 0; j < arr1T.length; j++) {
                if (
                  JSON.stringify(arr1T[j].projID) ===
                  JSON.stringify(res.data[i]._id)
                ) {
                  projTemp1.push(res.data[i]);
                }
              }

              for (let j = 0; j < arr2T.length; j++) {
                if (
                  JSON.stringify(arr2T[j].projID) ===
                  JSON.stringify(res.data[i]._id)
                ) {
                  projTemp2.push(res.data[i]);
                }
              }
            }

            setProjects1(projTemp1);
            setProjects2(projTemp2);
          });
      });
    setLoading(false);
  }, []);

  const [loading, setLoading] = useState(false);
  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);
  const history = useHistory();

  const confirmAcceptance = (index) => {
    setLoading(true);
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/project/confirmAcceptance"
          : "http://localhost:4000/api/project/confirmAcceptance",
        { token: sessionStorage.getItem("token"), application: arr1[index] }
      )
      .then((res) => {
        setJoinRequests(res.data);
        let joinReqTemp = res.data;
        let arr1T = [];
        let arr2T = [];
        for (let i = 0; i < joinReqTemp.length; i++) {
          if (!joinReqTemp[i].isInvite) {
            arr1T.push(joinReqTemp[i]);
            setArr1(arr1T);
          } else {
            arr2T.push(joinReqTemp[i]);
            setArr2(arr2T);
          }
        }
        setArr2(arr2T);
        setArr1(arr1T);
        axios
          .post(
            process.env.NODE_ENV === "production"
              ? "https://ideastack.herokuapp.com/api/user/getAllProjects"
              : "http://localhost:4000/api/user/getAllProjects",
            { token: sessionStorage.getItem("token") }
          )
          .then((res) => {
            let projTemp1 = [];
            let projTemp2 = [];

            for (let i = 0; i < res.data.length; i++) {
              for (let j = 0; j < arr1T.length; j++) {
                if (
                  JSON.stringify(arr1T[j].projID) ===
                  JSON.stringify(res.data[i]._id)
                ) {
                  projTemp1.push(res.data[i]);
                }
              }

              for (let j = 0; j < arr2T.length; j++) {
                if (
                  JSON.stringify(arr2T[j].projID) ===
                  JSON.stringify(res.data[i]._id)
                ) {
                  projTemp2.push(res.data[i]);
                }
              }
            }

            setProjects1(projTemp1);
            setProjects2(projTemp2);
            setLoading(false);
          });
        history.push("/myprojects/allprojects");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  };

  const confirmInvite = (index) => {
    setLoading(true);
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/project/confirmAcceptance"
          : "http://localhost:4000/api/project/confirmAcceptance",
        { token: sessionStorage.getItem("token"), application: arr2[index] }
      )
      .then((res) => {
        setJoinRequests(res.data);
        let joinReqTemp = res.data;
        let arr1T = [];
        let arr2T = [];
        for (let i = 0; i < joinReqTemp.length; i++) {
          if (!joinReqTemp[i].isInvite) {
            arr1T.push(joinReqTemp[i]);
            setArr1(arr1T);
          } else {
            arr2T.push(joinReqTemp[i]);
            setArr2(arr2T);
          }
        }
        setArr2(arr2T);
        setArr1(arr1T);
        axios
          .post(
            process.env.NODE_ENV === "production"
              ? "https://ideastack.herokuapp.com/api/user/getAllProjects"
              : "http://localhost:4000/api/user/getAllProjects",
            { token: sessionStorage.getItem("token") }
          )
          .then((res) => {
            let projTemp1 = [];
            let projTemp2 = [];

            for (let i = 0; i < res.data.length; i++) {
              for (let j = 0; j < arr1T.length; j++) {
                if (
                  JSON.stringify(arr1T[j].projID) ===
                  JSON.stringify(res.data[i]._id)
                ) {
                  projTemp1.push(res.data[i]);
                }
              }

              for (let j = 0; j < arr2T.length; j++) {
                if (
                  JSON.stringify(arr2T[j].projID) ===
                  JSON.stringify(res.data[i]._id)
                ) {
                  projTemp2.push(res.data[i]);
                }
              }
            }

            setProjects1(projTemp1);
            setProjects2(projTemp2);
            setLoading(false);
          });
        history.push("/myprojects/allprojects");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  };

  useEffect(() => {
    AOS.init({
      duration: 600,
    });
  }, [loading]);

  const confirmRejection = (index) => {
    setLoading(true);
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/project/confirmRejection"
          : "http://localhost:4000/api/project/confirmRejection",
        { token: sessionStorage.getItem("token"), application: arr1[index] }
      )
      .then((res) => {
        setJoinRequests(res.data);
        let joinReqTemp = res.data;
        let arr1T = [];
        let arr2T = [];
        for (let i = 0; i < joinReqTemp.length; i++) {
          if (!joinReqTemp[i].isInvite) {
            arr1T.push(joinReqTemp[i]);
            setArr1(arr1T);
          } else {
            arr2T.push(joinReqTemp[i]);
            setArr2(arr2T);
          }
        }
        setArr2(arr2T);
        setArr1(arr1T);
        axios
          .post(
            process.env.NODE_ENV === "production"
              ? "https://ideastack.herokuapp.com/api/user/getAllProjects"
              : "http://localhost:4000/api/user/getAllProjects",
            { token: sessionStorage.getItem("token") }
          )
          .then((res) => {
            let projTemp1 = [];
            let projTemp2 = [];

            for (let i = 0; i < res.data.length; i++) {
              for (let j = 0; j < arr1T.length; j++) {
                if (
                  JSON.stringify(arr1T[j].projID) ===
                  JSON.stringify(res.data[i]._id)
                ) {
                  projTemp1.push(res.data[i]);
                }
              }

              for (let j = 0; j < arr2T.length; j++) {
                if (
                  JSON.stringify(arr2T[j].projID) ===
                  JSON.stringify(res.data[i]._id)
                ) {
                  projTemp2.push(res.data[i]);
                }
              }
            }

            setProjects1(projTemp1);
            setProjects2(projTemp2);
            setLoading(false);
          });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  };

  const confirmRejectionInvite = (index, num) => {
    setLoading(true);
    axios
      .post(
        process.env.NODE_ENV === "production"
          ? "https://ideastack.herokuapp.com/api/project/confirmRejectionInvite"
          : "http://localhost:4000/api/project/confirmRejectionInvite",
        {
          token: sessionStorage.getItem("token"),
          application: num == 1 ? arr1[index] : arr2[index],
        }
      )
      .then((res) => {
        setJoinRequests(res.data);
        let joinReqTemp = res.data;
        console.log(joinReqTemp);
        let arr1T = [];
        let arr2T = [];
        for (let i = 0; i < joinReqTemp.length; i++) {
          if (!joinReqTemp[i].isInvite) {
            arr1T.push(joinReqTemp[i]);
            setArr1(arr1T);
          } else {
            arr2T.push(joinReqTemp[i]);
            setArr2(arr2T);
          }
        }
        setArr2(arr2T);
        setArr1(arr1T);
        axios
          .post(
            process.env.NODE_ENV === "production"
              ? "https://ideastack.herokuapp.com/api/user/getAllProjects"
              : "http://localhost:4000/api/user/getAllProjects",
            { token: sessionStorage.getItem("token") }
          )
          .then((res) => {
            let projTemp1 = [];
            let projTemp2 = [];
            setArr2(arr2T);
            setArr1(arr1T);

            for (let i = 0; i < res.data.length; i++) {
              for (let j = 0; j < arr1T.length; j++) {
                if (
                  JSON.stringify(arr1T[j].projID) ===
                  JSON.stringify(res.data[i]._id)
                ) {
                  projTemp1.push(res.data[i]);
                }
              }

              for (let j = 0; j < arr2T.length; j++) {
                if (
                  JSON.stringify(arr2T[j].projID) ===
                  JSON.stringify(res.data[i]._id)
                ) {
                  projTemp2.push(res.data[i]);
                }
              }
            }

            setProjects1(projTemp1);
            setProjects2(projTemp2);
            setArr1(arr1T);
            setArr2(arr2T);
            setLoading(false);
          });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <h1 class=" text-center w-10/12 relative mx-auto md:mb-0 -mb-3   md:mt-6 mt-4 py-4 pb-[4px]  font-bold text-gray-800 md:text-[47px] sm:text-[38px] text-[34px] ">
        Join <span class="text-blue-700">Requests</span> (
        {arr1 ? arr1.length : ""})
      </h1>

      <div
        class={`grid ${
          arr1 && arr1.length === 1
            ? "lg:grid-cols-3 grid-cols-4"
            : "md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
        } gap-6 xl:px-24 lg:px-16 pt-[54px] sm:px-10  px-[60px]   pointer-events-auto ${
          (arr1 && arr1.length === 0) || loading
            ? "mb-[6.35rem] sm:mb-[8rem] pb-[135px]"
            : "md:mb-[4rem] mb-[3rem]"
        }`}
      >
        {loading ? (
          <div
            class={`relative mx-auto  py-[40px] -mb-28 ${
              arr1 && arr1.length === 1
                ? "lg:col-span-3 col-span-4"
                : " md:col-span-3 sm:col-span-2 col-span-1"
            } pt-[75px] text-center block justify-center`}
          >
            <PulseLoader
              color={"#1a52c9"}
              loading={loading}
              size={20}
              margin={7}
            />
          </div>
        ) : arr1 ? (
          arr1.length === 0 ? (
            <p class="smd:text-4xl sm:text-3xl text-2xl font-semibold md:col-span-3 sm:col-span-2 col-span-1 text-center mt-[50px] sm:-mb-[255px] -mb-[280px]  right-1 mx-auto relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 66 66"
                class="mx-auto block  relative  w-24 mb-4 -mt-[30px] h-auto text-center"
                viewBox="0 0 66 66"
              >
                <polygon
                  fill="#465C6A"
                  points="62 20.5 62 34.9 43.8 35.1 43.8 19.5 51.3 16.4"
                />
                <polygon
                  fill="#3B4C56"
                  points="53.3 17.1 53.3 35 62 34.9 62 20.5"
                />
                <rect
                  width="5.5"
                  height="4.5"
                  x="50.1"
                  y="26.1"
                  fill="#D5B79F"
                />
                <rect
                  width="2.9"
                  height="4.5"
                  x="50.1"
                  y="26.1"
                  fill="#C6A28A"
                />
                <ellipse cx="53.1" cy="19.3" fill="#D5B79F" rx="6.9" ry="8.5" />
                <path
                  fill="#C6A28A"
                  d="M53.1,10.8L53.1,10.8l0,17l0,0c3.8,0,6.9-3.8,6.9-8.5S56.9,10.8,53.1,10.8z"
                />
                <path
                  fill="#465C6A"
                  d="M56,12.8c0,0-5.5,1.2-6.7,3.5c-1.1,2.3-0.2,4.8-1.7,5.9c0,0,0.7,2.5,1.6,4.2c0,0-1,0.9,0.3,2.1
				c0,0-1.5,0.2-2.2-0.4c0,0,1.3,2.6,2.8,2.9c0,0-2.8,0.3-4.3-3s-2.8-9.8-1.5-12.5c1.3-2.7,4.9-10.8,11.2-7.3c0,0,1.6-0.8,3.1,1.4
				s3,6,3.3,8.5s0.2,5.9-2,8.6c-2.2,2.7-5.3,4-5.3,4s2.7-2.4,3.5-3.8l-0.8-0.6c0,0,1.3-1.8,1.5-4.9C59,18.4,59.3,13.8,56,12.8z"
                />
                <path
                  fill="#3B4C56"
                  d="M61.9,18.1c-0.3-2.5-1.8-6.4-3.3-8.5c-1.5-2.2-3.1-1.4-3.1-1.4c-0.9-0.5-1.7-0.7-2.4-0.8v6.4
				c1.5-0.5,2.9-0.9,2.9-0.9c3.3,1,3,5.5,2.8,8.6c-0.2,3.1-1.5,4.9-1.5,4.9l0.8,0.6c-0.8,1.3-3.5,3.8-3.5,3.8s3.1-1.4,5.3-4
				C62.1,24,62.2,20.5,61.9,18.1z"
                />
                <path
                  fill="#C6A28A"
                  d="M65,37.7c0.1-2.4-1.6-3.9-3.5-5.3c-1.9-1.4-5.9-2.7-5.9-2.7l-2.6,0.9l-2.6-0.9c0,0-3.9,1.3-5.9,2.7
				c-1.9,1.4-3.5,2.9-3.5,5.3c0.1,2.4,0,7.8,0,7.8h11.9H65C65,45.5,64.9,40.1,65,37.7z"
                />
                <path
                  fill="#FAD22C"
                  d="M65,45.5H41.1c0,0,0.1-5.4,0-7.8c-0.1-2.4,1.6-3.9,3.5-5.3c0.7-0.5,1.7-1,2.7-1.4c1.3,1.8,3.4,3,5.8,3
				c2.4,0,4.5-1.2,5.8-3c1,0.4,1.9,0.9,2.7,1.4c1.9,1.4,3.5,2.9,3.5,5.3C64.9,40.1,65,45.5,65,45.5z"
                />
                <path
                  fill="#E0B624"
                  d="M65,37.7c0.1-2.4-1.6-3.9-3.5-5.3c-0.7-0.5-1.7-1-2.7-1.4c-1.3,1.8-3.4,3-5.8,3l0,0v11.5H65
				C65,45.5,64.9,40.1,65,37.7z"
                />
                <ellipse
                  cx="21.1"
                  cy="19"
                  fill="#C6A28A"
                  rx="1.9"
                  ry="1.1"
                  transform="rotate(-75.707 21.055 18.982)"
                />
                <ellipse
                  cx="6.1"
                  cy="19"
                  fill="#D5B79F"
                  rx="1.9"
                  ry="1.1"
                  transform="rotate(-104.293 6.09 18.983)"
                />
                <rect width="5.8" height="4.8" x="10.5" y="25" fill="#D5B79F" />
                <rect width="2.9" height="4.8" x="10.5" y="25" fill="#C6A28A" />
                <ellipse cx="13.6" cy="17.8" fill="#D5B79F" rx="7.3" ry="9" />
                <path
                  fill="#C6A28A"
                  d="M13.6,8.8L13.6,8.8l0,17.9l0,0c4,0,7.3-4,7.3-9S17.6,8.8,13.6,8.8z"
                />
                <path
                  fill="#45BBDD"
                  d="M26.2,37.3c0.1-2.5-1.7-4.2-3.7-5.6c-2-1.4-6.2-2.9-6.2-2.9l-2.7,1l-0.2-0.2l-2.6-0.7c0,0-4.2,1.4-6.2,2.9
			c-2,1.4-3.7,3.1-3.7,5.6c0.1,2.5,0,8.2,0,8.2h12.6h12.6C26.2,45.5,26.2,39.8,26.2,37.3z"
                />
                <path
                  fill="#15A9CB"
                  d="M26.2,37.3c0.1-2.5-1.7-4.2-3.7-5.6c-2-1.4-6.2-2.9-6.2-2.9l-2.9,0.7l0,15.9h12.8
			C26.2,45.5,26.2,39.8,26.2,37.3z"
                />
                <polygon
                  fill="#E6E6E8"
                  points="14.4 29.6 12.5 29.6 11.6 31 12.5 32.5 14.4 32.5 15.3 31"
                />
                <polygon
                  fill="#D4D8DB"
                  points="15.3 31 14.4 29.6 13.4 29.6 13.4 32.5 14.4 32.5"
                />
                <polygon
                  fill="#45BBDD"
                  points="16.4 27.4 13.4 29.6 16.2 31.8 17 29.1"
                />
                <polygon
                  fill="#15A9CB"
                  points="10.5 27.4 13.4 29.6 10.7 31.8 9.9 29.2"
                />
                <polygon
                  fill="#E6E6E8"
                  points="15.2 45.5 13.4 45.5 13.4 32.5 14.4 32.5"
                />
                <polygon
                  fill="#D4D8DB"
                  points="13.4 45.5 11.7 45.5 12.5 32.5 13.4 32.5"
                />
                <path
                  fill="#465C6A"
                  d="M21.2,12.2c-0.4-3.9-1.8-4.8-4.7-5.3c-2.8-0.5-7-0.7-9.4,1.8c-2.2,2.2-0.9,9.6-0.7,11
			c0,0.1,0.1,0.2,0.3,0.2l0.1,0c0.1,0,0.2-0.1,0.2-0.2c0.1-0.7,0.5-3.3,0.6-4.4c0.1-1.2-0.1-2.2,0.9-2.3c1-0.1,3.9,2.6,9.1,0
			c0,0,1.2-0.2,1.2,1.1c0,1.3,1.4,3.4,1,5.9c0,0.2,0.1,0.3,0.3,0.3c0.1,0,0.2-0.1,0.2-0.2C20.7,19.3,21.6,15.6,21.2,12.2z"
                />
                <path
                  fill="#3B4C56"
                  d="M21.2,12.2c-0.4-3.9-1.8-4.8-4.7-5.3c-0.9-0.2-1.9-0.3-2.9-0.3v7.5c1.2,0,2.6-0.3,4.2-1.1
			c0,0,1.2-0.2,1.2,1.1c0,1.3,1.4,3.4,1,5.9c0,0.2,0.1,0.3,0.3,0.3c0.1,0,0.2-0.1,0.2-0.2C20.7,19.3,21.6,15.6,21.2,12.2z"
                />
                <g>
                  <ellipse
                    cx="41.7"
                    cy="26.2"
                    fill="#C6A28A"
                    rx="2.4"
                    ry="1.3"
                    transform="rotate(-75.707 41.686 26.203)"
                  />
                  <ellipse
                    cx="23"
                    cy="26.2"
                    fill="#D5B79F"
                    rx="2.4"
                    ry="1.3"
                    transform="rotate(-104.293 22.976 26.203)"
                  />
                  <rect
                    width="7.3"
                    height="6"
                    x="28.5"
                    y="33.8"
                    fill="#D5B79F"
                  />
                  <rect
                    width="3.6"
                    height="6"
                    x="28.5"
                    y="33.8"
                    fill="#C6A28A"
                  />
                  <ellipse
                    cx="32.4"
                    cy="24.7"
                    fill="#D5B79F"
                    rx="9.1"
                    ry="11.2"
                  />
                  <path
                    fill="#C6A28A"
                    d="M32.4,13.5L32.4,13.5l0,22.4l0,0c5,0,9.1-5,9.1-11.2S37.4,13.5,32.4,13.5z"
                  />
                  <path
                    fill="#D4D8DB"
                    d="M48.2,49.1c0.1-3.1-2.1-5.2-4.6-7c-2.5-1.8-7.7-3.6-7.7-3.6l-3.4,1.2l-0.2-0.3L29,38.6
				c0,0-5.2,1.8-7.7,3.6c-2.5,1.8-4.7,3.9-4.6,7c0.1,3.1,0,10.3,0,10.3h15.8h15.8C48.2,59.4,48.1,52.2,48.2,49.1z"
                  />
                  <path
                    fill="#E6E6E8"
                    d="M48.2,49.1c0.1-3.1-2.1-5.2-4.6-7c-2.5-1.8-7.7-3.6-7.7-3.6l-3.6,0.9l0,19.9h16
				C48.2,59.4,48.1,52.2,48.2,49.1z"
                  />
                  <path
                    fill="#D4D8DB"
                    d="M48.2,59.4h-16c0,0,0,0,0,0c3.9-10.2,4.2-18.5,4.2-20.6c0.4,0.2,1.1,0.4,1.9,0.7c1.7,0.7,3.9,1.7,5.2,2.6
				c2.5,1.8,4.7,3.9,4.6,7C48.1,52.2,48.2,59.4,48.2,59.4z"
                  />
                  <path
                    fill="#E6E6E8"
                    d="M32.1,59.4L32.1,59.4L32.1,59.4L32.1,59.4C32.1,59.3,32.1,59.3,32.1,59.4z"
                  />
                  <polygon
                    fill="#E8664A"
                    points="33.3 39.5 31 39.5 29.9 41.3 31 43.1 33.3 43.1 34.5 41.3"
                  />
                  <polygon
                    fill="#D95239"
                    points="34.5 41.3 33.3 39.5 32.2 39.5 32.2 43.1 33.3 43.1"
                  />
                  <polygon
                    fill="#B5BABE"
                    points="35.8 36.8 32.2 39.4 35.6 42.2 36.6 38.9"
                  />
                  <polygon
                    fill="#E6E6E8"
                    points="28.5 36.8 32.2 39.4 28.7 42.2 27.7 39"
                  />
                  <polygon
                    fill="#E8664A"
                    points="34.3 59.4 32.2 59.4 32.2 43.1 33.3 43.1"
                  />
                  <polygon
                    fill="#D95239"
                    points="32.2 59.4 30 59.4 31 43.1 32.2 43.1"
                  />
                  <path
                    fill="#3B4C56"
                    d="M32.1,59.4L32.1,59.4l-15.5,0c0,0,0.1-7.1,0-10.3c-0.1-3.1,2.1-5.2,4.6-7c1.3-0.9,3.3-1.8,4.9-2.5
				c0.7-0.3,1.4-0.5,1.9-0.7C28,41.2,28.3,49.4,32.1,59.4C32.1,59.3,32.1,59.3,32.1,59.4z"
                  />
                  <path
                    fill="#465C6A"
                    d="M48.2,59.4h-16c0,0,0,0,0,0c3.9-10.2,4.2-18.5,4.2-20.6c0.4,0.2,1.1,0.4,1.9,0.7c1.7,0.7,3.9,1.7,5.2,2.6
				c2.5,1.8,4.7,3.9,4.6,7C48.1,52.2,48.2,59.4,48.2,59.4z"
                  />
                  <path
                    fill="#3B4C56"
                    d="M38.1,46.7l0.7,2.3c-2.1,6.6-6.3,10.2-6.6,10.4c3.9-10.2,4.2-18.5,4.2-20.6c0-0.3,0-0.5,0-0.5l1.9,1.2v0
					l1,5.6L38.1,46.7z"
                  />
                  <path
                    fill="#465C6A"
                    d="M32.1 59.4C32.1 59.4 32.1 59.4 32.1 59.4c-.4-.4-4.1-4-6.1-10.4l.7-2.3-1.3-1.6.7-5.4 1.9-1.4c0 0 0 .2 0 .7C28 41.2 28.3 49.4 32.1 59.4 32.1 59.3 32.1 59.3 32.1 59.4zM40.8 17.4c0 0 1.6-2.1-3-4.5-4.7-2.3-10.5-.6-13 1.8-2.5 2.4-2.3 8.9-1.8 10.5.3 1.2.7 2.4.9 3 .1.2.2.3.4.3.3 0 .5-.2.4-.5-.1-1.2-.3-4.6-.1-6.1.3-1.8 2.8-4 5-3.8s5.7.6 7.7-.3c0 0 1.2 1.7 1.8 4 .5 1.8.3 5.1.2 6.3 0 .3.2.5.4.5H40c.2 0 .3-.1.4-.3C41 26.7 43.5 19.2 40.8 17.4z"
                  />
                  <path
                    fill="#3B4C56"
                    d="M40.8,17.4c0,0,1.6-2.1-3-4.5c-1.8-0.9-3.7-1.2-5.5-1.1v6.4c1.8,0.1,3.8,0.1,5.1-0.5c0,0,1.2,1.7,1.8,4
			c0.5,1.8,0.3,5.1,0.2,6.3c0,0.3,0.2,0.5,0.4,0.5H40c0.2,0,0.3-0.1,0.4-0.3C41,26.7,43.5,19.2,40.8,17.4z"
                  />
                </g>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="md:h-10 sm:h-8 h-6 w-6 md:w-10 sm:w-8  inline text-blue-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>{" "}
              <span class="top-0.5 relative">No Requests Sent</span>
            </p>
          ) : (
            <>
              {projects1 &&
                arr1 &&
                arr1.map((joinR, i) => {
                  return (
                    <div
                      data-aos={"fade-up"}
                      data-aos-once="true"
                      class={`rounded-lg col-span-1 -mt-1 z-40 pointer-events-auto ${
                        arr1 && arr1.length === 1
                          ? "md:col-start-2 lg:col-start-2 sm:col-start-2  col-start-1 lg:col-span-1 sm:col-span-2 col-span-4 relative"
                          : ""
                      } shadow-lg bg-white `}
                    >
                      <a href="#!">
                        <img
                          class="rounded-t-lg scale-75 -my-5 "
                          src={projects1[i] ? projects1[i].projPic : ""}
                          alt=""
                        />
                      </a>
                      <div class="p-6 border-t-[1px] border-gray-400 text-center sm:text-left pointer-events-auto z-50">
                        <h5 class="text-gray-900 relative bottom-1  text-xl font-medium mb-2">
                          Join Request : {projects1 ? projects1[i].name : ""}
                        </h5>
                        <p class="text-gray-700 lg:text-base text-sm mb-3 mt-1.5">
                          {projects1[i] ? projects1[i].problem : ""}
                        </p>
                        <h3
                          class={`font-semibold tracking-wide relative top-1 lg:text-base text-sm lg:mt-5 mt-3 lg:mb-0 mb-[1px]  text-indigo-600 ${
                            joinR.appStatus === "Accepted" ||
                            joinR.appStatus === "Rejected"
                              ? "text-center"
                              : ""
                          }`}
                        >
                          Application Status:{" "}
                          {arr1[i].appStatus.toLowerCase() === "not decided"
                            ? "Processing"
                            : arr1[i].appStatus}
                        </h3>

                        <div class="z-40  lg:text-base text-sm pointer-events-auto">
                          {joinR.appStatus === "Accepted" ? (
                            <div class="relative mt-6 mb-1 mx-auto   grid grid-cols-2 gap-2">
                              <button
                                onClick={() => confirmRejectionInvite(i, 1)}
                                class="shadow-md text-sm hover:shadow-xl z-40  cursor-pointer active:shadow-sm  text-center justify-center bg-gradient-to-r from-orange-600 to-orange-500  p-3 py-2 pt-1.5 rounded-lg text-white font-semibold"
                              >
                                Cancel Request
                              </button>
                              <button
                                onClick={() => confirmAcceptance(i)}
                                class="shadow-md text-sm hover:shadow-xl z-40  cursor-pointer active:shadow-sm  text-center justify-center bg-gradient-to-r from-blue-600 to-indigo-500 p-3 py-2 rounded-lg text-white font-semibold"
                              >
                                Confirm Acceptance and Join
                              </button>
                            </div>
                          ) : joinR.appStatus === "Rejected" ? (
                            <button
                              onClick={() => confirmRejection(i)}
                              class="shadow-md hover:shadow-xl cursor-pointer lg:text-base text-sm  z-40 active:shadow-sm relative mt-4 mb-3.5 mx-auto block text-center justify-center bg-gradient-to-r from-orange-600 to-orange-500 p-5 left-[1px] py-2 rounded-lg text-white font-semibold"
                            >
                              Remove
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </>
          )
        ) : (
          ""
        )}
      </div>

      <h1 class=" text-center w-10/12 relative mx-auto md:mb-0 -mb-3   md:mt-8 mt-6 py-4 pb-[2px]  font-bold text-gray-800 md:text-[47px] sm:text-[38px] text-[34px] ">
        Invites ({arr2 ? arr2.length : ""})
      </h1>

      <div
        class={`grid ${
          arr2 && arr2.length === 1
            ? "lg:grid-cols-3 grid-cols-4"
            : "md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
        } gap-6 xl:px-24 lg:px-16  sm:px-10  px-[60px]   pointer-events-auto ${
          (arr2 && arr2.length === 0) || loading
            ? "sm:mb-[4rem] mb-[3rem] sm:pb-[36px] pb-[65px] sm:pt-[54px] pt-[46px]"
            : "md:-mb-[13.5rem] -mb-[12rem] pt-[54px]"
        }`}
      >
        {loading ? (
          <div
            class={`relative mx-auto  -mb-56 ${
              arr2 && arr2.length === 1
                ? "lg:col-span-3 col-span-4"
                : " md:col-span-3 sm:col-span-2 col-span-1"
            } pt-[80px] pb-[90px] text-center block justify-center`}
          >
            <PulseLoader
              color={"#1a52c9"}
              loading={loading}
              size={20}
              margin={7}
            />
          </div>
        ) : arr2 ? (
          arr2.length === 0 ? (
            <p class="smd:text-4xl sm:text-3xl text-2xl font-semibold md:col-span-3 sm:col-span-2 col-span-1 text-center mt-[70px] -mb-[370px] right-1 mx-auto relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mx-auto block  relative  w-24 mb-6 -mt-[52px] h-auto text-center"
                data-name="Layer 1"
                viewBox="0 0 32 32"
              >
                <defs>
                  <linearGradient
                    id="a"
                    x1="16.45"
                    x2="16.45"
                    y1="8.18"
                    y2="31.69"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      class="stopColorffffff svgShape"
                      offset="0"
                      stop-color="#fff"
                      stop-opacity=".25"
                    />
                    <stop
                      class="stopColor9495fa svgShape"
                      offset="1"
                      stop-color="#94bafa"
                    />
                  </linearGradient>
                </defs>
                <path
                  fill="#fbbc05"
                  d="M28.43 29.29a.33.33 0 0 1-.23-.09.33.33 0 0 1 0-.45l1.18-1.18a.32.32 0 0 1 .45.45l-1.18 1.18a.31.31 0 0 1-.22.09zM9.68 1.52a.37.37 0 0 1-.26-.1.36.36 0 0 1 0-.51l.81-.81a.37.37 0 0 1 .5 0l.72.72a.36.36 0 1 1-.51.51l-.46-.47-.55.56a.35.35 0 0 1-.25.1z"
                  class="colorff9d23 svgShape"
                />
                <path
                  fill="#4285f4"
                  d="M28.38 12.88a.36.36 0 0 1-.25-.11.35.35 0 0 1 0-.5l.8-.81a.36.36 0 0 1 .51 0l.71.72a.35.35 0 0 1-.5.5l-.47-.46-.55.55a.36.36 0 0 1-.25.11zM1.69 14.09a.37.37 0 0 1-.26-.1.36.36 0 0 1 0-.51l1.08-1.07a.35.35 0 0 1 .5 0 .36.36 0 0 1 0 .51L1.94 14a.35.35 0 0 1-.25.09z"
                  class="color9495fa svgShape"
                />
                <path
                  fill="#ea4335"
                  d="M23.49 5.84a.35.35 0 0 1-.25-.1.36.36 0 0 1 0-.51L24.49 4a.36.36 0 0 1 .51.51l-1.25 1.23a.37.37 0 0 1-.26.1Z"
                  class="colorff4b4d svgShape"
                />
                <path
                  fill="#34a853"
                  d="M7.46 32a.35.35 0 0 1-.25-.1.36.36 0 0 1 0-.51l1.25-1.25a.36.36 0 0 1 .51 0 .35.35 0 0 1 0 .5L7.72 31.9a.37.37 0 0 1-.26.1Z"
                  class="color0000db svgShape"
                />
                <path
                  fill="url(#a)"
                  d="M22.6 10.38a7.68 7.68 0 0 0-2.38-1.87 5.22 5.22 0 0 0-3.49 0A15 15 0 0 0 13.52 10l-8.86 5.11a5.94 5.94 0 0 0-1.77 1.36 3.84 3.84 0 0 0-.24 3.94 8.61 8.61 0 0 0 2.76 3.06A31.21 31.21 0 0 1 8.67 26c.92.92 1.63 2 2.54 2.94A9.61 9.61 0 0 0 22 30.75c2.54-1.28 4.35-3.61 6.07-5.87 1.25-1.65 2.56-3.46 2.57-5.53a5 5 0 0 0-3.13-4.52c-1.95-.83-3.44-2.94-4.91-4.45Z"
                />
                <path
                  fill="#feeebe"
                  stroke="#0052db"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width=".66"
                  d="M9.77 12.14v4.79l-2.75-2.35 2.75-2.44zM26.52 14.58l-2.74 2.26v-4.25l2.74 1.99z"
                  class="colorfed3be svgShape colorStroke0000db svgStroke"
                />
                <path
                  fill="#4285f4"
                  stroke="#0052db"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width=".66"
                  d="M23.78 9.26v7.58l-3.31 2.73-3.28 2.71a.91.91 0 0 1-1.18 0l-3-2.6-3.2-2.74V7.62a.61.61 0 0 1 .57-.62h11.14v1.65a.61.61 0 0 0 .61.61Z"
                  class="color9495fa svgShape colorStroke0000db svgStroke"
                />
                <path
                  fill="#fff"
                  d="M16.54 23.2c-.05 0-.07-.31-.14-.37l-3.33-1.3-2.69-4.08V7.62h11.14l.79.75c0 .67-.67 0 0 0l.86.89v8.09l-3.08 3.83-3.2 2.57c-.05.05-.27-.55-.35-.55Z"
                  class="colorffffff svgShape"
                />
                <path
                  fill="none"
                  stroke="#0052db"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width=".66"
                  d="M23.78 9.26h-1.65a.61.61 0 0 1-.61-.61V7ZM16.09 9.52h3.52M16.09 11.85h5.43M16.09 14.18h5.43M16.09 16.51h5.43"
                  class="colorStroke0000db svgStroke"
                />
                <path
                  fill="#f87166"
                  stroke="#0052db"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width=".66"
                  d="M13.66 12.41a1.51 1.51 0 0 1-.12.61 1 1 0 0 1-.9.7 1.19 1.19 0 0 1-1-1.31 1.19 1.19 0 0 1 1-1.31.82.82 0 0 1 .43.12h0a1.37 1.37 0 0 1 .59 1.19Z"
                  class="colorf86c66 svgShape colorStroke0000db svgStroke"
                />
                <path
                  fill="none"
                  stroke="#0052db"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width=".66"
                  d="M12.8 13.72a1.15 1.15 0 0 1-.17.35.38.38 0 0 0 .06.55h0c.28.2-.06.56-.06.56a.32.32 0 0 0-.08.32"
                  class="colorStroke0000db svgStroke"
                />
                <path
                  fill="#feeebe"
                  stroke="#0052db"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width=".66"
                  d="M15 11.83a1.37 1.37 0 0 1-.61 1.17.8.8 0 0 1-.43.12.79.79 0 0 1-.42-.12 1.51 1.51 0 0 0 .12-.61 1.37 1.37 0 0 0-.59-1.19h0a1 1 0 0 1 .89-.7 1 1 0 0 1 .91.72 1.63 1.63 0 0 1 .13.61Z"
                  class="colorfed3be svgShape colorStroke0000db svgStroke"
                />
                <path
                  fill="none"
                  stroke="#0052db"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width=".66"
                  d="M14.12 13.14a1.15 1.15 0 0 1-.17.35.39.39 0 0 0 .06.56h0c.28.2-.06.56-.06.56a.32.32 0 0 0-.08.32"
                  class="colorStroke0000db svgStroke"
                />
                <path
                  fill="#fbbc05"
                  stroke="#0052db"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width=".66"
                  d="M26.25 25.36a.92.92 0 0 1-.64.27H7.94a.92.92 0 0 1-.65-.27L13 19.67l3 2.6a.91.91 0 0 0 1.18 0l3.28-2.71Z"
                  class="colorff9d23 svgShape colorStroke0000db svgStroke"
                />
                <path
                  fill="#fbbc05"
                  stroke="#0052db"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width=".66"
                  d="m13 19.67-5.71 5.69a.94.94 0 0 1-.29-.65V14.58l2.75 2.35zm13.52-5.09v10.13a.9.9 0 0 1-.27.65l-5.78-5.79 3.31-2.73z"
                  class="colorff9d23 svgShape colorStroke0000db svgStroke"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="md:h-10 sm:h-8 h-6 w-6 md:w-10 sm:w-8  inline text-blue-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>{" "}
              <span class="top-0.5 relative">No Invites Received</span>
            </p>
          ) : (
            <>
              {projects2 &&
                arr2 &&
                arr2.map((joinR, i) => {
                  return (
                    <div
                      data-aos={"fade-up"}
                      data-aos-once="true"
                      class={`rounded-lg col-span-1 -mt-1 z-[75] pointer-events-auto ${
                        arr2 && arr2.length === 1
                          ? "md:col-start-2 lg:col-start-2 sm:col-start-2  col-start-1 lg:col-span-1 sm:col-span-2 col-span-4 relative"
                          : ""
                      } shadow-lg bg-white `}
                    >
                      <a href="#!">
                        <img
                          class="rounded-t-lg scale-75 -my-5 "
                          src={projects2[i] ? projects2[i].projPic : ""}
                          alt=""
                        />
                      </a>
                      <div class="p-6 border-t-[1px] border-gray-400 text-center sm:text-left pointer-events-auto z-50">
                        <h5 class="text-gray-900 relative bottom-1 mt-1  text-xl font-medium mb-2">
                          Invite : {projects2[i] ? projects2[i].name : ""}
                        </h5>
                        <p class="text-gray-700 lg:text-base text-sm mb-1 mt-1.5">
                          {projects2[i] ? projects2[i].problem : ""}
                        </p>
                        <p class="text-gray-700 text-sm mb-3 mt-2.5">
                          Admin Name:{" "}
                          {projects2[i] ? projects2[i].admin.name : ""}
                          <br />
                          View profile:{" "}
                          <p
                            onClick={() => {
                              localStorage.setItem(
                                "viewToken",
                                projects2[i].admin.id
                              );
                              window.open(
                                process.env.NODE_ENV === "production"
                                  ? "https://ideastack.org/viewProfile"
                                  : "http://localhost:3000/viewProfile",
                                "_blank"
                              );
                            }}
                            class="text-blue-700 w-fit text-center mx-auto md:inline block hover:underline relative text-sm font-semibold hover:text-blue-800 cursor-pointer"
                          >
                            {" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-4 w-4 mr-[4px] inline relative bottom-[2px]"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            <span class="inline">Click Here</span>
                          </p>
                        </p>
                        <h3
                          class={`font-semibold tracking-wide relative top-1 lg:text-base text-sm lg:mt-5 mt-3 lg:mb-0 mb-[1px]  text-indigo-600 ${
                            joinR.appStatus === "Invited" ||
                            joinR.appStatus === "Rejected"
                              ? "text-center"
                              : ""
                          }`}
                        >
                          Status: {arr2[i].appStatus}
                        </h3>

                        <div class="z-[90] relative  lg:text-base text-sm pointer-events-auto">
                          {joinR.appStatus === "Invited" ? (
                            <div class="relative mt-6 mb-1 mx-auto z-[75]   grid grid-cols-2 gap-2">
                              <button
                                onClick={() => confirmRejectionInvite(i, 2)}
                                class="shadow-md z-[75] text-sm hover:shadow-xl cursor-pointer active:shadow-sm  text-center justify-center pointer-events-auto bg-gradient-to-r from-orange-600 to-orange-500  p-3 py-2 pt-1.5 rounded-lg text-white font-semibold"
                              >
                                Reject Invite
                              </button>
                              <button
                                onClick={() => confirmInvite(i)}
                                class="shadow-md text-sm hover:shadow-xl z-[75]   cursor-pointer active:shadow-sm  text-center justify-center bg-gradient-to-r pointer-events-auto from-blue-600 to-indigo-500 p-3 py-2 rounded-lg text-white font-semibold"
                              >
                                Confirm Invite and Join
                              </button>
                            </div>
                          ) : joinR.appStatus === "Rejected" ? (
                            <button
                              onClick={() => confirmRejection(i)}
                              class="shadow-md hover:shadow-xl cursor-pointer lg:text-base text-sm  z-40 active:shadow-sm relative mt-4 mb-3.5 mx-auto block text-center justify-center bg-gradient-to-r from-orange-600 to-orange-500 p-5 left-[1px] py-2 rounded-lg text-white font-semibold"
                            >
                              Remove Project Request
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </>
          )
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default JoinRequests;
