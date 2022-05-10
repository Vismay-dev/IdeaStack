
import {useState, useEffect} from 'react'
import axios from 'axios'
import { set } from 'mongoose'
import RingLoader from "react-spinners/RingLoader"


import AOS from 'aos';
import "aos/dist/aos.css";



const Contact = () => {
    
    const [mailer, setMailer] = useState({
        name:'',
        mailId:'',
        compname:'',
        country:'',
        message:''
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        AOS.init({
          duration : 1600
        });
      }, []);

    const nameHandler = e =>  setMailer({...mailer, name:e.target.value})
    const mailHandler = e =>  setMailer({...mailer, mailId:e.target.value})
    const messageHandler = e =>  setMailer({...mailer, message:e.target.value})
    
    const formSub = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post(process.env.NODE_ENV ==='production'?"https://ideastack.herokuapp.com/api/user/sendUserQuery":"http://localhost:4000/api/user/sendUserQuery",mailer).then(res=> {
            console.log(res.data)
            setTimeout(()=> {
                setLoading(false)
            },1400)
            setMailer({})
            
        }).catch(err=> {
            console.log(err.response)
        })
    }

    

    return (

            <section id = "contact" class=" xl:py-[160px] lg:mt-8 mt-4 xl:pb-28 py-[125px] pb-36 lg:py-[120px] lg:pb-[100px] -mb-[516px] border-t-2 border-dashed border-blue-700  overflow-hidden relative z-75">
               <div class="container mx-auto">
                  <div class="flex flex-wrap  top-4     mx-auto justify-center">
                     <div class="w-full xl:ml-12 xl:mr-0 lg:w-full  justify-center  mx-auto xl:w-6/12 px-8">
                        <div data-aos="fade-up" data-aos-once='true' class="max-w-[570px] mb-7 lg:-mb-2 relative xl:top-5 -top-6 xl:mx-0 mx-auto">
                           <span class="block mb-4 xl:text-left text-center text-blue-700 text-lg uppercase text-primary font-semibold">
                           Contact Us
                           </span>
                           <h2
                              class="
                              text-dark
                              mb-6
                              xl:text-left text-center
                              uppercase
                              font-bold
                              text-[32px]
                              sm:text-[40px]
                              lg:text-[36px]
                              xl:text-[40px]
                              "
                              >
                              GET IN TOUCH WITH US
                           </h2>
                           <p class="text-base xl:text-left text-center text-body-color leading-relaxed mb-9">
                              Any queries? Send us a message. We'll respond as soon as possible!
                           </p>
                           <div class="flex mb-8 xl:mx-0 mx-auto max-w-[370px] w-full">
                              <div
                                 class="
                                 max-w-[60px]
                                 sm:max-w-[70px]
                                 w-full
                                 h-[60px]
                                 sm:h-[70px]
                                 flex
                                 items-center
                                 justify-center
                                 overflow-hidden
                                 bg-primary bg-opacity-5
                                 text-primary
                                 rounded
                                 
                                 "
                                 >
                                 <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    class="fill-current"
                                    >
                                    <path
                                       d="M21.8182 24H16.5584C15.3896 24 14.4156 23.0256 14.4156 21.8563V17.5688C14.4156 17.1401 14.0649 16.7893 13.6364 16.7893H10.4026C9.97403 16.7893 9.62338 17.1401 9.62338 17.5688V21.8173C9.62338 22.9866 8.64935 23.961 7.48052 23.961H2.14286C0.974026 23.961 0 22.9866 0 21.8173V8.21437C0 7.62972 0.311688 7.08404 0.818182 6.77223L11.1039 0.263094C11.6494 -0.0876979 12.3896 -0.0876979 12.9351 0.263094L23.2208 6.77223C23.7273 7.08404 24 7.62972 24 8.21437V21.7783C24 23.0256 23.026 24 21.8182 24ZM10.3636 15.4251H13.5974C14.7662 15.4251 15.7403 16.3995 15.7403 17.5688V21.8173C15.7403 22.246 16.0909 22.5968 16.5195 22.5968H21.8182C22.2468 22.5968 22.5974 22.246 22.5974 21.8173V8.25335C22.5974 8.13642 22.5195 8.01949 22.4416 7.94153L12.1948 1.4324C12.0779 1.35445 11.9221 1.35445 11.8442 1.4324L1.55844 7.94153C1.44156 8.01949 1.4026 8.13642 1.4026 8.25335V21.8563C1.4026 22.285 1.75325 22.6358 2.18182 22.6358H7.48052C7.90909 22.6358 8.25974 22.285 8.25974 21.8563V17.5688C8.22078 16.3995 9.19481 15.4251 10.3636 15.4251Z"
                                       />
                                 </svg>
                              </div>
                              <div class="w-full">
                                 <h4 class="font-bold text-dark text-xl xl:text-left
                                 text-center mb-1">Our Location</h4>
                                 <p class="text-base xl:text-left
                                 text-center text-body-color">
                                    Dubai, United Arab Emirates (UAE) 
                                 </p>
                              </div>
                           </div>
                         
                           <div class="flex mb-2 xl:mx-0 mx-auto max-w-[370px] w-full">
                              <div
                                 class="
                                 max-w-[60px]
                                 sm:max-w-[70px]
                                 w-full
                                 h-[60px]
                                 sm:h-[70px]
                                 flex
                                 items-center
                                 justify-center
                                 
                                 overflow-hidden
                                 bg-primary bg-opacity-5
                                 text-primary
                                 rounded
                                 "
                                 >
                                 <svg
                                    width="28"
                                    height="19"
                                    viewBox="0 0 28 19"
                                    class="fill-current"
                                    >
                                    <path
                                       d="M25.3636 0H2.63636C1.18182 0 0 1.16785 0 2.6052V16.3948C0 17.8322 1.18182 19 2.63636 19H25.3636C26.8182 19 28 17.8322 28 16.3948V2.6052C28 1.16785 26.8182 0 25.3636 0ZM25.3636 1.5721C25.5909 1.5721 25.7727 1.61702 25.9545 1.75177L14.6364 8.53428C14.2273 8.75886 13.7727 8.75886 13.3636 8.53428L2.04545 1.75177C2.22727 1.66194 2.40909 1.5721 2.63636 1.5721H25.3636ZM25.3636 17.383H2.63636C2.09091 17.383 1.59091 16.9338 1.59091 16.3499V3.32388L12.5 9.8818C12.9545 10.1513 13.4545 10.2861 13.9545 10.2861C14.4545 10.2861 14.9545 10.1513 15.4091 9.8818L26.3182 3.32388V16.3499C26.4091 16.9338 25.9091 17.383 25.3636 17.383Z"
                                       />
                                 </svg>
                              </div>
                              <div class="w-full">
                                 <h4 class="font-bold text-dark text-xl mb-1 xl:text-left
                                 text-center">
                                    Email Address
                                 </h4>
                                 <p class="text-base text-body-color xl:text-left
                                 text-center">ideastackapp@gmail.com</p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="w-full lg:w-1/2 xl:w-5/12 xl:right-12 top-4  z-75 relative px-4">
                        <div data-aos="fade-up" data-aos-once='true' delay = '200' class="bg-gradient-to-r  z-75 from-blue-100 to-indigo-300  relative rounded-lg p-8 sm:p-12 shadow-lg">
                        {!loading?<form onSubmit = {formSub} class = 'z-75'>
                              <div class="mb-6">
                                 <input
                                 onChange = {nameHandler}
                                 name = 'name'
                                    type="text"
                                    placeholder="Your Name"
                                    required
                                    class="
                                    w-full
                                    rounded
                                    py-3
                                    px-[14px]
                                    border border-[#f0f0f0]
                                    shadow-md      
                                      text-body-color text-base
                                    outline-none
                                    focus-visible:shadow-none
                                    focus:border-primary
                                    "
                                    />
                              </div>
                              <div class="mb-6">
                                 <input
                                                      onChange = {mailHandler}
                                 name = 'email'
                                    type="email"
                                    placeholder="Your Email"
                                    required
                                    class="
                                    w-full
                                    rounded
                                    py-3
                                    px-[14px]
                                    text-body-color text-base
                                    border border-[#f0f0f0]
                                    shadow-md
                                    outline-none
                                    focus-visible:shadow-none
                                    focus:border-primary
                                    "
                                    />
                              </div>
                             
                              <div class="mb-6">
                                 <textarea
                                                      onChange = {messageHandler}
                                 name = 'message'
                                 required
                                    rows="7"
                                    placeholder="Your Message"
                                    class="
                                    w-full
                                    rounded
                                    py-3
                                    px-[14px]
                                    text-body-color text-base
                                    border border-[#f0f0f0]
                                    shadow-md
                                    resize-none
                                    outline-none
                                    focus-visible:shadow-none
                                    focus:border-primary
                                    "
                                    ></textarea>
                              </div>
                              <div>
                                 <button
                                    type="submit"
                                    class="
                                    shadow-md
                                    hover:shadow-lg
                                    active:shadow-sm
                                    w-full
                                    text-white
                                    bg-blue-700
                                    rounded
                                    z-[75]
                                    border border-primary
                                    p-3
                                    transition
                                    hover:bg-opacity-90
                                    "
                                    >
                                 Send Message
                                 </button>
                              </div>
                           </form>:<div class = ' mx-auto py-48 white  text-center relative block justify-center'>
                              <div class = 'bg-orange-600 z-40 relative right-14 bottom-16'><RingLoader color={"#364ed7"} loading={loading} size={115}  /></div></div>}
                           <div class = '-z-50'>
                              <span class="absolute -top-16 -z-50 -right-32">
                                 <svg
                                    width="100"
                                    height="100"
                                    viewBox="0 0 100 100"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <path
                                       fill-rule="evenodd"
                                       clip-rule="evenodd"
                                       d="M0 100C0 44.7715 0 0 0 0C55.2285 0 100 44.7715 100 100C100 100 100 100 0 100Z"
                                       fill="#3056D3"
                                       />
                                 </svg>
                              </span>
                              <span class="absolute  -right-10 top-[90px] z-[-100]">
                                 <svg
                                    width="34"
                                    height="134"
                                    viewBox="0 0 34 134"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <circle
                                       cx="31.9993"
                                       cy="132"
                                       r="1.66667"
                                       transform="rotate(180 31.9993 132)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="31.9993"
                                       cy="117.333"
                                       r="1.66667"
                                       transform="rotate(180 31.9993 117.333)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="31.9993"
                                       cy="102.667"
                                       r="1.66667"
                                       transform="rotate(180 31.9993 102.667)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="31.9993"
                                       cy="88"
                                       r="1.66667"
                                       transform="rotate(180 31.9993 88)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="31.9993"
                                       cy="73.3333"
                                       r="1.66667"
                                       transform="rotate(180 31.9993 73.3333)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="31.9993"
                                       cy="45"
                                       r="1.66667"
                                       transform="rotate(180 31.9993 45)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="31.9993"
                                       cy="16"
                                       r="1.66667"
                                       transform="rotate(180 31.9993 16)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="31.9993"
                                       cy="59"
                                       r="1.66667"
                                       transform="rotate(180 31.9993 59)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="31.9993"
                                       cy="30.6666"
                                       r="1.66667"
                                       transform="rotate(180 31.9993 30.6666)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="31.9993"
                                       cy="1.66665"
                                       r="1.66667"
                                       transform="rotate(180 31.9993 1.66665)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="17.3333"
                                       cy="132"
                                       r="1.66667"
                                       transform="rotate(180 17.3333 132)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="17.3333"
                                       cy="117.333"
                                       r="1.66667"
                                       transform="rotate(180 17.3333 117.333)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="17.3333"
                                       cy="102.667"
                                       r="1.66667"
                                       transform="rotate(180 17.3333 102.667)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="17.3333"
                                       cy="88"
                                       r="1.66667"
                                       transform="rotate(180 17.3333 88)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="17.3333"
                                       cy="73.3333"
                                       r="1.66667"
                                       transform="rotate(180 17.3333 73.3333)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="17.3333"
                                       cy="45"
                                       r="1.66667"
                                       transform="rotate(180 17.3333 45)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="17.3333"
                                       cy="16"
                                       r="1.66667"
                                       transform="rotate(180 17.3333 16)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="17.3333"
                                       cy="59"
                                       r="1.66667"
                                       transform="rotate(180 17.3333 59)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="17.3333"
                                       cy="30.6666"
                                       r="1.66667"
                                       transform="rotate(180 17.3333 30.6666)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="17.3333"
                                       cy="1.66665"
                                       r="1.66667"
                                       transform="rotate(180 17.3333 1.66665)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="2.66536"
                                       cy="132"
                                       r="1.66667"
                                       transform="rotate(180 2.66536 132)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="2.66536"
                                       cy="117.333"
                                       r="1.66667"
                                       transform="rotate(180 2.66536 117.333)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="2.66536"
                                       cy="102.667"
                                       r="1.66667"
                                       transform="rotate(180 2.66536 102.667)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="2.66536"
                                       cy="88"
                                       r="1.66667"
                                       transform="rotate(180 2.66536 88)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="2.66536"
                                       cy="73.3333"
                                       r="1.66667"
                                       transform="rotate(180 2.66536 73.3333)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="2.66536"
                                       cy="45"
                                       r="1.66667"
                                       transform="rotate(180 2.66536 45)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="2.66536"
                                       cy="16"
                                       r="1.66667"
                                       transform="rotate(180 2.66536 16)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="2.66536"
                                       cy="59"
                                       r="1.66667"
                                       transform="rotate(180 2.66536 59)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="2.66536"
                                       cy="30.6666"
                                       r="1.66667"
                                       transform="rotate(180 2.66536 30.6666)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="2.66536"
                                       cy="1.66665"
                                       r="1.66667"
                                       transform="rotate(180 2.66536 1.66665)"
                                       fill="#13C296"
                                       />
                                 </svg>
                              </span>
                         
                              <span class="absolute z-[-100] -left-96 -bottom-6">
                                 <svg
                                    width="107"
                                    height="134"
                                    viewBox="0 0 107 134"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <circle
                                       cx="104.999"
                                       cy="132"
                                       r="1.66667"
                                       transform="rotate(180 104.999 132)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="104.999"
                                       cy="117.333"
                                       r="1.66667"
                                       transform="rotate(180 104.999 117.333)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="104.999"
                                       cy="102.667"
                                       r="1.66667"
                                       transform="rotate(180 104.999 102.667)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="104.999"
                                       cy="88"
                                       r="1.66667"
                                       transform="rotate(180 104.999 88)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="104.999"
                                       cy="73.3333"
                                       r="1.66667"
                                       transform="rotate(180 104.999 73.3333)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="104.999"
                                       cy="45"
                                       r="1.66667"
                                       transform="rotate(180 104.999 45)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="104.999"
                                       cy="16"
                                       r="1.66667"
                                       transform="rotate(180 104.999 16)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="104.999"
                                       cy="59"
                                       r="1.66667"
                                       transform="rotate(180 104.999 59)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="104.999"
                                       cy="30.6666"
                                       r="1.66667"
                                       transform="rotate(180 104.999 30.6666)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="104.999"
                                       cy="1.66665"
                                       r="1.66667"
                                       transform="rotate(180 104.999 1.66665)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="90.3333"
                                       cy="132"
                                       r="1.66667"
                                       transform="rotate(180 90.3333 132)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="90.3333"
                                       cy="117.333"
                                       r="1.66667"
                                       transform="rotate(180 90.3333 117.333)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="90.3333"
                                       cy="102.667"
                                       r="1.66667"
                                       transform="rotate(180 90.3333 102.667)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="90.3333"
                                       cy="88"
                                       r="1.66667"
                                       transform="rotate(180 90.3333 88)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="90.3333"
                                       cy="73.3333"
                                       r="1.66667"
                                       transform="rotate(180 90.3333 73.3333)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="90.3333"
                                       cy="45"
                                       r="1.66667"
                                       transform="rotate(180 90.3333 45)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="90.3333"
                                       cy="16"
                                       r="1.66667"
                                       transform="rotate(180 90.3333 16)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="90.3333"
                                       cy="59"
                                       r="1.66667"
                                       transform="rotate(180 90.3333 59)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="90.3333"
                                       cy="30.6666"
                                       r="1.66667"
                                       transform="rotate(180 90.3333 30.6666)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="90.3333"
                                       cy="1.66665"
                                       r="1.66667"
                                       transform="rotate(180 90.3333 1.66665)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="75.6654"
                                       cy="132"
                                       r="1.66667"
                                       transform="rotate(180 75.6654 132)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="31.9993"
                                       cy="132"
                                       r="1.66667"
                                       transform="rotate(180 31.9993 132)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="75.6654"
                                       cy="117.333"
                                       r="1.66667"
                                       transform="rotate(180 75.6654 117.333)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="31.9993"
                                       cy="117.333"
                                       r="1.66667"
                                       transform="rotate(180 31.9993 117.333)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="75.6654"
                                       cy="102.667"
                                       r="1.66667"
                                       transform="rotate(180 75.6654 102.667)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="31.9993"
                                       cy="102.667"
                                       r="1.66667"
                                       transform="rotate(180 31.9993 102.667)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="75.6654"
                                       cy="88"
                                       r="1.66667"
                                       transform="rotate(180 75.6654 88)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="31.9993"
                                       cy="88"
                                       r="1.66667"
                                       transform="rotate(180 31.9993 88)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="75.6654"
                                       cy="73.3333"
                                       r="1.66667"
                                       transform="rotate(180 75.6654 73.3333)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="31.9993"
                                       cy="73.3333"
                                       r="1.66667"
                                       transform="rotate(180 31.9993 73.3333)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="75.6654"
                                       cy="45"
                                       r="1.66667"
                                       transform="rotate(180 75.6654 45)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="31.9993"
                                       cy="45"
                                       r="1.66667"
                                       transform="rotate(180 31.9993 45)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="75.6654"
                                       cy="16"
                                       r="1.66667"
                                       transform="rotate(180 75.6654 16)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="31.9993"
                                       cy="16"
                                       r="1.66667"
                                       transform="rotate(180 31.9993 16)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="75.6654"
                                       cy="59"
                                       r="1.66667"
                                       transform="rotate(180 75.6654 59)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="31.9993"
                                       cy="59"
                                       r="1.66667"
                                       transform="rotate(180 31.9993 59)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="75.6654"
                                       cy="30.6666"
                                       r="1.66667"
                                       transform="rotate(180 75.6654 30.6666)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="31.9993"
                                       cy="30.6666"
                                       r="1.66667"
                                       transform="rotate(180 31.9993 30.6666)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="75.6654"
                                       cy="1.66665"
                                       r="1.66667"
                                       transform="rotate(180 75.6654 1.66665)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="31.9993"
                                       cy="1.66665"
                                       r="1.66667"
                                       transform="rotate(180 31.9993 1.66665)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="60.9993"
                                       cy="132"
                                       r="1.66667"
                                       transform="rotate(180 60.9993 132)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="17.3333"
                                       cy="132"
                                       r="1.66667"
                                       transform="rotate(180 17.3333 132)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="60.9993"
                                       cy="117.333"
                                       r="1.66667"
                                       transform="rotate(180 60.9993 117.333)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="17.3333"
                                       cy="117.333"
                                       r="1.66667"
                                       transform="rotate(180 17.3333 117.333)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="60.9993"
                                       cy="102.667"
                                       r="1.66667"
                                       transform="rotate(180 60.9993 102.667)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="17.3333"
                                       cy="102.667"
                                       r="1.66667"
                                       transform="rotate(180 17.3333 102.667)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="60.9993"
                                       cy="88"
                                       r="1.66667"
                                       transform="rotate(180 60.9993 88)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="17.3333"
                                       cy="88"
                                       r="1.66667"
                                       transform="rotate(180 17.3333 88)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="60.9993"
                                       cy="73.3333"
                                       r="1.66667"
                                       transform="rotate(180 60.9993 73.3333)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="17.3333"
                                       cy="73.3333"
                                       r="1.66667"
                                       transform="rotate(180 17.3333 73.3333)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="60.9993"
                                       cy="45"
                                       r="1.66667"
                                       transform="rotate(180 60.9993 45)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="17.3333"
                                       cy="45"
                                       r="1.66667"
                                       transform="rotate(180 17.3333 45)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="60.9993"
                                       cy="16"
                                       r="1.66667"
                                       transform="rotate(180 60.9993 16)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="17.3333"
                                       cy="16"
                                       r="1.66667"
                                       transform="rotate(180 17.3333 16)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="60.9993"
                                       cy="59"
                                       r="1.66667"
                                       transform="rotate(180 60.9993 59)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="17.3333"
                                       cy="59"
                                       r="1.66667"
                                       transform="rotate(180 17.3333 59)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="60.9993"
                                       cy="30.6666"
                                       r="1.66667"
                                       transform="rotate(180 60.9993 30.6666)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="17.3333"
                                       cy="30.6666"
                                       r="1.66667"
                                       transform="rotate(180 17.3333 30.6666)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="60.9993"
                                       cy="1.66665"
                                       r="1.66667"
                                       transform="rotate(180 60.9993 1.66665)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="17.3333"
                                       cy="1.66665"
                                       r="1.66667"
                                       transform="rotate(180 17.3333 1.66665)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="46.3333"
                                       cy="132"
                                       r="1.66667"
                                       transform="rotate(180 46.3333 132)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="2.66536"
                                       cy="132"
                                       r="1.66667"
                                       transform="rotate(180 2.66536 132)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="46.3333"
                                       cy="117.333"
                                       r="1.66667"
                                       transform="rotate(180 46.3333 117.333)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="2.66536"
                                       cy="117.333"
                                       r="1.66667"
                                       transform="rotate(180 2.66536 117.333)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="46.3333"
                                       cy="102.667"
                                       r="1.66667"
                                       transform="rotate(180 46.3333 102.667)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="2.66536"
                                       cy="102.667"
                                       r="1.66667"
                                       transform="rotate(180 2.66536 102.667)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="46.3333"
                                       cy="88"
                                       r="1.66667"
                                       transform="rotate(180 46.3333 88)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="2.66536"
                                       cy="88"
                                       r="1.66667"
                                       transform="rotate(180 2.66536 88)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="46.3333"
                                       cy="73.3333"
                                       r="1.66667"
                                       transform="rotate(180 46.3333 73.3333)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="2.66536"
                                       cy="73.3333"
                                       r="1.66667"
                                       transform="rotate(180 2.66536 73.3333)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="46.3333"
                                       cy="45"
                                       r="1.66667"
                                       transform="rotate(180 46.3333 45)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="2.66536"
                                       cy="45"
                                       r="1.66667"
                                       transform="rotate(180 2.66536 45)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="46.3333"
                                       cy="16"
                                       r="1.66667"
                                       transform="rotate(180 46.3333 16)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="2.66536"
                                       cy="16"
                                       r="1.66667"
                                       transform="rotate(180 2.66536 16)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="46.3333"
                                       cy="59"
                                       r="1.66667"
                                       transform="rotate(180 46.3333 59)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="2.66536"
                                       cy="59"
                                       r="1.66667"
                                       transform="rotate(180 2.66536 59)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="46.3333"
                                       cy="30.6666"
                                       r="1.66667"
                                       transform="rotate(180 46.3333 30.6666)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="2.66536"
                                       cy="30.6666"
                                       r="1.66667"
                                       transform="rotate(180 2.66536 30.6666)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="46.3333"
                                       cy="1.66665"
                                       r="1.66667"
                                       transform="rotate(180 46.3333 1.66665)"
                                       fill="#13C296"
                                       />
                                    <circle
                                       cx="2.66536"
                                       cy="1.66665"
                                       r="1.66667"
                                       transform="rotate(180 2.66536 1.66665)"
                                       fill="#13C296"
                                       />
                                 </svg>
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
                )
}

export default Contact
