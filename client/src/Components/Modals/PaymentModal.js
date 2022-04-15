import { useEffect, useState, useRef, useContext } from "react"
import axios from 'axios'
import AOS from 'aos';
import "aos/dist/aos.css";
import { StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react'
import {useHistory} from 'react-router-dom'
import { useLocation } from "react-router-dom";
import logo from './logo.png'

  
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const PaymentModal = (props) => {
const location = useLocation()
  
      const myRef = useRef()
    
    useEffect(
      () => {
        const listener = (event) => {
          // Do nothing if clicking ref's element or descendent elements
          if (!myRef.current || myRef.current.contains(event.target)) {
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
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because the passed-in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [myRef, () => props.close()]
    );


    const history = useHistory()

    const [showConfirm, setShowConfirm] = useState(false)
    const [confirmPayment, setConfirmPayment] = useState(false)

    useEffect(() => {
      AOS.init({
        duration : 1000
      });
    }, [showConfirm, confirmPayment]);


        const [teamSize, setTeamSize] = useState();
        const [numberOfSessions, setNumberOfSessions] = useState();
        const [expert, setExpert] = useState();
        const [mentorshipPackage, setMentorshipPackage] = useState();
        const [payment, setPayment] = useState();
   

        useEffect(()=> {
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/getTeamContacts':'http://localhost:4000/api/project/getTeamContacts',{token:sessionStorage.getItem('token'), projectID:sessionStorage.getItem('managing')}).then(res=> {
            setTeamSize(res.data.length)
            }).catch(err=> {
                console.log(err)
            })    
        setExpert(props.expert);
        setMentorshipPackage({
            ...props.expert,
            teamSize: teamSize,
            individualCostPerSession: props.expert.pricing[0]/teamSize
          })
        setNumberOfSessions(props.expert.numberOfSessions);

        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/getLatestPendingPayment':'http://localhost:4000/api/user/getLatestPendingPayment',{token:sessionStorage.getItem('token'), projectID:sessionStorage.getItem('managing')}).then(res=> {
            setPayment(res.data.payment)
            }).catch(err=> {
                console.log(err)
            })    
         
    },[props.expert])

    const [paymentInfo, setPaymentInfo] = useState({})


    const submitHandler = (e) => {
        e.preventDefault();

        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/completeLatestPendingPayment':'http://localhost:4000/api/user/completeLatestPendingPayment',{token:sessionStorage.getItem('token'), projectID:sessionStorage.getItem('managing')}).then(res=> {
            console.log(res.data)
            setConfirmPayment(true)
    }).catch(err=> {
                console.log(err)
        })   

    }

    const nameHandler = (e) => {
        setPaymentInfo({
            ...paymentInfo,
            name: e.target.value
        })
    }

    const cardNumberHandler = (e) => {
        setPaymentInfo({
            ...paymentInfo,
            cardNumber: e.target.value
        })
    }

    const expDateHandler = (e) => {
        setPaymentInfo({
            ...paymentInfo,
            expDate: e.target.value
        })
    }

    const securityCodeHandler = (e) => {
        setPaymentInfo({
            ...paymentInfo,
            securityCode: e.target.value
        })
    }   
  
  

    return (
        <div class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay, show/hide based on modal state. */}
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      
          {/* This element is to trick the browser into centering the modal contents. */}
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
   
          <div ref = {myRef} data-aos={"fade-up"} data-aos-once='true' class={`bg-cover inline-block align-bottom bg-gradient-to-br from-blue-50 to-indigo-300 rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:mt-5 sm:align-middle xl:w-10/12 sm:w-11/12 w-[95%]`}>
            
            


