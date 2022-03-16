import AOS from 'aos';
import "aos/dist/aos.css";
import { PaperClipIcon } from '@heroicons/react/solid'
import { useEffect, useState, useRef } from "react";
import axios from 'axios'

const EditApplicationForm = (props) => {

    useEffect(() => {
        AOS.init({
          duration : 1000
        });
      }, []);
    
      const myRef = useRef()
    
    
    useEffect(
      () => {
        const listener = (event) => {
          // Do nothing if clicking ref's element or descendent elements
          if (!myRef.current || myRef.current.contains(event.target)) {
            return;
          }
          props.close();
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because the passed-in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [myRef, () => props.close()]
    );

    const [question, setQuestion] = useState()
    const [addingQ, setAddingQ] = useState(false)
    const [questions, setQuestions] = useState([]);

    const qChangeHandler = (e) => {
        setQuestion(e.target.value)
    }


    useEffect(() => {
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/getQuestions':'http://localhost:4000/api/project/getQuestions',
         {token:sessionStorage.getItem('token'),projectID:sessionStorage.getItem('managing')}).then(res=> {
            setQuestions(res.data)
        }).catch(err=> {
            console.log(err.response)
        })
    },[questions])

   
    const deleteQ = (i) => {
        let questionsCurrent = questions.filter(q=> q!=questions[i])
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/updateQuestions':'http://localhost:4000/api/project/updateQuestions',
         {token:sessionStorage.getItem('token'),projectID:sessionStorage.getItem('managing'), questions: questionsCurrent}).then(res=> {
            setQuestions(res.data)
        }).catch(err=> {
            console.log(err.response)
        })
    }

    const addQ = () => {
        let questionsCurrent = [...questions,question]
        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/project/updateQuestions':'http://localhost:4000/api/project/updateQuestions',
         {token:sessionStorage.getItem('token'),projectID:sessionStorage.getItem('managing'), questions: questionsCurrent}).then(res=> {
            setQuestions(res.data)
            setAddingQ(false)
        }).catch(err=> {
            console.log(err.response)
        })
    }



return (

    <div class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay, show/hide based on modal state. */}
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
  
      {/* This element is to trick the browser into centering the modal contents. */}
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
  
      
        {/* Modal panel, show/hide based on modal state. */}
  
      <div ref = {myRef} data-aos={"fade-up"}  data-aos-once='true' class="pr-6 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:mt-5 sm:align-middle w-10/12">
        <div  class="bg-white px-4 pt-2 pb-2 sm:p-6 sm:pb-4">
         





        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Applicant Form</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Questions that will be asked to applicants. Try to keep it confined to absolutely necessary information.</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>

            {questions.map((q,i)=> {
                return (
<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 relative">
            <dt className="text-sm font-medium text-gray-500">Question #{i+1}</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{q}</dd>
            <svg onClick={()=> deleteQ(i)}
            xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 absolute right-4 top-3.5 shadow-md hover:bg-red-400 hover:shadow-lg active:shadow-md cursor-pointer bg-red-200 p-1 rounded-full mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>
          </div>
                )
            })}
          
          
          <div className="bg-white px-10 py-5 pt-9 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            {
                !addingQ?
            <button onClick={ () => setAddingQ(true)} class = 'bg-gradient-to-r hover:shadow-xl  bottom-2.5 text-xl uppercase text-gray-50 col-start-2 rounded-md p-2 pb-2.5 active:shadow-lg relative  from-blue-700 to-indigo-600 shadow-lg'>Add Question</button>
             : 
             <>
              <div class = ' col-span-1 col-start-2 -mb-1'>
             <textarea onChange={qChangeHandler} max = {120} name = 'desc' required  class = 'w-full text-sm p-2 mx-auto relative justify-self-center shadow-lg h-24 rounded-md '></textarea>
             </div>

             <div class = ' col-span-1 col-start-2 gap-6'>
             <button onClick={addQ} class = 'justify-center font-semibold p-2 w-7/12 mr-3 mb-6 shadow-md mx-auto relative text-center z-20 bg-gray-100 hover:bg-gray-200 text-lg uppercase rounded-md hover:cursor-pointer hover:text-indigo-600 text-blue-600 '>Submit</button>
             <button  onClick={ () => setAddingQ(false)} class = 'justify-center font-semibold p-2 px-3 w-[38%] mb-6 shadow-md mx-auto relative text-center z-20 bg-gray-100 hover:bg-gray-200 text-lg uppercase rounded-md hover:cursor-pointer hover:text-indigo-600 text-blue-600 '>Cancel</button>
             
            </div>
            </>
            }

          </div>
        </dl>
      </div>
    </div>








































          <div class="sm:flex sm:items-center">
  
        <div class="bg-gray-50 px-3 mt-4 w-full left-2 relative shadow-md border-y-indigo-200 border-2 -mr-6 py-0 sm:px-6 sm:flex sm:flex-row-reverse ">
        
          <button onClick = {props.close} type="button" class="-left-4 relative h-11 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-7 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-5 mb-5 sm:w-auto sm:text-md">
            Close
          </button>
          
        </div>
      </div>
    </div>
  </div>

  </div></div>






  )
}

export default EditApplicationForm