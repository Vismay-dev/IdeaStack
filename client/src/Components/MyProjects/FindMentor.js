import {useHistory} from 'react-router-dom'

const FindMentor = () => {

    const history = useHistory()


    return (
        <>
        <div style = {{'backgroundImage':"url(https://wallpaperaccess.com/full/3533193.png)"}} 
        class={`rounded-md  mb-8 bg-cover shadow-lg bg-gradient-to-r h-[380px] border-[0.005px] border-blue-600  from-blue-50 to-indigo-200 overflow-hidden`}>
        <div class = 'bg-gray-500 h-full z-10 bg-opacity-10'>

  <div class = 'h-28 pt-2.5 '>
  <p className="text-center top-2 text-xl font-semibold relative">Find an Industry Mentor:</p><br/>
  
<h3 class = 'font-semibold text-center mx-auto mt-5 mb-2.5 text-2xl px-6'>Browse Available <span class = 'text-blue-700'>Industry Experts</span> and Seek <span class = 'text-blue-700'>Mentorship</span>...</h3>
<button onClick={()=> history.push('/myprojects/manageproject/mentorship/browse')} class = 'bg-indigo-500  uppercase p-3 hover:ring-1 hover:ring-blue-400 hover:bg-indigo-600 hover:shadow-lg active:shadow-sm rounded-lg text-sm mx-auto relative block right-[8px] shadow-md py-2.5 mt-10 mb-2 text-white font-semibold'>Browse Industry Experts</button>

<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-center relative mx-auto block top-[28px] text-indigo-600 bg-blue-200 border-2 border-indigo-800 rounded-full p-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
</svg>

</div>
 
 </div>
 </div>
</>
    )
}

export default FindMentor