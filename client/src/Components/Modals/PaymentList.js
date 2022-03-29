import { useEffect, useState } from "react"

import ReactTooltip from 'react-tooltip';

const PaymentList = (props) => {

    
    
    return (
        <div class="px-3 mt-3 relative w-full">
           
            <div class="bg-gradient-to-r from-blue-100 to-indigo-200 pt-4 mt-7 rounded-md shadow-lg pb-6  px-4 ">
                
                
             <>  
                <div class="sm:flex items-center top-2 mb-1.5 px-80  text-center  relative justify-between">
                        <p class="text-lg text-gray-700 my-2  font-semibold leading-5 mx-auto relative block ">Payment by all team members is required for scheduling of session with industry expert. </p>
                </div>
                <div class="mt-7 overflow-x-auto">
                    <table class=" whitespace-nowrap w-9/12 relative mx-auto space-y-2">
                        <tbody class = 'space-y-2'>

                            {props.payments&&props.payments.map((payment, i)=> {

function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }

  let dateUploaded = convertDate(payment.dateOfUpload) 


                                return (

                                    <tr key = {i} tabindex="0" class="focus:outline-none w-8/12 h-16 border bg-white border-gray-300 mb-3 relative shadow-md rounded">
                                    <td>
                                        <div class="ml-5">
                                            <div class="rounded-sm w-5 -mr-2  h-5  flex flex-shrink-0 justify-center items-center relative">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 top-[0.5px] -mr-7 relative text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
</svg>
                                              
                                            </div>
                                        </div>
                                    </td>
                                    <td class="">
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