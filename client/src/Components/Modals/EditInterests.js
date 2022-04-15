import { useEffect, useState, useMemo, useContext, useRef } from "react"
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import userContext from '../../context/userContext'
import Tooltip from 'react-power-tooltip'
import ClipLoader from "react-spinners/ClipLoader"

const EditPersonalInfo = (props) => {

  const currentUser = useContext(userContext)
  
  
 const [currentInterest, setCurrentInterest] = useState({
     title: '',
     desc: ''
 })

 const [showToolTip, setShowToolTip] = useState(false)
 const [showToolTip2, setShowToolTip2] = useState(false)

  
  const history = useHistory()

  const [interests, addInterests] = useState([])
  const [textArea, setTextArea] = useState(false)

  const [loading, setLoading] = useState(false)

    const addInterest = (e) => {

        e.preventDefault()
        let interests = currentUser.user.interests;
        interests.push(currentInterest)

        let user = {
            ...currentUser.user,
            interests: interests
        }

        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/updateUser':'http://localhost:4000/api/user/updateUser',{user, token:sessionStorage.getItem('token')}).then(res=> {
            currentUser.setUser(res.data)
            setTextArea(false)
        }).catch(err=> {
            console.log(err.response?err.response.data:null)
          })
    }

    const handleChange = (event) => {
        setCurrentInterest({
            ...currentInterest,
            [event.target.name]:event.target.value
        })
    }

    const handleChangeEdit = (event) => {
        setEditedInterest({
            ...editedInterest,
            [event.target.name]:event.target.value
        })
    }

    const [editing, setEditing] = useState(false)
    const [editedInterest, setEditedInterest] = useState({
        title: '',
        desc: ''
    })
    const [editIndex, setEditIndex] = useState(null)
    const editInterest = (e) => {
        e.preventDefault()
        let interests = currentUser.user.interests;
        let i = editIndex
        interests.splice(i,1,editedInterest);

        let user = {
            ...currentUser.user,
            interests: interests
        }

        setLoading(true)

        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/updateUser':'http://localhost:4000/api/user/updateUser',{user, token:sessionStorage.getItem('token')}).then(res=> {
            currentUser.setUser(res.data)
            setTextArea(false)
            setEditing(false)
            setLoading(false)

        }).catch(err=> {
            console.log(err.response?err.response.data:null)
            setLoading(false)
        })

    }

    const removeInterest = (i) => {
        let interests = currentUser.user.interests;
        interests.splice(i, 1)

        let user = {
            ...currentUser.user,
            interests: interests
        }

        setLoading(true)


        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/updateUser':'http://localhost:4000/api/user/updateUser',{user, token:sessionStorage.getItem('token')}).then(res=> {
            currentUser.setUser(res.data)
            setLoading(false)
        }).catch(err=> {
            console.log(err.response?err.response.data:null)
            setLoading(false)
          })

    }




    return (


    <div class="mt-2 mb-3 sm:w-11/12 w-[100%] sm:left-0 left-[4.8%] relative bg-gray-50 shadow-lg mx-auto sm:mt-0">
    <div class=" gap-6">
     
      <div class="mt-5 md:mt-0">
          <div class="shadow sm:right-0 right-[2px] relative overflow-hidden sm:rounded-md">
              <h1 class = 'text-blue-700 md:text-4xl sm:text-3xl text-2xl mb-6 top-2 relative font-semibold sm:mt-2 sm:mb-4.5 my-1.5 sm:bottom-0 bottom-2.5  sm:left-8'>Add and Edit <span class = 'text-black'> Interests</span></h1>
            <div class="px-6 py-2 bg-gradient-to-r pt-10   max-h-fit from-blue-200 to-indigo-300">
        
            
          
            {
            

            loading?
      <div class ='relative mx-auto my-8 mb-10 pb-3 pt-1.5 text-center block justify-center'>
      <ClipLoader color={'#0b0bbf'} loading={loading}  size={50} />
      </div>
:
            
            
            
            textArea? <>
            {editing?
             <form onSubmit={editInterest}>
             <h1 class = 'font-semibold text-2xl -mt-2 bottom-1 relative text-gray-700 mb-4'>Edit Interest:</h1>
             <input  required name = 'title' onChange={handleChangeEdit} value = {editedInterest.title} class = 'mx-auto p-2 justify-self-center text-gray-700 right-1  relative shadow-lg text-sm  rounded-md mb-3'></input><br/>
             <textarea max = {120} name = 'desc' required onChange = {handleChangeEdit} value = {editedInterest.desc} class = '  md:w-9/12 sm:w-11/12 right-1 w-full text-gray-700 text-sm p-2 mx-auto relative justify-self-center shadow-lg h-24 rounded-md '></textarea>
             <br/>
              <button type = 'submit' class = 'md:w-1/4 w-2/4 md:right-0 -right-[1px] font-semibold p-2 md:mt-2 mt-4 md:mb-6 mb-4 shadow-md mx-auto relative text-center z-20 bg-gray-100 hover:bg-gray-200  text-sm lg:text-md rounded-md hover:cursor-pointer hover:text-indigo-600 text-blue-600 mr-2'>Submit</button>
               <button onClick = {(e)=> {
                   e.preventDefault()
                   setTextArea(false)
                   setEditing(false)
               }} class = 'md:w-1/4 w-2/4 md:right-0 -right-[1px] md:mt-0 -mt-6 md:mb-0 mb-6 font-semibold p-2 shadow-md mx-auto relative text-center z-20 bg-gray-100 hover:bg-gray-200   text-sm lg:text-md rounded-md hover:cursor-pointer hover:text-indigo-600 text-blue-600'>Cancel</button>
            <br/>
            </form>
            :
            <form onSubmit={addInterest}>
            <h1 class = 'font-semibold text-2xl left-1 lg:-mt-2 -mt-5 text-gray-700 mb-6'>Add an Interest:</h1>
            <input placeholder="Title of Interest" required name = 'title' onChange={handleChange} class = 'text-black mx-auto p-2 justify-self-center relative shadow-lg text-sm right-1  rounded-md mb-3'></input><br/>
            <textArea max = {120} name = 'desc' required onChange = {handleChange} placeholder = 'Brief Description (Max 120 characters)' class = ' md:w-9/12 sm:w-11/12 w-full right-1  text-black text-sm p-2 mx-auto relative justify-self-center shadow-lg h-24 rounded-md '></textArea>
            <br/>
             <button type = 'submit' class = 'md:w-1/4 w-2/4 md:right-0  -right-[1px] font-semibold p-2 md:mt-2 mt-4 md:mb-6 mb-4 shadow-md mx-auto relative text-center z-20 bg-gray-100 hover:bg-gray-200 text-sm lg:text-md rounded-md hover:cursor-pointer hover:text-indigo-600 text-blue-600 mr-2'>Submit</button>
              <button onClick = {(e)=> {
                  e.preventDefault()
                setTextArea(false)
              }} class = 'md:w-1/4 w-2/4 md:right-0 -right-[1px] md:mt-0 -mt-6 md:mb-0 mb-5 font-semibold p-2 shadow-md mx-auto relative text-center z-20 bg-gray-100 hover:bg-gray-200 text-sm lg:text-md rounded-md hover:cursor-pointer hover:text-indigo-600 text-blue-600'>Cancel</button>
<br/>
</form>}
            
            </>:

<>
{currentUser.user.interests.length>0?
<div class = 'grid lg:grid-cols-3 md:grid-cols-2 gap-6 space-x-3 mb-10 -mt-5'>
{currentUser.user.interests.map((interest,i)=> {
          return (
              <div class={` w-full  mx-auto top-5 relative mb-5 ${i!==0?'right-3':''} overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-100  rounded-lg shadow-lg `}>
                <div class="px-4 py-2">
                    <h1 class="sm:text-xl text-lg text-center mr-4 font-bold mb-5 sm:top-1.5 top-2 sm:left-0 left-[1px] relative  text-gray-600">{interest.title}</h1>
                    <i data-tip="Remove Picture" 
                    onClick = {()=>{
                        setShowToolTip(false)
                        setTextArea(true); 
                    setEditing(true); 
                    setEditedInterest(currentUser.user.interests[i])
                    setEditIndex(i)
                }}
                     onMouseOver={() => setShowToolTip(i)} 
                 onMouseLeave={() => setShowToolTip(false)} 
                className="fas hover:cursor-pointer hover:text-blue-900  fa-edit font-semibold text-md absolute right-2 top-2 text-blue-600">
<Tooltip show={showToolTip===i} position = 'left' fontSize = '16px' padding = '6px 3px'>
  <span class = 'font-medium text-center font-sans right-10 bottom-0.5'>Edit</span>
</Tooltip></i>
                    <i data-tip="Remove Picture" onClick = {()=> {
                       setShowToolTip2(false)
                        removeInterest(i)}}
                    onMouseOver={() => setShowToolTip2(i)} 
                 onMouseLeave={() => setShowToolTip2(false)} className="fas hover:cursor-pointer hover:text-red-800  fa-trash font-semibold text-md absolute right-3 top-8 text-red-600">
<Tooltip show={showToolTip2===i} position = 'left' fontSize = '16px' padding = '6px 3px'>
  <span class = 'font-medium text-center font-sans right-10 bottom-0.5'>Delete</span>
</Tooltip></i>
                    <p class="text-sm text-gray-600 mt-2 mb-2 mr-1 text-center">{interest.desc}</p>
                </div>
              </div> 
          )
        })}
</div>
        
        :''}

                <button onClick = {()=> {
                setTextArea(true)
              }} class = {`sm:w-1/3 w-2/3 bottom-1 font-semibold p-2 shadow-md mx-auto relative text-center z-20 bg-gray-100 hover:bg-gray-200 ${currentUser.user.interests.length>0?'mt-1  mb-4':'mb-7'}   rounded-md hover:cursor-pointer hover:text-indigo-600 text-blue-600`}>Add Interest</button>
</>
}
              
            </div>
            </div>
            <div class="px-4 py-3 relative bg-gray-50 sm:px-6 text-center">

            </div> 
      </div>
    </div>
  </div>






    )
}

export default EditPersonalInfo