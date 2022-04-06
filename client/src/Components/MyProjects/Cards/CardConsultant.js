import React from "react";
import {FaChalkboardTeacher} from 'react-icons/fa'
// components

export default function CardPageVisits() {
  return (
    <>
      <div  className="relative flex flex-col min-w-0 break-words bg-white  h-[380px]  w-full mb-6 shadow-lg rounded">
        <div style = {{'backgroundImage':'url(https://media.istockphoto.com/photos/digital-cyberspace-with-particles-and-digital-data-network-high-picture-id1302189748?b=1&k=20&m=1302189748&s=170667a&w=0&h=s0o2dhTh40lrWLPt6rg54S0jCUywkr6h04rDdfStMq8=)'}} className="rounded-t px-4 py-3 border-0">
          <div className="flex flex-wrap  items-center">
            <div className="relative w-full px-2  py-1.5 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-white">
                <FaChalkboardTeacher class = 'text-xl mr-1 bottom-0.5 relative inline'/> Industry Mentorship - Info
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-sm shadow-md top-0.5 relative font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full  h-[320px] overflow-scroll pb-0 ">
          {/* Projects table */}
          <table className="items-center  w-full bg-white border-collapse">
            <thead class = 'sticky top-0  z-40 bg-white   shadow-sm  pb-1 '>
              <tr>
                <th className="px-6 bg-white  align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Mentor/Consultant
                </th>
                <th className="align-middle bg-white border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  No. of Sessions Held
                </th>
                <th className=" text-blue-700 bg-white align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Payment Pending
                </th>
                <th className="align-middle bg-white  border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Payment Made
                </th>
              </tr>
            </thead>
            <tbody class = 'z-30'>
              <tr class = 'relative top-[3px]'>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4  text-left">
                  /argon/
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap  p-4">
                  4,569
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                  340
                </td>
                <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                  <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                  46,53%
                </td>
              </tr>
              <tr class = 'relative top-[3px]'>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4  text-left">
                  /argon/
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap  p-4">
                  4,569
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                  340
                </td>
                <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                  <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                  46,53%
                </td>
              </tr> <tr class = 'relative top-[3px]'>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4  text-left">
                  /argon/
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap  p-4">
                  4,569
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                  340
                </td>
                <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                  <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                  46,53%
                </td>
              </tr>
              <tr class = 'relative top-[3px]'>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                  /argon/index.html
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                  3,985
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                  319
                </td>
                <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                  <i className="fas fa-arrow-down text-orange-500 mr-4"></i>
                  46,53%
                </td>
              </tr>
              <tr class = 'relative top-[3px]'>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                  /argon/charts.html
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                  3,513
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                  294
                </td>
                <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                  <i className="fas fa-arrow-down text-orange-500 mr-4"></i>
                  36,49%
                </td>
              </tr>
              <tr class = 'relative top-[3px]'>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                  /argon/tables.html
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                  2,050
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                  147
                </td>
                <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                  <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                  50,87%
                </td>
              </tr>
              <tr class = 'relative top-[3px]'>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                  /argon/profile.html
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                  1,795
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                  190
                </td>
                <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                  <i className="fas fa-arrow-down text-red-500 mr-4"></i>
                  46,53%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
