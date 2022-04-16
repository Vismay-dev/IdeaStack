import React, { useState, useRef, useContext, useEffect } from 'react'
import axios from 'axios'
import projectContext from '../../context/projectContext'
import userContext from '../../context/userContext'
import ClipLoader from "react-spinners/ClipLoader"
import AOS from 'aos';
import "aos/dist/aos.css";

import {AiOutlineSend, AiFillFileImage} from 'react-icons/ai'
import {FcCancel} from 'react-icons/fc'


const Feed = () => {


  useEffect(() => {
    AOS.init({
      duration : 1200
    });
  },[]);

    const projects = useContext(projectContext)
    const [project, setProject] = useState()
    const [feed,setFeed] = useState([])
let authorPic = '';

useEffect(()=> {
  axios.post(process.env.NODE_ENV ==='production'?"https://ideastack.herokuapp.com/api/user/getUser"
  :"http://localhost:4000/api/user/getUser",{token:sessionStorage.getItem('token')}).then(res=> {
  authorPic = res.data.profilePic
})

    let projSelected = projects.projects.filter((proj)=> {
      return proj._id === String(sessionStorage.getItem('managing'))
    })[0]
  
    if(projects.projects && projSelected){
    setProject(projSelected);
    setFeed(projSelected.messages?[...projSelected.messages]:[]);
    }
    },[projects])

    const user = useContext(userContext).user

    const [sendingMessage , setSendingMessage] = useState(false);

    const [message, setMessage] = useState({
        text: '',
        from: '',
        timestamp: '',
        image:'',
        authorPicture: authorPic,
    })
    const textHandler = (e) => {
        setMessage({...message, text:e.target.value})
    }

    const [image, setImage] = useState(null)
    const inputRef = useRef(null)

    const [picLoading, setPicLoading] = useState(false)


    const picUpload = (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append('image',e.target.files[0]);
        data.append('token',sessionStorage.getItem('token') )
        setImage(URL.createObjectURL(e.target.files[0]))    
        setPicLoading(true)

        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/uploadPic':'http://localhost:4000/api/user/uploadPic',data).then(res=> {
            setMessage({
              ...message,
              image:res.data
          })
          setPicLoading(false)
        }).catch(err=> {
            console.log(err)
            setPicLoading(false)
        })

    }

    const removePic = () => {
        setImage(null)
        setMessage({
            ...message,
        })
    }

    const [loading, setLoading] = useState(false)

