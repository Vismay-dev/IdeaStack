import React, { useState, useRef, useContext, useEffect } from 'react'
import axios from 'axios'
import projectContext from '../../context/projectContext'
import userContext from '../../context/userContext'
const Feed = () => {

    const projects = useContext(projectContext)
    const [project, setProject] = useState()
    const [feed,setFeed] = useState([])

    useEffect(()=> {
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
        image: '',
    })
    const textHandler = (e) => {
        setMessage({...message, text:e.target.value})
    }

    const [image, setImage] = useState(null)
    const inputRef = useRef(null)

    const picUpload = (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append('image',e.target.files[0]);
        data.append('token',sessionStorage.getItem('token') )
        setImage(URL.createObjectURL(e.target.files[0]))    

        axios.post(process.env.NODE_ENV ==='production'?'https://taskdeck-app.herokuapp.com/api/user/uploadPic':'http://localhost:4000/api/user/uploadPic',data).then(res=> {
            setMessage({
              ...message,
              image:res.data
          })
        }).catch(err=> {
            console.log(err)
        })

    }

    const removePic = () => {
        setImage(null)
        setMessage({
            ...message,
            image:''
        })
    }


    const submitHandler = (e) =>  {
        e.preventDefault();

        let messageTemp = message;
        let feedTemp = feed;
        feedTemp = [
          ...feedTemp, messageTemp
        ]
        axios.post(process.env.NODE_ENV ==='production'?'https://taskdeck-app.herokuapp.com/api/user/getUser':'http://localhost:4000/api/user/getUser',{token:sessionStorage.getItem('token')}).then(res=> {
        messageTemp = {
                ...message,
                from:res.data.firstName + ' ' + res.data.lastName,
                timestamp:new Date(),
                authorPicture: res.data.profilePic
        }
        feedTemp[feedTemp.length-1] = messageTemp
        axios.post(process.env.NODE_ENV ==='production'?'https://taskdeck-app.herokuapp.com/api/project/updateFeed':'http://localhost:4000/api/project/updateFeed',{token:sessionStorage.getItem('token'), feed:feedTemp ,projectID:sessionStorage.getItem('managing')}).then(res=> {
          setMessage(messageTemp)
          setFeed(res.data);
          }).catch(err=> {
              console.log(err)
          })
        }).catch(err=> {
            console.log(err)
        })

          

        // setSendingMessage(false)
    }

    const deleteMessage = (i) => {
        let feedTemp = new Array(...feed);
        feedTemp = feedTemp.filter(elem => elem!==feedTemp[i]);
        console.log(feedTemp)
        setFeed(feedTemp)
        
        axios.post(process.env.NODE_ENV ==='production'?'https://taskdeck-app.herokuapp.com/api/project/updateFeed':'http://localhost:4000/api/project/updateFeed',{token:sessionStorage.getItem('token'), feed:feedTemp ,projectID:sessionStorage.getItem('managing')}).then(res=> {
          setFeed(res.data);
          }).catch(err=> {
              console.log(err)
          })
    }


    return (
        <div class = 'col-span-3 row-span-3 h-[650px] scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 overflow-y-scroll bg-gradient-to-br from-blue-300 to-indigo-300 rounded-md shadow-xl pt-6 pb-3 '>
        <h3 class = 'uppercase text-center font-semibold text-blue-900 mb-8 text-3xl'>Collaborative Feed</h3>
    
    {
        sendingMessage?
        <form onSubmit={submitHandler} class = 'bg-white p-2 pb-3 px-5 relative w-[89%] mx-auto block rounded-md mb-8 mt-3 shadow-md justify-center'>
            <h3 class = 'font-semibold mt-2 relative left-0.5 text-md text-gray-700'>Send a Message:</h3>
            <textarea required onChange={textHandler} class = 'relative mt-5 p-2 h-32 rounded-md w-11/12'></textarea>
            <input required ref={inputRef} onChange = {picUpload} type="file"  style={{'display': 'none'}}/>
            <button  onClick={image!==null?(e)=>{e.preventDefault();removePic()}:(e)=>{e.preventDefault(); inputRef.current.click()}} class = 'bg-gradient-to-r relative left-0.5 from-blue-400 to-blue-600 text-white hover:shadow-lg active:shadow-sm font-semibold p-2 rounded-sm shadow-md text-sm px-3 mt-6 mb-5'>{image!==null?'Remove':'Upload'} Image</button><br/>
            
            {image!==null?<img src = {image} class = 'scale-50 shadow-lg relative mx-auto justify-center block -my-[90px] -mt-[105px]  border-2 rounded-md border-gray-400'></img>:''}

            
            <button onClick={()=> {setSendingMessage(false); setImage(null); setMessage({}); }} class = 'z-30 bg-gradient-to-r relative left-0.5 from-blue-400 to-blue-600 text-white hover:shadow-lg active:shadow-sm font-semibold p-2 rounded-sm shadow-md text-sm px-3 mt-1 mb-2'>Cancel</button>
            <button type = 'submit' class = 'z-30 bg-gradient-to-l relative left-2.5 from-blue-400 to-blue-600 text-white hover:shadow-lg active:shadow-sm font-semibold p-2 rounded-sm shadow-md text-sm px-3 mt-1 mb-2'>Submit</button>



        </form>:
                <button class = 'bg-white p-2 px-4 relative hover:bg-slate-50 hover:shadow-xl mx-auto w-9/12 mb-6 -mt-1 active:shadow-md rounded-md shadow-md justify-center block text-gray-800 font-semibold' onClick = {()=> setSendingMessage(true)}>SEND MESSAGE <span class = 'text-lg left-1 relative bottom-[1px]'>+</span> </button>

    }
    
    <div class=" px-4 md:px-6 lg:px-8">  

{
  feed.length===0? 
  <>
  <p class = 'font-semibold text-center text-2xl top-7 text-blue-900 relative mb-3'>0 Messages..</p>
  <img class = 'scale-50 -mt-[190px] top-[75px] shadow-xl left-3.5 rounded-md relative' src = {'https://i.pinimg.com/736x/30/92/a6/3092a6b1b828fe948246f75861b81490.jpg'}></img>
  </>
  :''
}
{feed? feed.map((message,i)=> {return(<div key = {i} class="max-w-xl mx-auto relative mb-4 px-4 py-4 pt-2 bg-white shadow-md rounded-lg">

{(user.firstName+ ' ' + user.lastName)===message.from?<svg onClick={()=> deleteMessage(i)} xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 absolute right-2.5 bottom-4 hover:bg-red-300 hover:shadow-lg active:shadow-sm p-1 z-40 cursor-pointer rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>:''}
  <div class="py-2 flex flex-row items-center justify-between">
    <div class="flex flex-row items-center">
      <a href="#" class="flex flex-row items-center focus:outline-none focus:shadow-outline rounded-lg">
        <img class="rounded-full h-8 w-8 object-cover" src={message.authorPicture} alt=""/>
        <p class="ml-2 text-base font-medium">{message.from}</p>
      </a>
    </div>
    <div class="flex flex-row items-center">
      <p class="text-xs font-semibold text-gray-500">2 hours ago</p>
    </div>
  </div>
  <div class=" relative block mx-auto justify-center">
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
  <div class="py-2 relative left-1 mb-0.5">
    <p class="leading-snug">{message.text}</p>
  </div>
</div>)})   :''}

</div>
    </div>

    )
}

export default Feed