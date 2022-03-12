
import {useState, useEffect} from 'react'
import axios from 'axios'
import { set } from 'mongoose'
import RiseLoader from "react-spinners/RiseLoader"


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

    const nameChange = e =>  setMailer({...mailer, name:e.target.value})
    const mailChange = e =>  setMailer({...mailer, mailId:e.target.value})
    const compnameChange = e =>  setMailer({...mailer, compname:e.target.value})
    const countryChange = e =>  setMailer({...mailer, country:e.target.value})
    const messageChange = e =>  setMailer({...mailer, message:e.target.value})
    
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
            console.log(err)
        })
    }

    

    return (

        <div  class={`bg-gradient-to-b ${loading?'h-40':'h-96'} w-full`}>
                            <p id = 'contact' class = 'relative -bottom-12'/>

            <div  class="w-full  flex items-center justify-center md:my-12">
                <div  data-aos={"fade-up"} data-aos-once='true' class="relative md:top-24 top-24 bg-white shadow  rounded-md py-12 md:mb-80  lg:px-56 md:px-44 sm:px-20    px-10">
                    <p class="text-3xl font-bold leading-7 text-center text-gray-700">Get In Touch..</p>
                    {!loading?<form onSubmit={formSub}>
                    <div class="md:flex items-center mt-16 xs3:w-72 w-64 md:mr-32 mx-auto">
                        <div class="md:w-72 xs2:w-96 xs3:w-72 flex flex-col">
                            <label class="text-base font-semibold leading-none text-gray-800">Name</label>
                            <input tabindex="0" required arial-label="Please input name" type="name" class="text-base leading-none text-gray-900 xs2:p-3 p-2 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100" onChange={nameChange} placeholder="Please input  name" />
                        </div>
                        <div class="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                            <label class="text-base font-semibold leading-none text-gray-800">Email Address</label>
                            <input tabindex="0" required arial-label="Please input email address" type="name" class="text-base leading-none text-gray-900 xs2:p-3 p-2 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"  onChange={mailChange} placeholder="Please input email address" />
                        </div>
                    </div>
                    <div class="md:flex items-center mt-8 xs3:w-72 w-64 md:mr-32 mx-auto">
                        <div class="md:w-72 flex flex-col">
                            <label class="text-base font-semibold leading-none text-gray-800">Company name</label>
                            <input tabindex="0" required role="input" arial-label="Please input company name" type="name" class="text-base leading-none text-gray-900 xs2:p-3 p-2 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100" onChange={compnameChange} placeholder="Please input company name" />
                        </div>
                        <div class="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
                            <label class="text-base font-semibold leading-none text-gray-800">Country</label>
                            <input tabindex="0" required arial-label="Please input country name" type="name" class="text-base leading-none text-gray-900 xs2:p-3 p-2 focus:oultine-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100" onChange={countryChange} placeholder="Please input country name" />
                        </div>
                    </div>
                    <div>
                        <div class="flex flex-col mt-8 w-full mx-auto ">
                            <label class="text-base text-center font-semibold leading-none text-gray-800">Message</label>
                            <textarea tabindex="0" required aria-label="leave a message" role="textbox" type="name" class="md:h-40 h-32 w-full mx-auto text-base leading-none text-gray-900 xs2:p-3 p-2 md:ml-1 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100  resize-none" onChange={messageChange}></textarea>
                        </div>
                    </div>
                    <p class="text-xs leading-3 text-gray-600 mt-4 ml-1">We'll get back to you as soon as possible via email!</p>
                    <div class="flex items-center justify-center w-full">
                        <button class="md:mt-16 md:-mb-0 -mb-6 mt-10 text-base font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none" type = 'submit'>SUBMIT</button>
                    </div>
                    </form>:      <div class = 'relative mx-auto mt-36 mb-40'><RiseLoader color={"#368ED7"} loading={loading} size={32} margin={3} /></div>}

                </div>
            </div>
        </div>
    )
}

export default Contact
