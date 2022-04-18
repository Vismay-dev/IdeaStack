import {useEffect, useState,useContext, useRef} from 'react'
import img from './assets/img/team-2-800x800.jpg'
import userContext from '../../context/userContext'
import axios from 'axios'
import EditModal from '../Modals/EditModal'
import Tooltip from 'react-power-tooltip'
import {FaProjectDiagram} from 'react-icons/fa'
import {RiFileList2Fill} from 'react-icons/ri'
import {GrChapterAdd} from 'react-icons/gr'
import { useHistory } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader"

import AOS from 'aos';
import "aos/dist/aos.css";

const Profile = () => {
  
  const [projects, setProjects] = useState([])
  const [showmore, setShowmore] = useState(false)

  useEffect(() => {
    AOS.init({
      duration : 800
    });
  }, [projects, showmore]);

    const [addDesc, setAddDesc] = useState(false)
    const [editingDesc, setEditingDesc] = useState(false)
    const currentUser = useContext(userContext)
    const userInfo = currentUser.user
    const [image, setImage] = useState(currentUser.user.profilePic?currentUser.user.profilePic:null)
    const [showToolTip, setShowToolTip] = useState(false)
    const [showToolTip2, setShowToolTip2] = useState(false)
    const [modalType, setModalType] = useState('')

  const [user, setUser] = useState(currentUser?currentUser.user:false)

    const changeHandler = (e) => {
         setUser({
         ...user,
         [e.target.name]: e.target.value
       })
    }

    const [loading, setLoading] = useState(false)
    useEffect(()=> {
      setLoading(true)
      axios.post(process.env.NODE_ENV ==='production'?"https://ideastack.herokuapp.com/api/user/getUserProjects"
      :"http://localhost:4000/api/user/getUserProjects",{token:sessionStorage.getItem('token')}).then(res=> {
      setProjects(res.data);
      setLoading(false)
    })
    },[user])
    

    

   
      if(userInfo){
        if(userInfo.description) {
          if(userInfo.description.trim() === ''){
            currentUser.setUser({
              ...currentUser.user,
              description: null
            })
          }
        }
      }

      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
  

    const submitHandler = () => {
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/updateUser':'http://localhost:4000/api/user/updateUser',{user, token:sessionStorage.getItem('token')}).then(res=> {
            console.log(res.data)
            setUser(res.data)
            currentUser.setUser(res.data)
            setAddDesc(false)
            setEditingDesc(false)
        }).catch(err=> {
            console.log(err)

        })
      }

      const inputRef = useRef(null)
      const dummyRef = useRef(null)

      const [picLoading, setPicLoading] = useState(false)

      const [editModalShow, setEditModalShow] = useState(false)
      const profPicUpload =(e)=> {
        e.preventDefault()
        setPicLoading(true)
        const data = new FormData();
        data.append('image',e.target.files[0]);
        data.append('token',sessionStorage.getItem('token') )
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/uploadProfPic':'http://localhost:4000/api/user/uploadProfPic',data).then(res=> {
            console.log(res.data)
            currentUser.setUser(res.data)
            setImage(res.data.profilePic)
            setPicLoading(false)
        }).catch(err=> {
          setPicLoading(false)
            console.log(err.response)
        })
      }
    
      const removeProfPic = (e) => {
        setPicLoading(true)
        const removedProfPic = {...user, profilePic:''}
        console.log(removedProfPic)
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/updateUser':'http://localhost:4000/api/user/updateUser',{user:removedProfPic, token:sessionStorage.getItem('token')}).then(res=> {
          currentUser.setUser(res.data)
          setPicLoading(false)
        }).catch(err=> {
          console.log(err.response?err.response.data:null)
        })
      }

      const history = useHistory()


    return (
        <div class="xl:pt-28  pt-28 -mb-72 relative  overflow-hidden bg-gradient-to-r from-gray-200 to-blue-200">
            <div ref = {dummyRef}></div>
            {
                editModalShow?
                <EditModal type = {modalType} close = {()=> {setEditModalShow(false)}}/>
                 :''
            }

            <h1 class = 'relative mx-auto xl:-mt-12 2xl:-mb-16 xl:-mb-6 xl:py-8 xl:pt-4   lg:mb-6 md:-mt-12 md:mb-16 sm:-mt-14 sm:mb-24 -mt-10 mb-40 xs:-mt-10 xs:mb-40 px-4 text-center sm:text-6xl text-5xl font-semibold'><span class = 'text-blue-600'>Your</span> Profile</h1>
            <div class="relative -mt-10 -mb-60  max-h-80">
      <svg viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(-2.000000, 44.000000)" fill="#FFFFFF" fill-rule="nonzero">
            <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
            <path
              d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
              opacity="0.100000001"
            ></path>
            <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" id="Path-4" opacity="0.200000003"></path>
          </g>
        </g>
      </svg>
    </div>
                <section className="relative block h-500-px mt-32 mb-12 ">
          <div
            className="absolute top-0 z-20 w-full h-full bg-center bg-cover"
            style={{
                backgroundImage:'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80")'
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section  className="relative py-16 bg-blueGray-200">
          <div  className="container mx-auto px-4">
            <div className="relative flex flex-col  min-w-0  break-words bg-gradient-to-br from-white to-gray-100 w-full lg:-mb-40 md:-mb-16  md:mt-5 lg:mt-4 sm:-mb-8 sm:mt-7 -mb-2 shadow-xl rounded-lg">
              <div  className="px-6">
                <div data-aos={"zoom-in-up"} data-aos-once='true'  className="flex flex-wrap justify-center">
                  <div   className="lg:w-4/12 w-[270px] xl:w-3/12 xl:ml-10   px-4  lg:order-2 order-1 flex justify-center">
                    <div className="relative scale-90 rounded-r-full  p-3">
                    <input ref={inputRef} onChange = {profPicUpload} type="file" name="article_picture" style={{'display': 'none'}}/>
                    {
                      picLoading?

                    
                      <div class = 'relative top-3 my-3 mb-7 block'>
                      <ClipLoader color={'#0b0bbf'} loading={picLoading}  size={70} />
                     </div>
                      :

                      <img class={`rounded-full -mt-16 -mb-2  w-56 h-56 object-contain bg-white  shadow-lg block ${currentUser.user.profilePic?'':'p-2'} relative`}
                    src={currentUser.user.profilePic?currentUser.user.profilePic:"https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="} /> }




                 {currentUser.user.profilePic?

                
                 <i data-tip="Remove Picture" onMouseOver={() => setShowToolTip2(true)} 
                 onMouseLeave={() => setShowToolTip2(false)} onClick = {()=> {
                  setShowToolTip2(false);
                 removeProfPic()}} className={`fas hover:cursor-pointer hover:text-orange-700  fa-trash font-semibold text-2xl absolute right-0 ${picLoading?'bottom-5 -right-2':'bottom-8 '} text-red-600`}>
<Tooltip show={showToolTip2} position = 'right' fontSize = '16px' padding = '3px 5px'>
  <span class = 'font-semibold text-center font-sans bottom-0.5'>Remove Picture</span>
</Tooltip>

                 </i>
:''}



                  <i     onMouseOver={() => setShowToolTip(true)} 
        onMouseLeave={() => setShowToolTip(false)}
          onClick={()=>{setShowToolTip(false); inputRef.current.click()}}  className={`fas hover:cursor-pointer hover:text-indigo-700 text-2xl fa-camera font-semibold  ${currentUser.user.profilePic?'bottom-0.5 right-6 absolute':'right-2 absolute bottom-0.5'} ${picLoading?'mt-3':''} text-gray-800`}>
            <Tooltip position = 'bottom' fontSize = '16px' padding = '3px 5px' show={showToolTip} className = 'p-1'>
  <span class = 'font-semibold text-center font-sans bottom-0.5'>{currentUser.user.profilePic?'Change Picture':'Upload Picture'}</span>
</Tooltip></i>                    </div>

                  </div>
                  <div className="w-full lg:w-4/12  px-4 lg:order-3 order-2 mx-auto text-center lg:mt-0 mt-7 lg:left-0 sm:left-2.5 left-1 relative lg:text-right lg:self-center">
                    <div className="py-6 px-3 lg:mt-4 mt-1 sm:mt-0">
                      <button
                      onClick={() => {setModalType('profile'); setEditModalShow(true)}}
                        className="bg-gradient-to-r from-blue-300 to-blue-500 hover:from-indigo-300 hover:to-indigo-500 active:bg-blue-400 uppercase text-white font-bold hover:shadow-lg shadow-sm text-md px-3 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-24 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 xl:ml-3 px-4 xl:top-1.5 lg:mt-0 -mt-[105px] lg:left-0 left-[10px] relative lg:order-1 order-2">
                    <div className="flex justify-center py-4 xl:right-7 lg:right-3 right-0 relative lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {currentUser.user&&currentUser.user.projects.filter(onlyUnique).length} 
                        </span>
                        <span className="text-sm top-1 relative text-blueGray-400">
                          Projects
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          0
                        </span>
                        <span className="text-sm top-1 relative text-blueGray-400">
                          Sessions held with STEM experts
                        </span>
                      </div>
                     
                    </div>
                  </div>
                </div>
                <div  className="text-center mt-11">
                  <h3 className="sm:text-4xl text-3xl font-semibold leading-normal mb-2 text-blueGray-700">
                    {currentUser?userInfo.firstName+ ' ' + userInfo.lastName:' '}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-10 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 top-0.5 relative text-lg text-gray-400"></i>{" "}
                    {currentUser?userInfo.city+', ':' '} {currentUser?userInfo.country:' '}
                  </div>
                 

                  <div className="mb-2 text-blueGray-600 px-4">
                    <i className="fas fa-calendar mr-2 text-lg sm:text-gray-400 text-gray-500"></i>
                    <span class = 'sm:font-normal font-medium'>Age:</span> {currentUser?userInfo.age:' '}
                  </div>
                  <div className="mb-2 text-blueGray-600 px-4">
                    <i className="fas fa-university mr-2 text-lg sm:text-gray-400 text-gray-500"></i>
                    {currentUser?userInfo.school:' '}
                  </div>
                  <div className="sm:mb-5 mb-8 text-blueGray-600 px-4">
                    <i className="fas fa-envelope mr-2 text-lg sm:text-gray-400 text-gray-500"></i>
                    <span class = 'sm:font-normal font-medium'>Contact</span>: {currentUser?userInfo.email:' '}
                  </div>
                  
                </div>
                <div className="mt-12 py-10 border-y border-gray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-md leading-relaxed text-blueGray-700">
                      {editingDesc?
                      <>
                      <h1 class = 'text-3xl -mt-2 mb-4 font-semibold text-center text-gray-700'>Edit Description</h1>
                      <br/><textarea name = 'description' required onChange={changeHandler} value = {user.description} class = 'text-black mx-auto border-2 w-11/12 h-44 shadow-lg rounded-md mb-4 -mt-3 p-3 border-gray-300'></textarea>

                      <div class = 'space-x-4 mb-8 justify-end justify-items-end'>
                      <button onClick={() => {setEditingDesc(false)}} 
                      class="w-1/3 font-semibold p-2 shadow-md  z-20 bg-gray-100 hover:bg-gray-200 px-12 rounded-md hover:cursor-pointer hover:text-indigo-600 text-blue-600">Cancel</button>

                        <button onClick = {()=> {
                          submitHandler()
                        }}
                        class="font-semibold w-1/2   p-2 shadow-md  z-20 bg-gray-100 hover:bg-gray-200 px-8 rounded-md hover:cursor-pointer hover:text-indigo-600 text-blue-600">Submit</button>
                        </div>
                        </>:

                    
                       
                       
                        !addDesc?
                        currentUser?userInfo.description?<>

                        <h1 class = 'text-gray-400 uppercase text-md -mt-4 mb-9 font-semibold text-center'>ABOUT ME</h1>
                      
                       <p style={{whiteSpace: "pre-wrap"}}>{userInfo.description}</p>  
                       <button
                      onClick={() => {setEditingDesc(true);}}
                        className="bg-gradient-to-r from-blue-300 mt-10 -mb-8 top-1 relative  to-blue-500 hover:from-indigo-300 hover:to-indigo-500 active:bg-blue-400 uppercase text-white font-bold hover:shadow-lg shadow-sm text-md px-3 py-2 rounded outline-none focus:outline-none sm:mr-2 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Edit Description
                      </button>
                        </>
                        
                        
                        
                        :
                        
                        <>
                        <i className="fas fa-exclamation text-indigo-600 mb-2 text-4xl "></i>
                        <p class = 'text-gray-800 font-semibold text-lg mb-5'>No Description Added</p>
                        <button
                        class="font-semibold top-3 text-md p-2 shadow-md  z-20 bg-gray-100 hover:bg-gray-200 px-3 rounded-md hover:cursor-pointer hover:text-indigo-600 relative text-gray-800"
                        onClick={() => {
                          setAddDesc(true)
                        }}
                      >
                        Add Description
                      </button>
                        </>:''

                        
                      :<>
                      <h1 class = 'text-3xl -mt-2 mb-4 font-semibold text-center text-gray-700'>Add Description</h1>
                      <br/><textArea name = 'description' required onChange={changeHandler} placeholder='Add Description - Your Background in STEM, Your Education, Summarize who you are' class = 'text-black mx-auto border-2 w-11/12 h-44 shadow-lg rounded-md mb-4 -mt-3 p-3 border-gray-300'></textArea>

                      <div class = 'space-x-4 mb-8 justify-end justify-items-end'>
                      <button onClick={() => {setAddDesc(false)}} class="w-1/3 font-semibold p-2 shadow-md  z-20 bg-gray-100 hover:bg-gray-200 px-12 rounded-md hover:cursor-pointer hover:text-indigo-600 text-blue-600">Cancel</button>

                        <button onClick = {()=> {
                          submitHandler()
                        }}
                        class="font-semibold w-1/2   p-2 shadow-md  z-20 bg-gray-100 hover:bg-gray-200 px-8 rounded-md hover:cursor-pointer hover:text-indigo-600 text-blue-600">Submit</button>
                        </div>
                        </>
                      }
                      </p>



                      <button
                        class={`font-semibold ${!showmore?'z-[100]':'z-30'}  pointer-events-auto top-3 p-2 text-md shadow-md mb-2 bg-gray-100 hover:bg-gray-200 px-4 rounded-md hover:cursor-pointer hover:text-indigo-600 relative text-gray-700`}
                        onClick={() => {
                        setShowmore(showmore?false:true)}}
                      >
                        Show {showmore?'less':'more'}
                      </button>
                      {showmore?
                     <hr class = ' border-t-1.5 mt-12 border-gray-200'/>
                        :''}
                    </div>
                             {/* <!-- ====== Cards Section Start --> */}
                             {showmore?
                                                         
                             <div class="container mt-16  -mb-6 px-10">
       <h1 class = 'font-semibold text-4xl w-48 mx-auto relative text-center justify-center justify-items-center bottom-6 mb-6'>
       <RiFileList2Fill class = 'text-indigo-500 ml-1 text-3xl mr-1 top-1.5 absolute'/>
      <span class = 'ml-8'>Interests</span></h1>
                  
                  
                  {
                    currentUser.user.interests.length>0?
                    <button
                      onClick={() => {setModalType('interests'); setEditModalShow(true)}}
                        className="bg-gradient-to-r from-blue-300 absolute md:block hidden lg:right-[70px] md:right-8 right-4 lg:-mt-20 -mt-[85px]  to-blue-500 hover:from-indigo-300 hover:to-indigo-500 active:bg-blue-400 uppercase text-white font-bold hover:shadow-lg shadow-sm lg:text-md text-sm md:px-3 px-2 md:py-2 py-1.5 rounded outline-none focus:outline-none sm:mr-2 mb-28 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Edit Interests
                      </button>:
                      ''
                  }
                
      {
        currentUser.user.interests.length>0?
        <>
        <div data-aos={"zoom-in-up"} data-aos-once='true' class = {`grid md:grid-cols-3 sm:grid-cols-4 grid-cols-3 -mt-1 gap-7  mb-20`}>
        {currentUser.user.interests.map((interest,i) => {
          return (
              <div class={`w-full relative  mx-auto py-2 pb-1 ${currentUser.user.interests.length===1?'md:col-start-2 sm:col-start-2':''} md:col-span-1 sm:col-span-2 lg:left-0 left-[1px] col-span-3 top-5 relative mb-5 overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-100  rounded-lg shadow-lg `}>
                <div class="lg:px-4 px-3 py-2">
                    <h1 class="sm:text-2xl text-xl font-bold lg:mb-1 mb-4 text-gray-700">{interest.title}</h1>
                    <p class="text-sm text-gray-600 mt-2 mb-2">{interest.desc}</p>
                </div>
              </div> 
          )
        })}
        
        </div>
        <button
                      onClick={() => {setModalType('interests'); setEditModalShow(true)}}
                        className="bg-gradient-to-r from-blue-300  md:hidden visible   -mt-[55px] mb-9 bottom-4 left-0.5 relative  to-blue-500 hover:from-indigo-300 hover:to-indigo-500 active:bg-blue-400 uppercase text-white font-bold hover:shadow-lg shadow-sm text-md px-2.5 py-2  rounded outline-none focus:outline-none  ease-linear transition-all duration-150"
                        type="button"
                      >
                        Edit Interests
                      </button></>
        :<>
        <div onClick={() => {setModalType('interests'); setEditModalShow(true)}}
              class = 'hover:text-indigo-600 hover:cursor-pointer mt-2 top-1.5 relative hover:border-x-4 hover:border-indigo-500 sm:w-1/3 w-full px-[30px] mx-auto'  >
     <GrChapterAdd className="text-indigo-500  text-center mx-auto mb-4  text-4xl "></GrChapterAdd>
     <p class = 'text-gray-800 font-semibold text-lg mb-16'>Add Interests</p>
     </div>
 </>}                          

      



       <hr class = ' border-t-1.5 border-gray-200 mb-16'/>

       <h1 class = 'font-semibold text-4xl w-48 mx-auto relative bottom-6 mb-3 text-center justify-center justify-items-center'>
       <FaProjectDiagram class = 'text-indigo-500 ml-2 mr-2 text-3xl top-1.5 absolute'/>
      <span class = 'ml-8 mb-6 relative'>Projects</span></h1>



      <div class="flex flex-wrap space-x-3 -mx-2 mt-4">

        {

        loading?


        <div class ='relative mx-auto my-8 pl-4 mb-20 text-center block justify-center'>
      <ClipLoader color={'#0b0bbf'} loading={loading}  size={70} />
      </div>


        :
          !projects.length>0?


          <p class = 'text-2xl font-semibold text-center my-6 mb-24 mx-auto relative'><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg> <span class = 'top-0.5 relative'>No Projects</span></p>



          :
        projects.map(proj=> {

             let date = new Date(proj.createdAt).toDateString().substring(4)
             date = date.slice(0, 6) + "," + date.slice(6);

          return(
            <div data-aos={"zoom-in-up"} data-aos-once='true' class={` sm:mt-0 mt-4 relative ${projects.length===1?'mx-auto':''}  md:w-2/3 xl:w-1/3 px-4}`}>
            <div class={`rounded-lg shadow-lg bg-gradient-to-r  from-blue-50 to-indigo-100 sm:w-full w-[120%] sm:right-0 right-[10%] relative  overflow-hidden mb-10`}>
               <img
                  src={proj.projPic}
                  alt="image"
                  class="w-full h-56 object-contain py-3 -mb-3 bg-gray-50 border-b-2 border-gray-400 relative"
                  />
               <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                  <h3>
                     <a
                        href="javascript:void(0)"
                        class="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        
                        block
                        hover:text-primary
                        "
                        >
                     {proj.name}
                     </a>
                     <span class="text-sm mx-auto relative font-light text-gray-600 ">{date}</span>

                  </h3>
                  <p class="text-base text-body-color mt-4 leading-relaxed mb-7">
                    {proj.problem}
                  </p>
                  <a
                     onClick={()=> {
                       history.push('/myprojects')
                       window.scrollTo(0, 0)
                     }}
                     class="
                     inline-block
                     py-2
                     px-7
                     cursor-pointer
                     border border-[#4577da]
                     rounded-full
                     text-base text-body-color
                     font-medium
                     hover:border-primary hover:bg-slate-100 hover:text-indigo-600
                     transition
                     "
                     >
                  View Projects
                  </a>
               </div>
            </div>
         </div>)
        })
        }
         
   </div>
   </div>
                             :''}
   
                  </div>
                </div>
                
              </div>
            </div>
   
          </div>
        </section>


        <div class="relative -mt-6 max-h-96  lg:mt-5">
      <svg viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(-2.000000, 44.000000)" fill="#FFFFFF" fill-rule="nonzero">
            <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
            <path
              d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
              opacity="0.100000001"
            ></path>
            <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" id="Path-4" opacity="0.200000003"></path>
          </g>
        </g>
      </svg>
    </div>
        </div>
    )
}

export default Profile