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
   const [prevLocation2, setPrevLocation2] = useState('');

   const [bool2, setBool2] = useState(false);

   useEffect(()=> {
    if(!bool2 && location.pathname.split('/').length-1===3){    

    

    if(location.pathname.split('/').length-1===3 && (prevLocation2.split('/').length-1===2 || prevLocation.split('/').length-1===2)){
        setShowHeader(true)
    }else if(location.pathname !== '/myprojects/manageproject/overview' && location.pathname.split('/')[2] === 'manageproject' || showHeader===false&&prevLocation!=='/myprojects/manageproject/overview'&&prevLocation2.split('/').length-1!==2&&prevLocation.split('/').length-1!==2){
        setShowHeader(false)
            setBool2(true)
    }else{
        setShowHeader(true)
    }

    if(showHeader === true && prevLocation!=='/myprojects/manageproject/overview') {
        setShowHeader(true)
    }

    
}

    if(prevLocation2.split('/').length-1 === 2 &&  location.pathname === '/myprojects/manageproject/overview'){
        setShowHeader(true)
    }


 
   },[location.pathname])

   const [bool, setBool] = useState(false);


   useEffect(()=> {
    if(!bool && location.pathname.split('/').length-1===2){
    
    
        if(location.pathname !== '/myprojects/allprojects' && location.pathname.split('/')[2] !== 'manageproject' || showHeader===false&&prevLocation2!=='/myprojects/allprojects'){
            setShowHeader(false)
            setBool(true)
    }else{
        setShowHeader(true)
    }

    if(showHeader === true && prevLocation2!=='/myprojects/allprojects') {
        setShowHeader(true)
    }


}
  
   },[location.pathname])


   useEffect(()=> {

    if(location.pathname === '/myprojects/manageproject/overview') {
        setPrevLocation(location.pathname)
    } else {
        setPrevLocation('')
    }
   },[location.pathname])


   useEffect(()=> {

    if(location.pathname === '/myprojects/allprojects') {
        setPrevLocation2(location.pathname)
    } else {
        setPrevLocation2(location.pathname)
    }
   },[location.pathname])

         

    return (
        <>

        {showHeader?
         <div 
         data-aos={"flip-up"} data-aos-once='true'
style={{'background-image': 'url(https://airwallpaper.com/wp-content/uploads/wall001/Earth-Wallpaper.jpg)'}}            
   className="shadow-md transition-transform ease-out overflow-hidden origin-top transform xl:container bg-right bg-cover bottom-4  xl:flex block justify-center xl:w-10/12 mx-auto pt-7 bg-gradient-to-r from-gray-100 to-gray-300">
       <div>
           <h1 className="xl:text-7xl md:text-6xl sm:text-5xl text-[43px] sm:leading-[54px] xl:leading-[72px] md:leading-[65px] leading-10 relative text-center text-gray-100 font-extrabold pb-6 mb-1  mx-auto">{!sessionStorage.getItem('managing')?'My Projects':projectCurrent}</h1>
       </div>
   </div>:''
}

            <div class="flex space-x-1 overflow-hidden bg-gradient-to-l from-gray-300 to-slate-50 shadow-md py-1 pt-5 justify-center xl:w-10/12 w-full md:pr-16 sm:pr-32 pr-[130px] rounded-b-lg mx-auto">
        {!sessionStorage.getItem('managing')?<><button onClick = {()=> {
            history.push('/myprojects/allprojects')
        }} class={`flex items-center h-12 pt-0.5 relative ml-[132px]  text-sm text-center text-gray-100 
        ${location.pathname==='/myprojects/allprojects'?'bg-gray-800':'bg-gray-500'} space-x-1 sm:px-7 sm:py-2 px-4 py-1 border border-b-0  border-gray-300 sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}>
            <p>All</p> Projects
        </button>

        <button onClick = {()=> {
            history.push('/myprojects/joinrequests')
        }}
        class={`flex items-center h-12 pt-0.5   text-center text-gray-100 
        ${location.pathname==='/myprojects/joinrequests'?'bg-gray-800':'bg-gray-500'}  space-x-1 sm:px-8 sm:py-2 px-3.5 py-1 border border-b-0  border-gray-300 text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}>
            <p>Join <span class = 'sm:inline hidden'>Requests & Invites</span></p>
        </button>

        <button onClick = {()=> {
            history.push('/myprojects/createproject')
        }}
        class={`flex items-center h-12 pt-0.5  text-center text-gray-100 
        ${location.pathname==='/myprojects/createproject'?'bg-gray-800':'bg-gray-500'} space-x-1  sm:px-8 sm:py-2 px-4 py-1 border border-b-0  border-gray-300 text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}>
           <p>Create</p>  <p class = 'hidden sm:block space-x-1'> Project</p>
        </button>
        
        <button
onClick = {()=> {setShowHeader(showHeader?false:true)}}

        class={` items-center h-12 pt-0.5 xl:left-48 lg:left-24 left-0 relative sm:py-1.5  text-center text-gray-100 
        hover:from-gray-600 hover:to-gray-700 bg-gradient-to-b from-gray-500 to-gray-500 border-1   sm:px-4 px-1.5 py-1  border-b-0   text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}>
            <FcCollapse class = {`text-4xl -top-[1px] text-gray-200 relative ${!showHeader?'rotate-180':''}`}/>
        </button>
        
        
        </>:



<>

{
    location.pathname!=='/myprojects/manageproject/mentorship/browse'?
<>
<button onClick = {()=> {
        history.push('/myprojects/allprojects')
    }}
    class={`flex items-center xl:-ml-[36] xl:-left-20 md:ml-[63px] sm:ml-[125px] ml-[242px] xl:mr-0 relative h-12 py-2.5 text-sm text-center text-gray-100 
   bg-gray-500 md:px-5 px-3 border border-b-0 hover:bg-gray-600  border-gray-300 sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}>
       
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline lg:mr-1.5 top-[0.03px] relative" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
</svg>
        
       <span class = 'relative bottom-[0.016px] lg:inline hidden font-semibold'> Go Back </span>
    </button>
<button onClick = {()=> {
            history.push('/myprojects/manageproject/overview')
        }} class={`flex items-center h-12 relative ml-[72px] py-2 text-sm text-center text-gray-100 
        ${location.pathname==='/myprojects/manageproject/overview'?'bg-gray-800':'bg-gray-500'} md:px-6 px-3 border border-b-0  border-gray-300 sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}>
            Overview
        </button>
<div class = 'sm:flex space-x-[3.5px] hidden'>
        <button onClick = {()=> {
            history.push('/myprojects/manageproject/manageapps')
        }}
        class={`flex items-center h-12 py-2 text-sm text-center text-gray-100 
        ${location.pathname==='/myprojects/manageproject/manageapps'?'bg-gray-800':'bg-gray-500'} md:px-6 px-3 border border-b-0  border-gray-300 sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}>
            <span class = 'lg:inline hidden  mr-1.5'>Manage </span> Applications
        </button>

        <button onClick = {()=> {
            history.push('/myprojects/manageproject/collaborate')
        }}
        class={` block items-center h-12 py-2 text-sm text-center text-gray-100 
        ${location.pathname==='/myprojects/manageproject/collaborate'?'bg-gray-800':'bg-gray-500'} md:px-6 px-3 border border-b-0  border-gray-300 sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}>
            Collaborate
        </button>

        <button onClick = {()=> {
            history.push('/myprojects/manageproject/mentorship')
        }}
        class={`flex items-center h-12 py-2   text-sm text-center text-gray-100 
        ${location.pathname==='/myprojects/manageproject/mentorship'||location.pathname==='/myprojects/manageproject/mentorship/'?'bg-gray-800':'bg-gray-500'} md:px-6 px-3 border border-b-0  border-gray-300 sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}>
            <span class = 'lg:inline hidden mr-1.5'>Industry </span> Mentorship
        </button>
        </div>
        </>
    
    
    :

    <button onClick = {()=> {
        history.push('/myprojects/manageproject/mentorship')
    }}
    class={`flex items-center ml-[330px] mr-40 h-12 py-2.5 text-sm text-center text-gray-100 
   bg-gray-500 px-7 border border-b-0 hover:bg-gray-600  border-gray-300 sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}>
       
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline mr-1.5 top-[0.03px] relative" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
</svg>
        
       <span class = 'relative bottom-[0.016px] font-semibold'> Go Back </span>
    </button>
   
    }



        <button
onClick = {()=> {setShowHeader(showHeader?false:true)}}

        class={` items-center h-12 ${sessionStorage.getItem('managing')?'left-0 xl:left-24 md:px-4 px-2':"left-24 px-4"}  relative py-1.5 text-sm text-center text-gray-100 
        hover:from-gray-600 hover:to-gray-700 bg-gradient-to-b from-gray-500 to-gray-500 border-1    border-b-0   sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}>
            <FcCollapse class = {`text-4xl -top-[1px] text-gray-200 relative ${!showHeader?'rotate-180':''}`}/>
        </button>
<br/>
<div class = 'sm:hidden block relative'>
    <br/>
        <div class = 'space-x-[3px] flex relative mt-8 -ml-[259px] mr-12 '>
        <button onClick = {()=> {
            history.push('/myprojects/manageproject/manageapps')
        }}
        class={`flex items-center h-12 py-2 text-sm text-center text-gray-100 
        ${location.pathname==='/myprojects/manageproject/manageapps'?'bg-gray-800':'bg-gray-500'} md:px-6 px-3 border border-b-0  border-gray-300 sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}>
            <span class = 'lg:inline hidden'>Manage</span> Applications
        </button>

        <button onClick = {()=> {
            history.push('/myprojects/manageproject/collaborate')
        }}
        class={` block items-center h-12 py-2 text-sm text-center text-gray-100 
        ${location.pathname==='/myprojects/manageproject/collaborate'?'bg-gray-800':'bg-gray-500'} md:px-6 px-3 border border-b-0  border-gray-300 sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}>
            Collaborate
        </button>

        <button onClick = {()=> {
            history.push('/myprojects/manageproject/mentorship')
        }}
        class={`flex items-center h-12 py-2   text-sm text-center text-gray-100 
        ${location.pathname==='/myprojects/manageproject/mentorship'||location.pathname==='/myprojects/manageproject/mentorship/'?'bg-gray-800':'bg-gray-500'} md:px-6 px-3 border border-b-0  border-gray-300 sm:text-base  rounded-t-md   whitespace-nowrap focus:outline-none`}>
            <span class = 'lg:inline hidden'>Industry</span> Mentorship
        </button>
        </div>
        </div>


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