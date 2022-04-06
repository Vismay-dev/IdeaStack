import { useState, useEffect } from "react";
import ExpertDetails from "../Modals/ExpertDetails";
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Dropdown from './Dropdown'
import logo from '../Modals/logo.png'
import AOS from 'aos';
import "aos/dist/aos.css";

  export default function BrowseExperts() {


    

      const [showExpert, setShowExpert] = useState(false);
      const [expertId, setExpertId] = useState(null)
      const [experts, setExperts] = useState([])
const [loading, setLoading] = useState(false)
const location = useLocation()
const [origExperts, setOrigExperts] = useState([])

useEffect(() => {
  AOS.init({
    duration : 800
  });
},[experts]);



      useEffect(()=> {
        setLoading(true)
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/getMentors':'http://localhost:4000/api/project/getMentors',
        {token:sessionStorage.getItem('token')}).then(res => {
            setExperts(res.data)
            setOrigExperts(res.data)
            setTimeout(()=> {
              setLoading(false)
            },1000)
        }).catch(err => {
            console.log(err.response)
            setLoading(false)
        })
    },[location.pathname])



    const textFilter = (text) => {
      let arr = []
      let arrPrior = []
      let array = origExperts
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
          setExperts(arr)
         }


  const [text, setText] = useState('')
  const textChangeHandler = (e) => {
     setText(e.target.value)
  }

  const filterByText = ()=> {
     if(text!=='') {
     textFilter(text);
     }else {
      setExperts(origExperts)
     }
  }

  const getCateg = (categ) => {
    if(categ === 'All') {
        setLoading(experts!==origExperts?true:false)
        setTimeout(()=> {
          setExperts(origExperts)
          setLoading(false)
        },experts!==origExperts?1000:0)
    } else {
      let arr = []
      for(let i = 0; i<origExperts.length;i++) {
        for(let j = 0; j<origExperts[i]['fields'].length;j++) {
          if(origExperts[i]['fields'][j] === categ) {
            arr.push(origExperts[i])
          }
        }
      }
      setLoading(true)
      setTimeout(()=> {
          setExperts(arr)
          setLoading(false)
      },1000)
    }
}






    return (
        <>

        {
            showExpert ? <ExpertDetails close = {()=>setShowExpert(false)} experts = {experts} id = {expertId}/> : ''
        }
        <div class="max-w-2xl mx-auto pt-10  px-14 -mb-[200px] relative lg:max-w-7xl ">
            <h2 style = {{'backgroundImage':'url(https://upload.wikimedia.org/wikipedia/commons/8/81/Maxresdefault_%281%29.jpg)'}} class = 'text-center bg-no-repeat z-30 bg-gradient-to-br from-cyan-400 to-cyan-600   text-gray-100 top-1  bg-right w-full ring-2 ring-offset-2 ring-offset-cyan-500 border-2 border-blue-700 ring-blue-700 rounded-sm shadow-md mb-[74px] relative'>
              <div class = 'bg-gray-900 bg-opacity-40 py-10 pb-11'>
              
              <p class = 'text-5xl  font-bold'>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-14 bottom-[3px] mr-0.5 -ml-1.5 relative w-14 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path d="M12 14l9-5-9-5-9 5 9 5z" />
  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
<path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
</svg> Seek Mentorship</p>
              <p class = 'text-2xl mt-0.5 left-1.5 relative font-semibold'>Find the Right Expert</p>
              </div>
              </h2>
              
              <div class="flex pointer-events-auto z-10 -space-x-4 bg-gradient-to-l from-gray-300 to-slate-50 shadow-md py-5 pb-3 bottom-[71.5px] relative justify-center w-10/12  rounded-b-lg  mx-auto">
            
            <div class="flex items-center z-40 justify-center relative">
    <div class="flex border-2 pointer-events-auto rounded-sm -mr-3 border-gray-300">
        <input type="text" onChange={textChangeHandler} class="px-4 py-2 w-64 shadow-sm border-0" placeholder="Search Expert"/>
        <button onClick={()=>filterByText()} class="flex items-center hover:shadow-lg hover:bg-blue-700 active:shadow-sm shadow-sm justify-center px-4 border-l bg-blue-600">
            <svg class="w-6 h-6 text-gray-100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
        </button>
    </div>

   <Dropdown passCategory = {getCateg}/>

</div>
    </div>

   { experts&&experts.length===0?

<div className="bg-gray-50 ring-2 ring-indigo-500 w-full pl-9 mb-32 bottom-2 mt-8 rounded-sm relative shadow-lg">
   <div className="w-full mx-auto py-9 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
     <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
       <span className="block">Oops..</span>
       <span className="block text-blue-700">No Search Results Appeared.</span>
     </h2>
     <div className="-mt-2 flex lg:flex-shrink-0">
       <img class = 'w-64 right-11 relative h-64' src = {logo}></img>
     </div>
   </div>
 </div>

 :

  
     loading?
     <div class ='relative mx-auto my-7 mb-9 pb-36 pt-20 pl-6 text-center block justify-center'>
     <ClipLoader color={'#0055b3'} loading={loading}  size={130} />
     </div>
:
          <div class="grid grid-cols-1 z-30 pointer-events-none mb-2 mt-2 relative top-[13px]  gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 ">
            {


              
            experts.map((expert,i) => (
              <a data-aos={"zoom-in-up"} data-aos-once='true' delay = {`${i%3}00`} key={expert.id} onClick={()=> {setShowExpert(true); setExpertId(expert.id)}} class={`group z-40 pointer-events-auto  rounded-md cursor-pointer`}>
                <div  class="w-full bg-gray-200    shadow-xl rounded-[.25rem] overflow-hidden xl:aspect-w-6 xl:aspect-h-7">
                  <img
                    src={expert.pic}
                    alt="expert"
                    class="w-full   h-[320px]   object-top object-cover group-hover:opacity-75"
                  />
                </div>
                <h3 class="mt-4 text-md text-gray-700">{expert.role}</h3>
                <p class="mt-1 text-lg font-medium text-gray-900">{expert.name}</p>
              </a>
            ))}
          </div>
  }
        </div>
        </>
    )
  }