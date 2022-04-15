import { useState, useContext, useEffect } from "react"
import CreateProjectModal from "../Modals/CreateModal"
import projectContext from '../../context/projectContext'
import { useHistory } from "react-router-dom"

import AOS from 'aos';
import "aos/dist/aos.css";
import userContext from "../../context/userContext";

const CreateProject = () => {

    const [showCreateModal, setShowCreateModal] = useState(false)
    const projectCon = useContext(projectContext)
    const user = useContext(userContext).user
    const [showMore, setShowMore] = useState([false,null]);

    const readMore = (index) => {
        if(showMore[0]===false){
            setShowMore([true,index])
        } else if(showMore[0]===true&&showMore[1]!==index) {
            setShowMore([true,index])
        }else {
            setShowMore([false,null])
        }
    }

    useEffect(() => {
        AOS.init({
          duration : 600
        });
      },[showMore]);

    const history = useHistory()
    

    return (
        <>

            {
                showCreateModal?
                <CreateProjectModal close = {()=> {setShowCreateModal(false)}}/>
                 :''
            }

        
<h1 class = ' text-center w-10/12 relative mx-auto lg:mt-5 mt-5 py-4 lg:pb-8 pb-7 font-semibold text-gray-800 md:text-[47px] text-[38px] underline'>Projects Created ({user&& projectCon.projects&&projectCon.projects.filter(proj=>user._id===proj.admin.id).length})</h1>


        <div class = 'grid grid-cols-2 gap-4 align-middle content-center -mb-7 mt-[19px] md:px-[20px]   lg:px-[120px] sm:px-[70px] px-[19px]  sm:left-1.5 left-1 relative'>
            {



user&& projectCon.projects&&projectCon.projects.filter(proj=>user._id===proj.admin.id).length===0?


<p class = 'text-4xl font-semibold col-span-2 text-center mt-[65px] right-3 mb-6 pb-20 mx-auto relative'><svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 inline text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
<path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
</svg> <span class = 'top-0.5 relative'>No Projects Created..</span></p>




:
            
            
            
           user&& projectCon.projects&&projectCon.projects.filter(proj=>user._id===proj.admin.id).map((proj,i)=> {

                let date = new Date(proj.createdAt).toDateString().substring(4)
                date = date.slice(0, 6) + "," + date.slice(6);

                return(
                    (i+1)%2===1 && i === projectCon.projects.length-1 ?   <div key = {i} class = 'col-span-2 xl:px-64 lg:px-32 px-6'>

<div data-aos={"zoom-in"} data-aos-once='true' class={`w-full px-8  py-4 mt-1 mr-32 relative right-1.5 ${showMore[0]===true&&showMore[i]!==i?'':'h-full'} bg-white rounded-lg shadow-md `}>

<div class="flex items-center justify-between">
    <span class="text-sm font-light text-gray-600 ">{date}</span>
  
   <button type="button" class="text-white bg-gradient-to-l from-blue-600 to-blue-500 shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-3.5 py-1.5 -mr-2 mt-1 pt-1 text-md text-center mb-2" onClick={()=> {
       history.push('/myprojects/manageproject/')
       sessionStorage.setItem('managing',proj._id)
   }}>Manage</button>

</div>

<div class="mt-2   ">
    <a href="#" class="text-2xl relative font-bold text-gray-700 hover:text-gray-600  hover:underline">{proj.name}</a>
    <p class="mt-4 xl:pb-1 pb-2  md:text-md text-sm text-gray-600 relative ">
         {proj.problem}
    </p>
</div>

{showMore[0]&&showMore[1]==i?<><br/>
<h3>Category: {proj.category?proj.category:''}</h3>
<h3>Maximum Team Capacity: {proj.maxCap?proj.maxCap:''}</h3>
<h3>No. of Members:</h3>


<img class="mt-6 mb-9 border-2 py-5 rounded-sm  object-contain w-72 shadow-lg mx-auto relative h-56" src = {proj.projPic}></img></>
:''
       }


<div class="flex items-center justify-between mt-4">
    <a onClick = {()=>readMore(i)} class="text-blue-600 hover:cursor-pointer sm:bottom-0 bottom-[2px] relative  hover:underline">View {showMore[0]&&showMore[1]===i?'less':'more'}</a>
     <div class="flex items-center relative bottom-0.5">
        <img class="hidden object-cover w-10 h-10 mx-2 rounded-full sm:block" src={proj.admin.pic?proj.admin.pic:'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0='} alt="avatar"/>
        <a class="font-bold text-gray-700 cursor-pointer ">
             {proj.admin.name}
        </a>
    </div>
    
</div>
</div></div>:
           <div class = 'md:col-span-1 col-span-2' key = {i}>

           <div class={`w-full px-8 py-4 mt-1 mr-4 ${showMore[0]===true&&showMore[i]!==i?'':'h-full'} bg-white rounded-lg shadow-md `}>

           <div class="flex items-center justify-between">
               <span class="text-sm font-light text-gray-600 ">{date}</span>
             
              <button type="button" class="text-white bg-gradient-to-l from-blue-600 to-blue-500 shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-3.5 py-1.5 -mr-2 mt-1 pt-1 text-md text-center mb-2" onClick={()=> {
                  history.push('/myprojects/manageproject/')
                  sessionStorage.setItem('managing',proj._id)
              }}>Manage</button>

           </div>
   
           <div class="mt-1">
               <a href="#" class="text-2xl relative font-bold text-gray-700 hover:text-gray-600  hover:underline">{proj.name}</a>
               <p class="mt-4 xl:pb-1 pb-2  md:text-md text-sm text-gray-600 ">
                    {proj.problem}
               </p>
           </div>

           {showMore[0]&&showMore[1]==i?<><br/>
           <h3>Category: {proj.category?proj.category:''}</h3>
           <h3>Maximum Team Capacity: {proj.maxCap?proj.maxCap:''}</h3>
           <h3>No. of Members:</h3>


           <img class="mt-6 mb-9 border-2 py-5 rounded-sm  object-contain w-72 shadow-lg mx-auto relative h-56" src = {proj.projPic}></img></>
:''
                  }

           
           <div class="flex items-center justify-between mt-4">
               <a onClick = {()=>readMore(i)} class="text-blue-600 hover:cursor-pointer sm:bottom-0 bottom-[2px] relative  hover:underline">View {showMore[0]&&showMore[1]===i?'less':'more'}</a>
                <div class="flex items-center relative bottom-0.5">
                   <img class="hidden object-cover w-10 h-10 mx-2 rounded-full sm:block" src={proj.admin.pic?proj.admin.pic:'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0='} alt="avatar"/>
                   <a class="font-bold text-gray-700 cursor-pointer ">
                        {proj.admin.name}
                   </a>
               </div>
               
           </div>
       </div></div>
           )}
            ) 
        }

        </div>

        <button onClick = {() => setShowCreateModal(true)}
         class = {`mt-4 ${projectCon.projects.length>0?'lg:-mb-[152px] xl:-mb-[149px] -mb-[145px] lg:top-[70px] top-[65px]':'-mb-[4.6rem] top-40 '}  z-40 pointer-events-auto  bg-gradient-to-r  from-blue-600 to-blue-800 w-5/12 rounded-md shadow-lg hover:shadow-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-400 active:shadow-sm p-2 pb-2.5  text-gray-50 font-semibold md:text-2xl sm:text-xl text-lg mx-auto text-center block justify-center relative`}>Create Project</button>
        </>
    )
}

export default CreateProject