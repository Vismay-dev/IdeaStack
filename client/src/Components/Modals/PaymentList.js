import { useEffect, useState } from "react"

import ReactTooltip from 'react-tooltip';
import ClipLoader from "react-spinners/ClipLoader"

const PaymentList = (props) => {

    
    
    return (
        <div class="lg:px-3 px-0 lg:left-0 left-[1px] mt-3 relative w-full">
           
            <div class="bg-gradient-to-r from-blue-100 left-2 relative to-indigo-200 pt-2 mt-9 mb-1 lg:mt-7 rounded-md shadow-lg pb-8  sm:px-4 px-1 ">
                
                
             <>  
                <div class="items-center top-2 mb-1.5 lg:px-36 md:px-3 sm:px-4 px-1  text-center  relative">
                        <p class="lg:text-lg md:text-base text-sm lg:text-gray-700 text-gray-900 my-2  underline font-semibold leading-5 mx-auto relative block ">Payment by all team members is required for scheduling of session with industry expert. </p>
                
                        <p class = 'xl:hidden block mx-auto text-center sm:mt-2.5 mt-4 sm:mb-10 mb-8 relative md:text-base text-sm sm:px-16 px-1.5  '><strong class = 'underline'>Note:</strong> Horizontally scroll panels to see more details on pending payments</p>

                </div>

                <div class="mt-7 overflow-x-auto">
                    <table class=" whitespace-nowrap xl:w-9/12   lg:w-11/12 w-[700px] relative mx-auto space-y-2">
                        <tbody class = 'space-y-2'>

                            {


props.loading?
<div class ='relative mx-auto my-8 mb-10 pb-3 pt-1.5 text-center block justify-center'>
<ClipLoader color={'#0b0bbf'} loading={props.loading}  size={70} />
</div>
:
                            
                            
                            
                            
                            
                            props.payments&&props.payments.map((payment, i)=> {

function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }

  let dateUploaded = convertDate(payment.dateOfUpload) 


                                return (

                                    <tr key = {i} tabindex="0" class="focus:outline-none xl:w-8/12 lg:w-full w-[110%] overflow-scroll h-16 border bg-white border-gray-300 mb-3   relative shadow-md rounded">
                                    <td>
                                        <div class="xl:ml-5 ml-0 lg:mr-0 md:mr-2 mr-3">
                                            <div class="rounded-sm w-5 -mr-2  h-5  flex flex-shrink-0 justify-center items-center relative">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 top-[0.5px] -mr-7 relative text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
</svg>
                                              
                                            </div>
                                        </div>
                                    </td>
                                    <td class="lg:ml-0 ml-2">
                                        <div class="flex items-center pl-5">
                                            <p class="text-sm font-medium leading-none text-gray-700 mr-2">{payment.name}</p>
                                           
                                        </div>
                                    </td>

                                    <td class="pl-5 -mr-3 relative">

                                    
                                    {
                                        i===0?
                                        <div class="flex items-center relative left-1 -mr-8">
                 

    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 top-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path d="M12 14l9-5-9-5-9 5 9 5z" />
  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
<path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
</svg>
                                            <p class="text-sm leading-none text-gray-600 ml-2">Project Admin</p>
                                        </div>
                                    :''
                                    }
                                                                        </td>

                                   
                                    <td class="pl-5 -mr-6 relative">
                                <h1 class = 'text-sm relative left-8'>Pending Payment Amount: <span class = 'font-semibold underline'>AED {payment.amount}</span></h1>
                                    </td>



                       
                                </tr>

                                )

                            })}

                          
                            
                       
                        </tbody>
                    </table>
                </div>
</> 
             
        </div>      

        </div> 
    )
}

export default PaymentList