<h1 class = 'lg:text-5xl md:text-4xl text-3xl px-5 font-bold text-gray-800 text-center relative mx-auto my-5 top-8'>Complete Pending Payment</h1>
<h3 class = 'lg:text-lg md:text-base text-sm  lg:w-2/5 md:w-3/5 w-4/5 sm:px-0 px-3 font-medium text-gray-600 text-center relative mx-auto -mb-10 left-1 top-7'>Note: Session with Industry Expert will be scheduled after all team members have paid.</h3>
        
        <hr class = 'relative mx-auto block w-6/12 left-1  border-gray-400 top-[88px]'/>
        <div class="w-11/12 col-span-1 top-9 relative block mx-auto mt-6 mb-3 right-3    xl:px-2">
           
           {


confirmPayment?
<div data-aos = 'fade-up' data-aos-once = 'true' class="bg-white p-6 pt-4 lg:w-7/12 md:w-9/12 w-[95%] ml-5 relative md:left-[15px] md:mx-auto left-[3px] mt-[105px] rounded-md shadow-xl mb-40  mx-auto">
<svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
    <path fill="currentColor"
        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
    </path>
</svg>
<div class="text-center">
    <h3 class="md:text-2xl mb-4 text-xl text-gray-900 font-semibold text-center">Payment Done!</h3>
    <p class="text-gray-600 my-2 mb-4">Thank you for completing your secure online payment.</p>
    <p class = 'font-semibold'> Your Payment Invoice Has Been Mailed to You  </p>
  
    <div class="pb-7 lg:pt-10 sm:pt-12 pt-9 text-center sm:block grid sm:px-0 px-1 sm:right-0 right-1 grid-cols-2 gap-3">
        <a onClick={()=> props.close()} class="px-8 order-2 sm:order-1 cursor-pointer sm:ml-1 sm:col-span-1 col-span-2 sm:mr-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold sm:py-3 py-2">
            CLOSE
       </a>
       <a href="#" class="px-8 sm:col-span-1 col-span-2 bg-indigo-600 cursor-pointer  hover:bg-indigo-500 text-white font-semibold sm:py-3 py-2">
            DOWNLOAD INVOICE
       </a>
    </div>
</div>
</div>

:
showConfirm ?







<div className="mt-20 mb-[146px] relative">
            <div className="px-4 mb-[42px] text-center left-4 top-1.5 relative sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Payment Information</h3>
              <p className="mt-1 text-sm text-gray-600">We prioritize the encryption and security of your data.</p>

              <h3 className="text-lg mt-4 font-medium leading-6 text-gray-900">Total Amount: AED {payment&payment}</h3>

          </div>
          <div data-aos = 'zoom-in-up' data-aos-once = 'true' className="mt-1 md:mt-0 lg:w-6/12 md:w-8/12 sm:w-10/12 w-11/12 shadow-xl relative sm:top-0 top-1.5 mx-auto block left-3.5">
            <form onSubmit={submitHandler}>
              <div className="shadow my-4 overflow-hidden md:rounded-md rounded-lg">
                <div  className="px-4 py-5 sm:pb-7 pt-2 bg-white  sm:p-6">

                    {
                        <img src = {logo} class = 'w-40 h-40 -mt-4 -mb-1.5 relative mx-auto block'></img>
                    }
                  <div className="grid grid-cols-6 gap-6">
                 

                    <div className="col-span-6">
                      <label htmlFor="last-name" className="block left-0.5 relative text-sm font-medium text-gray-700">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        required
                        onChange = {nameHandler}
                        name="last-name"
                        id="last-name"
                        placeholder="Ex: John Doe"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>


                    <div className="col-span-6">
                      <label htmlFor="card-number" className="block left-0.5 relative text-sm font-medium text-gray-700">
                        Card Number
                      </label>
                      <input
                        type="text"
                        required
                        name="card-number"
                        onChange = {cardNumberHandler}
                        id="card-number"
                        placeholder="Ex: 0000 0000 0000 0000"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="exp-date" className="block text-sm left-0.5 relative font-medium text-gray-700">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        required
                        name="exp-date"
                        id="exp-date"
                        onChange = {expDateHandler}
                        placeholder="mm/yy"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="secCode" className="block text-sm left-0.5 relative font-medium text-gray-700">
                        Security Code
                      </label>
                      <input
                        type="text"
                        required
                        name="secCode"
                        id="secCode"
                        onChange = {securityCodeHandler}
                        placeholder="Ex: 000"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                   
                  </div>
                </div>
                <div className="px-4 py-3.5  bg-gray-100 text-right sm:px-6">
                <button
                    onClick={()=> setShowConfirm(false)}
                    className="inline-flex justify-center sm:py-1.5 py-[6px]  mr-2 shadow-lg hover:shadow-2xl active:shadow-md sm:px-4 px-3  border border-transparent  text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center sm:py-1.5 py-[6px]  shadow-lg hover:shadow-2xl active:shadow-md sm:px-4 px-3 border border-transparent  text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Pay AED {payment&payment}
                  </button>
                </div>
              </div>
            </form>
          </div>
      </div>





:
               expert && 

               <>
               <svg xmlns="http://www.w3.org/2000/svg" class="xl:h-16 xl:w-16 w-14 h-14 absolute text-center justify-center xl:left-[36.3%] left-[35.5%] text-blue-700 lg:block hidden mx-auto top-[51%] translate-y-[-60%]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
               <path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
             </svg>
            
             
                     <div class = 'grid grid-cols-2 lg:right-[42px] lg:px-0 md:px-16 sm:px-10 px-2 my-40 mt-28 relative'>
             
                     <div 
                 class="max-w-xs bg-cover mb-6 mt-[72px] hidden relative lg:block mx-auto  bg-white rounded-lg bottom-5 shadow-lg dark:bg-gray-800">
                     <img class="object-cover h-[320px]  w-full" src={expert&&expert.pic} alt="avatar"/>
                     
                     <div class="py-5 pt-[52px] bottom-5 relative text-center">
                         <a href="#" class="block text-2xl font-bold text-gray-800 dark:text-white">{expert&& expert.name}</a>
                         <span class="text-sm text-gray-700 dark:text-gray-200">{expert&&expert.role}</span>
                     </div>
                 </div>

               <div class="p-5 pt-10 md:pb-7 px-6 md:p-12 lg:col-span-1 lg:left-0 left-3 relative col-span-2 rounded-sm shadow-lg bg-blue-700">
            <h2 class="mb-8 relative bottom-3 lg:text-4xl md:text-3xl text-2xl font-bold font-heading text-white">Your Pending Payment For This Mentor <span class = 'lg:hidden inline'> - {expert&& expert.name}</span></h2>
            <div class="flex mb-8 items-center justify-between pb-5 border-b border-blue-100">
              <span class="text-blue-50 text-md">No. of Sessions</span>
              <span class="sm:text-xl text-lg sm:font-bold font-semibold font-heading text-white">{numberOfSessions}</span>
            </div>
            <h4 class="sm:mb-2 text-xl relative bottom-2 font-bold font-heading text-white">Pricing</h4>
            <div class="sm:flex sm:mb-2 mb-4 sm:mt-0 mt-2 justify-between items-center">
              <span class="text-blue-50 text-md sm:no-underline underline">Total Payment Required By Team</span><br class = 'sm:hidden block'/>
              <span class="sm:text-lg sm:mt-0 mt-6 sm:mb-0 mb-16 relative text-base sm:font-bold font-semibold font-heading text-white">AED {numberOfSessions&&numberOfSessions*expert.pricing[0]}</span>
            </div>
            <div class="sm:flex sm:mb-10 mb-7 justify-between items-center">
              <span class="text-blue-50 text-md sm:no-underline underline ">Individual Payment Per Session</span><br class = 'sm:hidden block'/>
              <span class="sm:text-lg sm:mt-0 mt-6 relative text-base sm:font-bold font-semibold font-heading text-white">AED {expert.pricing[0]&&expert.pricing[0]/parseFloat(teamSize)}</span>
            </div>
            <div class="sm:flex mb-10 justify-between items-center">
              <span class="sm:text-xl sm:no-underline underline text-lg sm:font-bold font-semibold font-heading text-white">Subtotal Individual Cost</span><br class = 'sm:hidden block'/>
              <span class="sm:text-xl sm:mt-0 mt-6 relative text-lg sm:font-bold font-semibold font-heading text-white">AED {payment&&payment}</span>
            </div>
            <div class = 'grid-cols-3 grid w-[340px]  gap-3 mt-10 mb-4'>

    <button
    onClick = {()=> {setShowConfirm(true)}}
  className="block w-full py-3 bg-slate-300 hover:bg-slate-400 col-span-2 border border-transparent rounded-md  px-3  items-center justify-center text-base font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
 Confirm & Continue
    </button>
    </div>
          </div>
          </div>
             
         </>  
           }

        </div>







        <div class="bg-gray-50 px-3 -mt-14 shadow-md border-y-indigo-200 border-2 -mr-6 py-0 sm:px-6 sm:flex sm:flex-row-reverse ">
          
          <button onClick = {props.close} type="button" class="sm:-left-6 left-1 relative h-11 w-11/12 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-7 py-2 font-semibold pb-3 bg-white text-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-5 mb-5 sm:w-auto sm:text-md">
            Close
          </button>
          
        </div>

        
            </div>
        
        </div>


        </div>
   
    )
}

export default PaymentModal