console.log(message)
    const submitHandler = (e) =>  {

        e.preventDefault();

        let messageTemp = message;
        let feedTemp = feed;
        feedTemp = [
          ...feedTemp, messageTemp
        ]

        
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/getUser':'http://localhost:4000/api/user/getUser',{token:sessionStorage.getItem('token')}).then(res=> {
          setSendingMessage(false)
        setLoading(true)
        console.log(res.data)
        messageTemp = {
                ...message,
                from:res.data.firstName + ' ' + res.data.lastName,
                timestamp:new Date(),
                authorPicture: res.data.profilePic
        }
        feedTemp[feedTemp.length-1] = messageTemp
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/updateFeed':'http://localhost:4000/api/project/updateFeed',{token:sessionStorage.getItem('token'), feed:feedTemp ,projectID:sessionStorage.getItem('managing')}).then(res=> {
          setMessage(messageTemp)
          setFeed(res.data);
          setLoading(false)
          }).catch(err=> {
              console.log(err)
              setLoading(false)

          })
        }).catch(err=> {
            console.log(err)
            setLoading(false)

        })

          

        setSendingMessage(false)
    }

    const deleteMessage = (i) => {
        let feedTemp = new Array(...feed);
        feedTemp = feedTemp.filter(elem => elem!==feedTemp[i]);
        console.log(feedTemp)
        setFeed(feedTemp)
        setLoading(true)

        
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/updateFeed':'http://localhost:4000/api/project/updateFeed',{token:sessionStorage.getItem('token'), feed:feedTemp ,projectID:sessionStorage.getItem('managing')}).then(res=> {
          setFeed(res.data);
          setLoading(false)
          }).catch(err=> {
              console.log(err)
          })
    }


    return (
        <div data-aos={"fade-up"} data-aos-once='true' class = 'lg:col-span-3 col-span-5 row-span-3 h-[650px] scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 overflow-y-scroll bg-gradient-to-br from-blue-300 to-indigo-300 rounded-md shadow-xl pt-6 pb-3 '>
        <h3 class = 'uppercase text-center font-semibold text-blue-900 mb-8 top-1 relative px-4 text-3xl'><svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 bottom-[2.5px] mr-1 relative font-bold inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
</svg> Collaborative Feed</h3>
    
    {
        sendingMessage?
        <form onSubmit={submitHandler} class = {`bg-white p-2 pb-3 px-5 relative w-[89%] mx-auto block rounded-md mb-2 mt-4 ${sendingMessage?'mb-8':'mb-0'} shadow-md justify-center`}>
            <h3 class = 'font-semibold mt-2 relative left-0.5 text-lg underline text-gray-700'>Send a Message:</h3>
            <textarea required onChange={textHandler} name= 'message' class = 'relative mt-5 p-2 h-32 rounded-md w-11/12'></textarea>
            <input ref={inputRef} onChange = {picUpload} type="file" name= 'file'  style={{'display': 'none'}}/>
            <button  onClick={image!==null?(e)=>{e.preventDefault();removePic()}:(e)=>{e.preventDefault(); inputRef.current.click()}} class = 'bg-gradient-to-r relative left-0.5 from-cyan-400 to-cyan-600 text-white hover:shadow-lg active:shadow-sm font-semibold p-2 pt-[7px] rounded-sm shadow-md  text-md px-3.5 mt-6 mb-2'><AiFillFileImage class = 'relative bottom-[1.5px] mr-[1px] inline'/> {image!==null?'Remove':'Upload'} Image</button><br/>
            
            {


picLoading?


  <div class ='relative mx-auto my-8 mb-10 top-3 pb-3 pt-4 text-center block justify-center'>
      <ClipLoader color={'#0b0bbf'} loading={picLoading}  size={70} />
    </div>:
            
            
            
            
            image!==null?<img src = {image} class = 'scale-50 shadow-lg relative mx-auto justify-center block -my-[90px] -mt-[105px]  border-2 rounded-md border-gray-400'></img>:''}

            
            <button onClick={()=> {setSendingMessage(false); setImage(null); setMessage({}); }} class = 'z-30 bg-gradient-to-r relative left-0.5 from-blue-400 to-blue-600 text-white hover:shadow-lg active:shadow-sm font-semibold p-2 pt-[7px] rounded-sm shadow-md text-md px-3.5 mt-1 mb-2'><FcCancel class = 'relative bottom-[1px] mr-[1px] text-lg inline'/> Cancel</button>
            <button type = 'submit' class = 'z-30 bg-gradient-to-l relative left-2.5 from-blue-400 to-blue-600 text-white hover:shadow-lg active:shadow-sm font-semibold p-2 rounded-sm shadow-md text-md px-3.5 mt-1 mb-2  pt-[7px]'><AiOutlineSend class = 'relative bottom-[0.75px] mr-[5px] text-md inline'/>Send</button>



        </form>:
                <button class = 'bg-white p-2 px-4 relative hover:bg-slate-50 hover:shadow-xl mx-auto w-9/12 mb-6 -mt-1 active:shadow-md rounded-md shadow-md justify-center block text-gray-800 font-semibold' onClick = {()=> setSendingMessage(true)}>SEND MESSAGE <span class = 'text-lg left-1 relative bottom-[1px]'>+</span> </button>

    }
    
    <div class=" px-4 md:px-6 lg:px-8">  

{
  
}


{

  loading?


  <div class ='relative mx-auto my-8 mb-10 pb-3 pt-24 text-center block justify-center'>
      <ClipLoader color={'#0b0bbf'} loading={loading}  size={70} />
    </div>




  :


  feed.length===0? 
  <>
  {
    sendingMessage?
    '':
    <>
    <p class = 'font-semibold text-center text-2xl top-[78px]  text-blue-900 relative mb-4 underline'>0 messages</p>
    <img class = {`xl:w-[270px] w-[240px] xl:h-[165px] h-[140px] ${sendingMessage?'mb-24':''} -mt-[20px] top-[110px] shadow-lg mx-auto block right-0.5 rounded-sm ring-2 ring-blue-700 ring-offset-2 ring-offset-gray-300 border-2 border-blue-700 relative`} src = {'https://healthitsecurity.com/images/site/features/_normal/ThinkstockPhotos-459643339.jpg'}></img>
  </>
  }
    </>
  :
feed? feed.map((message,i)=> {
  console.log(message)
  
  return(<div key = {i} class="max-w-xl mx-auto relative mb-4 px-4 py-4 pt-2 bg-white shadow-md rounded-lg">

{(user.firstName+ ' ' + user.lastName)===message.from?<svg onClick={()=> deleteMessage(i)} xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 absolute right-2.5 bottom-4 hover:bg-red-300 hover:shadow-lg active:shadow-sm p-1 z-40 cursor-pointer rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>:''}
  <div class="py-2 flex flex-row items-center justify-between">
    <div class="flex flex-row items-center">
      <a href="#" class="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg">
        <img class="rounded-full sm:h-8 sm:w-8 h-6 w-6 object-cover" src={message.authorPicture} alt=""/>
        <p class="ml-2 sm:text-base text-sm font-medium">{message.from}</p>
      </a>
    </div>
    <div class="flex flex-row items-center">
      <p class="text-sm font-semibold text-gray-500">2 hours ago</p>
    </div>
  </div>
  <div class="sm:py-4 py-7 relative left-1 mb-0.5">
    <p class="leading-snug">{message.text}</p>
  </div>
  <div class=" relative block mx-auto justify-center mt-1.5">
 {message.image!==''?<img class="object-cover scale-90 rounded-lg -mt-1" src={message.image} alt=""/>:''}
    <div class="py-2 flex flex-row -mt-2 items-center">
      <button class="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 top-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
</svg>        <span class="ml-1">3</span>
      </button>
      <button class="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg ml-3">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
        <span class="ml-1">1</span>
      </button>
    </div>
  </div>
 
</div>)})   :''}

</div>
    </div>

    )
}

export default Feed