import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Dropdown from './Dropdown'
import axios from 'axios'
import MoreDetails from '../Modals/MoreDetails'
import PulseLoader from "react-spinners/PulseLoader"
import logo from '../Modals/logo.png'

import AOS from 'aos';
import "aos/dist/aos.css";

const Browse = () => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        AOS.init({
          duration : 800
        });
      }, [projects]);

   const history = useHistory()
   const [origProjects, setOrigProjects] = useState([])

   const [loading, setLoading] = useState(false)

   useEffect(()=> {
      setLoading(true)
      axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/getAllProjects':
      'http://localhost:4000/api/user/getAllProjects',{token:sessionStorage.getItem('token')}).then((res)=> {
         setProjects(res.data)
         setOrigProjects(res.data)
         setLoading(false)
      })
   },[])

   const [projI,setProjI] = useState()
   const [showMore, setShowMore] = useState(false)

   const textFilter = (text) => {
      let arr = []
      let arrPrior = []
      let array = origProjects
      const wordFilterArr = String(text).toLowerCase().split(/(?:,| )+/) //Words to be searched for in task names
      for(let i = 0; i<Array(...array).length;i++) {
          arrPrior.push(0);
          var projName = array[i]['name'].toLowerCase();
          var wordsContained = projName.split(/(?:,| )+/)
          var boolean = false;
          for(let j = 0; j<wordFilterArr.length;j++) {
              for(let k = 0; k<wordsContained.length; k++){
                  if(wordsContained[k]===wordFilterArr[j]){
                      arrPrior[i]++
                      boolean = true;
                  }
              }
          }
          if(boolean === true) {
              arr.push(array[i])
          }        
  }
  arrPrior = arrPrior.filter(e=> e!==0)
          
          let x, y,tmp;
          x = y = 0;
          for(let x = 0; x<arr.length-1;x++){
              var check = false;
              for(let y = 0; y<arr.length-1-x; y++){
                  if(arrPrior[y+1]>arrPrior[y]){
                      tmp = arr[y];
                      arr[y] = arr[y+1];
                      arr[y+1] = tmp;
                      check = true;
                  }
              }
              if(check===false) {
                  break;
              }
          }  
          setLoading(true)
          setTimeout(()=> {
              setProjects(arr)
              setLoading(false)
          },1000)
         }


  const [text, setText] = useState('')
  const textChangeHandler = (e) => {
     setText(e.target.value)
  }

  const filterByText = ()=> {
     if(text!=='') {
     textFilter(text);
     }else {
      setProjects(origProjects)
     }
  }

  const getCateg = (categ) => {
       if(categ === 'All') {
            setLoading(projects!==origProjects?true:false)
           setTimeout(()=> {
            setProjects(origProjects)
            setLoading(false)
           },projects!==origProjects?1000:0)
       } else {
         let arr = []
         for(let i = 0; i<origProjects.length;i++) {
             if(origProjects[i]['category']===categ) {
               arr.push(origProjects[i])
             }
         }
         setLoading(true)
         setTimeout(()=> {
             setProjects(arr)
             setLoading(false)
         },1000)
       }
  }

  const [changeZ, setChangeZ] = useState(false)

