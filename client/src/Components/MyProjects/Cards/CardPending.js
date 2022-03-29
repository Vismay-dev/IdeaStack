import React from "react";
import {GiCash} from 'react-icons/gi'

// components

export default function CardSocialTraffic() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div  style = {{'backgroundImage':'url(https://www.vapulus.com/en/wp-content/uploads/2021/02/challenge-accepting-online-payments-technical-issue-1024x768-1.png)'}} className="rounded-t bg-cover mb-0 px-1 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full ml-3 left-1   max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blue-700 text-md text-blueGray-700">
              <GiCash class = 'text-xl  text-white bottom-0.5 relative inline'/> Pending Payments
              </h3>
            </div>
            <div className="relative w-full px-4 py-1 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-sm font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 shadow-lg ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light">
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
            <tbody>
              <tr>
                <th className="border-t-0 relative left-2 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                  Member 1
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                 AED 100
                </td>
                
              </tr>
              <tr>
                <th className="border-t-0 relative left-2 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                  Member 2
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                  AED 280
                </td>
                
              </tr>
              <tr>
                <th className="border-t-0 relative left-2 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                  Member 3
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                  AED 160
                </td>
                
              </tr>
              <tr>
                <th className="border-t-0 relative left-2 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                  Member 4
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                  AED 460
                </td>
                
              </tr>
              <tr>
                <th className="border-t-0 relative left-2 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                  Member 5
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                  AED 60
                </td>
                
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
