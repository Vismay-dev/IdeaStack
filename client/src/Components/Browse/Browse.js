import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Dropdown from './Dropdown'
import axios from 'axios'
import MoreDetails from '../Modals/MoreDetails'

const Browse = () => {

   const history = useHistory()
   const [projects, setProjects] = useState([])

   useEffect(()=> {

      axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/getAllProjects':
      'http://localhost:4000/api/user/getAllProjects',{token:sessionStorage.getItem('token')}).then((res)=> {
         setProjects(res.data)
      })

   },[projects])

   const [projI,setProjI] = useState()
   const [showMore, setShowMore] = useState(false)




    return (
        <>

        {
           showMore?
           <MoreDetails close = {()=> {setShowMore(false)}} index = {projI}/>:
           ''
        }
          <div 
style={{'background-image': 'url(https://media.istockphoto.com/photos/dark-blue-grunge-background-picture-id185007737?b=1&k=20&m=185007737&s=170667a&w=0&h=2HRmWnMNz-WdJ9jQ94PksQlATGq6QSIvSyVQOOBbSTY=)'}}            
            className="shadow-md container bg-cover bg-right  bottom-4 w-10/12 flex justify-center mx-auto pt-8 bg-gradient-to-r from-gray-100 to-gray-300">
                <div >
                    <h1 className="xl:text-7xl text-7xl relative text-center text-gray-50 font-extrabold pb-6 mb-5  mx-auto"> Browse Projects</h1>
                </div>
            </div>

      <div class="flex -space-x-4 bg-gradient-to-l from-gray-300 to-slate-50 shadow-md py-5 pb-3 justify-center w-10/12 rounded-b-lg  mx-auto">
            
            <div class="flex items-center justify-center relative">
    <div class="flex border-2 rounded-sm -mr-3 border-gray-300">
        <input type="text" class="px-4 py-2 w-64 shadow-md border-0" placeholder="Search..."/>
        <button class="flex items-center hover:shadow-lg hover:bg-blue-700 active:shadow-sm shadow-md justify-center px-4 border-l bg-blue-600">
            <svg class="w-6 h-6 text-gray-100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
        </button>
    </div>

   <Dropdown/>
<button class="flex items-center hover:shadow-lg hover:bg-gray-600  hover:text-gray-300 border-l-2 border-l-gray-500 z-10 border-2 border-gray-300 active:shadow-sm shadow-md justify-center px-4 py-2  bg-gray-800">
            <svg class="w-6 h-6 text-gray-200" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
</button>
</div>
    </div>



        
        
        
        
    <div class="flex flex-wrap mx-auto mt-14  -mb-56 top-2 relative px-28">

{


projects.map((proj,i)=> {

     let date = new Date(proj.createdAt).toDateString().substring(4)
     date = date.slice(0, 6) + "," + date.slice(6);

  return(
    <div class="w-full md:w-1/2 xl:w-1/3 px-4">
    <div class={`rounded-lg shadow-lg bg-gradient-to-r relative  from-blue-50 to-indigo-100 mb-10`}>
    <button onClick={()=> {setShowMore(true); setProjI(i) }} class = 'bg-gradient-to-br from-blue-400 to-indigo-400 absolute bottom-6 active:shadow-md mx-auto left-1/3 justify-center w-1/3 items-center shadow-lg hover:from-blue-700 hover:to-blue-600 text-white p-1.5 z-30 px-2 rounded-md text-lg  hover:cursor-pointer'>View More</button>

       <img
          src={proj.projPic}
          alt="image"
          class="w-full h-56 object-contain py-3 -mb-3 bg-gray-50 border-b-2 border-gray-400 relative"
          />
       <div class="p-8 pb-14  text-center">
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
       </div>

    </div>

 </div>)
})


}


 
</div>
        
        
        
        </>

    )
}

export default Browse