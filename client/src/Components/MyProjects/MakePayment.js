import {useHistory} from 'react-router-dom'

const MakePayment = () => {

    const history = useHistory()


    return (
        <>
        <div style = {{'backgroundImage':"url(https://www.vapulus.com/en/wp-content/uploads/2021/02/challenge-accepting-online-payments-technical-issue-1024x768-1.png)"}} 
        class={`rounded-md  mb-8 bg-cover shadow-lg bg-gradient-to-r h-[380px] border-[0.005px] border-blue-600  from-blue-50 to-indigo-200 overflow-hidden`}>
        <div class = 'bg-gray-900 h-full z-10 bg-opacity-[.75]'>

  <div class = 'h-28 pt-2.5 '>
  <p className="text-center top-2 text-xl px-10 font-semibold relative text-white">Payment Required for Session Scheduling:</p><br/>
  
<h3 class = 'font-semibold text-center mx-auto mt-[3px] mb-2.5 text-[20px] px-10 text-white'>All Session costs are divided <span class = 'text-blue-300'> equally and affordably</span> among <span class = 'text-blue-300'>Team Members</span>...</h3>
<button onClick={()=> history.push('/myprojects/manageproject/mentorship/browse')} class = 'bg-indigo-500  uppercase p-3 hover:ring-1 hover:ring-blue-400 hover:bg-indigo-600 hover:shadow-lg active:shadow-sm rounded-lg text-sm mx-auto relative block right-[8px] shadow-md py-2.5 mt-7 mb-2 text-white font-semibold'>Pay Pending Amount</button>

<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-center relative mx-auto block top-[28px] text-indigo-600 bg-blue-200 border-2 border-indigo-800 rounded-full p-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
</svg>

</div>
 
 </div>
 </div>
</>
    )
}

export default MakePayment