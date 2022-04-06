import DocumentModal from "../Modals/DocumentModal"
import {useState, useEffect} from 'react'
import AOS from 'aos';
import "aos/dist/aos.css";

const Documents = () => {
    const [show, setShow] = useState(false)


    useEffect(() => {
        AOS.init({
          duration : 1200
        });
      },[]);

    return (

<>
        {show?<DocumentModal close = {()=>setShow(false)}/>:''}


        <div data-aos={"fade-up"} data-aos-once='true' style = {{'backgroundImage':'url(https://biglanguage.com/wp-content/uploads/2021/11/Technical-Document-Translation.jpg)'}}
        class = 'col-span-2 bg-cover row-span-1  bg-gradient-to-br from-blue-300 to-indigo-300 rounded-md shadow-xl'>
                                         <div class = 'h-full inset-0 bg-gray-900 bg-opacity-[0.65] pt-4'>
                        
                        <h3 class = 'uppercase text-center font-semibold text-gray-100 mb-1.5 text-3xl'>Documents</h3>
                        <hr class = 'mb-6 w-8/12 border-t-[0.3px] border-gray-100 mx-auto relative justify-center'></hr>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick = {()=> setShow(true)} class="h-[86px] w-32 left-0.5 hover:bg-slate-200 hover:shadow-lg shadow-sm active:shadow-sm cursor-pointer bg-slate-50 py-2 text-center mx-auto relative justify-center rounded-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
</svg>

</div>
        </div></>
    )
}

export default Documents