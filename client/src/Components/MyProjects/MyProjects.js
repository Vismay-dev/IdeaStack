import {useState, useEffect, useContext} from 'react'
import { Switch, Route ,Redirect, useHistory, useLocation} from 'react-router-dom'

import AOS from 'aos';
import "aos/dist/aos.css"

import AllProjects from './AllProjects'
import CreateProject from './CreateProject'
import JoinRequests from './JoinRequests'
import ManageProject from './ManageProject'

import projectContext from '../../context/projectContext'

import {FcCollapse} from 'react-icons/fc'

const MyProjects = () => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        AOS.init({
          duration : 1000
        });
      }, []);

   const history = useHistory()
   const location = useLocation()
   const projectsCurr = useContext(projectContext)
   const [projectCurrent, setProjectCurrent] = useState('')

   useEffect(()=> {
    let projSelected = ''
    if(sessionStorage.getItem('managing')){
        projSelected = projectsCurr.projects.filter((proj)=> {
          return proj._id === String(sessionStorage.getItem('managing'))
        })[0]      
    }

    
    setProjectCurrent(projSelected?projSelected.name:'')

   },[sessionStorage.getItem('managing')])
   const [showHeader, setShowHeader] = useState(true)

   const [prevLocation, setPrevLocation] = useState('');

   useEffect(()=> {

    if(location.pathname !== '/myprojects/manageproject/overview' && location.pathname.split('/')[2] === 'manageproject'){
        setShowHeader(false)
    }else{
        setShowHeader(true)
    }

    if(showHeader === true && prevLocation!=='/myprojects/manageproject/overview') {
        setShowHeader(true)
    }
 
   },[location.pathname])


   useEffect(()=> {

    if(location.pathname === '/myprojects/manageproject/overview') {
        setPrevLocation(location.pathname)
    } else {
        setPrevLocation('')
    }
   },[location.pathname])

         

    return (
        <>

        {showHeader?
         <div 
         data-aos={"flip-up"} data-aos-once='true'
style={{'background-image': 'url(https://airwallpaper.com/wp-content/uploads/wall001/Earth-Wallpaper.jpg)'}}            
   className="shadow-md transition-transform ease-out overflow-hidden origin-top transform container bg-right bg-cover bottom-4 w-10/12 flex justify-center mx-auto pt-7 bg-gradient-to-r from-gray-100 to-gray-300">
       <div >
           <h1 className="xl:text-7xl text-7xl relative text-center text-gray-100 font-extrabold pb-6 mb-1  mx-auto">{!sessionStorage.getItem('managing')?'My Projects':projectCurrent}</h1>
       </div>
   </div>:''
}

            <div class="flex space-x-1 bg-gradient-to-l from-gray-300 to-slate-50 shadow-md py-1 pt-5 justify-center w-10/12 rounded-b-lg mx-auto">
        {!sessionStorage.getItem('managing')?<><button onClick = {()=> {
            history.push('/myprojects/allprojects')
        }} class={`flex items-center h-12 relative ml-[73px] py-2 text-sm text-center text-gray-100 
        ${location.pathname==='/myprojects/allprojects'?'bg-gray-800':'bg-gray-500'} px-7 border border-b-0  border-gray-300 sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}>
            All Projects
        </button>

        <button onClick = {()=> {
            history.push('/myprojects/joinrequests')
        }}
        class={`flex items-center h-12 py-2 text-sm text-center text-gray-100 
        ${location.pathname==='/myprojects/joinrequests'?'bg-gray-800':'bg-gray-500'} px-8 border border-b-0  border-gray-300 sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}>
            My Join Requests
        </button>

        <button onClick = {()=> {
            history.push('/myprojects/createproject')
        }}
        class={`flex items-center h-12 py-2 text-sm text-center text-gray-100 
        ${location.pathname==='/myprojects/createproject'?'bg-gray-800':'bg-gray-500'} px-8 border border-b-0  border-gray-300 sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}>
            Create Project
        </button>
        
      
        <button
onClick = {()=> {setShowHeader(showHeader?false:true)}}

        class={` items-center h-12 left-48 relative py-1.5 text-sm text-center text-gray-100 
        hover:from-gray-600 hover:to-gray-700 bg-gradient-to-b from-gray-500 to-gray-500 border-1   px-4 border-b-0   sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}>
            <FcCollapse class = {`text-4xl -top-[1px] text-gray-200 relative ${!showHeader?'rotate-180':''}`}/>
        </button>
        
        
        </>:



<>

{
    location.pathname!=='/myprojects/manageproject/mentorship/browse'?
<>
<button onClick = {()=> {
            history.push('/myprojects/manageproject/overview')
        }} class={`flex items-center h-12 relative ml-[72px] py-2 text-sm text-center text-gray-100 
        ${location.pathname==='/myprojects/manageproject/overview'?'bg-gray-800':'bg-gray-500'} px-7 border border-b-0  border-gray-300 sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}>
            Overview
        </button>

        <button onClick = {()=> {
            history.push('/myprojects/manageproject/manageapps')
        }}
        class={`flex items-center h-12 py-2 text-sm text-center text-gray-100 
        ${location.pathname==='/myprojects/manageproject/manageapps'?'bg-gray-800':'bg-gray-500'} px-7 border border-b-0  border-gray-300 sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}>
            Manage Applications
        </button>

        <button onClick = {()=> {
            history.push('/myprojects/manageproject/collaborate')
        }}
        class={`flex items-center h-12 py-2 text-sm text-center text-gray-100 
        ${location.pathname==='/myprojects/manageproject/collaborate'?'bg-gray-800':'bg-gray-500'} px-6 border border-b-0  border-gray-300 sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}>
            Collaborate
        </button>

        <button onClick = {()=> {
            history.push('/myprojects/manageproject/mentorship')
        }}
        class={`flex items-center h-12 py-2 text-sm text-center text-gray-100 
        ${location.pathname==='/myprojects/manageproject/mentorship'||location.pathname==='/myprojects/manageproject/mentorship/'?'bg-gray-800':'bg-gray-500'} px-7 border border-b-0  border-gray-300 sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}>
            Industry Mentorship
        </button>
        </>
    
    
    :

    <button onClick = {()=> {
        history.push('/myprojects/manageproject/mentorship')
    }}
    class={`flex items-center ml-[185px] mr-24 h-12 py-2.5 text-sm text-center text-gray-100 
   bg-gray-500 px-7 border border-b-0 hover:bg-gray-600  border-gray-300 sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 inline mr-1 top-[0.1px] relative" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
</svg>
        
       <span class = 'relative bottom-[0.016px] font-semibold'> Go Back </span>
    </button>
    
    }



        <button
onClick = {()=> {setShowHeader(showHeader?false:true)}}

        class={` items-center h-12 left-36 relative py-1.5 text-sm text-center text-gray-100 
        hover:from-gray-600 hover:to-gray-700 bg-gradient-to-b from-gray-500 to-gray-500 border-1   px-4 border-b-0   sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}>
            <FcCollapse class = {`text-4xl -top-[1px] text-gray-200 relative ${!showHeader?'rotate-180':''}`}/>
        </button>



        </>
        
        
        
        }

       

        
    </div>



        <Switch>

        <Route path = '/myprojects/allprojects'>
            <AllProjects/>
        </Route>

        <Route path = '/myprojects/createproject'>
            <CreateProject/>
        </Route>

        <Route path = '/myprojects/joinrequests'>
            <JoinRequests/>
        </Route>

        <Route path = '/myprojects/manageproject'>
            <ManageProject/>
        </Route>



        <Route path = '/myprojects'>
            <Redirect to = '/myprojects/allprojects'/>
        </Route>


        </Switch>

            




        </>
    )
}

export default MyProjects