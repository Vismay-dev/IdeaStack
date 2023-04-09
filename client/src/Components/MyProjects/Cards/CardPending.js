import axios from "axios";
import React, { useEffect, useState } from "react";
import { GiCash } from "react-icons/gi";
import { useRouter } from "next/router";
import ClipLoader from "react-spinners/ClipLoader";

// components

export default function CardSocialTraffic() {
  const [loading, setLoading] = useState(false);
  const [pendingPayments, setPendingPayments] = useState([]);
  const location = useRouter();

  // useEffect(()=> {
  //   setLoading(true)
  //   axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/getTeam':'http://localhost:4000/api/project/getTeam',{token:sessionStorage.getItem('token'),projectID:sessionStorage.getItem('managing')}).then(res=> {
  //     setPendingPayments(res.data)
  //     setLoading(false)
  //   })
  // },[location.pathname])

  return (
    <>
      <div className="relative flex flex-col xl:mt-0 xl:mb-6 -mt-9 mb-10  min-w-0 break-words  h-[380px] bg-white w-full shadow-lg rounded">
        <div
          style={{
            backgroundImage:
              "url(https://www.vapulus.com/en/wp-content/uploads/2021/02/challenge-accepting-online-payments-technical-issue-1024x768-1.png)",
          }}
          className="rounded-t bg-cover mb-0 px-1 py-3 border-0"
        >
          <div className="flex flex-wrap items-center">
            <div className="relative w-full ml-3 left-1 py-[5px]  max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blue-700 text-md text-blueGray-700">
                <GiCash class="text-xl  text-white bottom-0.5 relative inline" />{" "}
                Pending Payments
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full  h-[320px] overflow-scroll">
          {/* Projects table */}
          <table className="items-center w-full  bg-transparent border-collapse">
            {loading ? (
              <div class="relative mx-auto my-8 mb-14 bottom-8 pb-3 pt-[21%] border-t-[1px] border-gray-300 w-full text-center items-center block justify-center">
                <ClipLoader color={"#0b0bbf"} loading={loading} size={80} />
              </div>
            ) : (
              <>
                <thead class="sticky top-0  z-40 bg-white   shadow-sm  pb-1 ">
                  <tr>
                    <th className="px-6 relative mx-auto bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Team Member
                    </th>
                    <th className="-px-2 mx-auto relative bg-blueGray-50 text-blue-700 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Pending Amount
                    </th>
                    <th className=" bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
                  </tr>
                </thead>

                <tbody class=" relative">
                  {pendingPayments &&
                    pendingPayments.map((pendingPayment, i) => {
                      let totalAmnt = 0;

                      if (pendingPayment.pendingPayments) {
                        for (
                          let i = 0;
                          i < pendingPayment.pendingPayments.length;
                          i++
                        ) {
                          totalAmnt += pendingPayment.pendingPayments[i];
                        }
                      }

                      return (
                        <tr key={i}>
                          <th className="border-t-0 relative left-2 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                            {pendingPayment.name}
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                            AED {totalAmnt}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>
    </>
  );
}