console.log(changeZ)

    return (
        <>

        {
           showMore?
           <MoreDetails close = {()=> {setShowMore(false)}} index = {projI}/>:
           ''
        }
          <div 
style={{'background-image': 'url(https://media.istockphoto.com/photos/dark-blue-grunge-background-picture-id185007737?b=1&k=20&m=185007737&s=170667a&w=0&h=2HRmWnMNz-WdJ9jQ94PksQlATGq6QSIvSyVQOOBbSTY=)'}}            
            className="shadow-md  bg-cover bg-right  bottom-4 lg:w-10/12  w-full flex justify-center mx-auto pt-8 bg-gradient-to-r from-gray-100 px-6 to-gray-300">
                <div >
                    <h1 className="xl:text-7xl md:text-6xl text-5xl  relative text-center text-gray-50 font-extrabold md:pb-6 md:pt-0 pt-1 pb-5 mb-5  mx-auto"> Browse Projects</h1>
                </div>
            </div>

      <div class="sm:flex block -space-x-4 bg-gradient-to-l from-gray-300 to-slate-50 shadow-md py-5 pb-3 justify-center lg:w-10/12 w-full rounded-b-lg  mx-auto">
            
            <div  data-aos={"fade-right"} data-aos-once='true' class="sm:flex block pointer-events-auto z-[70] items-center justify-center relative">
    <div class="flex justify-center sm:border-2 rounded-sm sm:-mr-3 mx-auto sm:border-gray-300">
        <input type="text" onChange={textChangeHandler} class="px-4 py-2  md:text-md text-sm sm:w-64 w-36 shadow-md border-0" placeholder="Search Project"/>
        <button onClick={()=>filterByText()} class="flex items-center hover:shadow-lg hover:bg-blue-700 active:shadow-sm shadow-md justify-center px-4 border-l bg-blue-600">
            <svg class="w-6 h-6 text-gray-100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
        </button>
    </div><br/>

<div >
   <Dropdown passCategory = {getCateg} />
   </div>
   
</div>
    </div>



        
        
        
        
    <div class="flex flex-wrap mx-auto md:mt-16 mt-12  md:-mb-52 -mb-48 top-2 relative md:px-[80px] sm:px-24 px-7 ">

{


   loading?

   <div class ='relative mx-auto my-10 mb-20 sm:py-[100px] py-[70px] pb-[100px] sm:pb-[130px] text-center block justify-center'>
   <PulseLoader color={'#2e62d1'} loading={loading}  size={25} margin={8} />
   </div>


   :

   projects.length===0?

   <div className="bg-gray-50 ring-2 ring-indigo-500 w-full pl-9 mb-7 mt-4 rounded-sm relative shadow-lg">
      <div className="w-full mx-auto md:py-10 md:pt-16 py-9 pt-16 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl lg:mt-0 -ml-[32px] mt-7 font-extrabold lg:text-left text-center tracking-tight text-gray-900 sm:text-4xl">
          <span className="block lg:px-12">Oops..</span>
          <span className="block text-blue-700 px-12">No Search Results Appeared.</span>
        </h2>
        <div className="-mt-2 lg:mx-0 mx-auto text-center block lg:flex relative justify-center py-3 lg:flex-shrink-0">
          <img class = 'md:w-64 w-52 lg:right-11 right-5 lg:mt-0 mt-3 relative block mx-auto md:h-64 h-52' src = {logo}></img>
        </div>
      </div>
    </div>

   :


projects.map((proj,i)=> {

     let date = new Date(proj.createdAt).toDateString().substring(4)
     date = date.slice(0, 6) + "," + date.slice(6);

  return(
    <div class={`md:w-1/2 w-full xl:w-1/3  sm:px-4 px-4 z-[50] pointer-events-auto`}>
    <div  data-aos={"fade-up"}  data-aos-once='true' class={`rounded-lg pointer-events-auto z-40 shadow-lg bg-gradient-to-r relative  from-blue-50 to-indigo-100 -mb-1`}>

       <img
          src={proj.projPic}
          alt="image"
          class="w-full h-56 object-contain py-7 -mb-3 bg-gray-50 border-b-2 border-gray-400 relative"
          />
       <div class="p-8 pb-9  text-center">
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
          <p class="sm:text-base  text-sm text-body-color mt-4 leading-relaxed mb-8">
            {proj.problem}
          </p>

          <button onClick={()=> {setShowMore(true); setProjI(i) }} class = 'bg-gradient-to-br  from-blue-400 to-indigo-400 relative  z-[10000] pointer-events-auto active:shadow-md mx-auto w-2/5  justify-center lg:w-1/3 md:w-1/2  -mt-2  -mb-6 items-center shadow-lg hover:from-blue-700 hover:to-blue-600 text-white p-1.5  px-2 rounded-md sm:text-lg text-md   hover:cursor-pointer'>View More</button>

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