import { useEffect, useState, useMemo, useContext, useRef } from "react"
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import userContext from '../../context/userContext'
import Tooltip from 'react-power-tooltip'

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

        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/updateUser':'http://localhost:4000/api/user/updateUser',{user, token:sessionStorage.getItem('token')}).then(res=> {
            currentUser.setUser(res.data)
            setTextArea(false)
            setEditing(false)
        }).catch(err=> {
            console.log(err.response?err.response.data:null)
        })

    }

    const removeInterest = (i) => {
        let interests = currentUser.user.interests;
        interests.splice(i, 1)

        let user = {
            ...currentUser.user,
            interests: interests
        }

        axios.post(process.env.NODE_ENV ==='production'?'https://ideastack.herokuapp.com/api/user/updateUser':'http://localhost:4000/api/user/updateUser',{user, token:sessionStorage.getItem('token')}).then(res=> {
            currentUser.setUser(res.data)
        }).catch(err=> {
            console.log(err.response?err.response.data:null)
          })

    }

    console.log(editedInterest)



    return (


    <div class="mt-10 w-11/12 bg-gray-50 shadow-lg mx-auto sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
     
      <div class="mt-5 md:mt-0 md:col-span-3">
          <div class="shadow overflow-hidden sm:rounded-md">
              <h1 class = 'text-blue-700 text-4xl mb-4 top-2 relative font-semibold left-6'>Add and Edit <span class = 'text-black'> Interests</span></h1>
            <div class="px-6 py-2 bg-gradient-to-r pt-10  max-h-fit from-blue-200 to-indigo-300">
        
            
          
            {textArea? <>
            {editing?
             <form onSubmit={editInterest}>
             <h1 class = 'font-semibold text-2xl left-1.5 -mt-2 text-gray-700 mb-4'>Edit Interest:</h1>
             <input  required name = 'title' onChange={handleChangeEdit} value = {editedInterest.title} class = 'mx-auto p-2 justify-self-center relative shadow-lg text-sm  rounded-md mb-3'></input><br/>
             <textarea max = {120} name = 'desc' required onChange = {handleChangeEdit} value = {editedInterest.desc} class = ' w-9/12 text-sm p-2 mx-auto relative justify-self-center shadow-lg h-24 rounded-md '></textarea>
             <br/>
              <button type = 'submit' class = 'w-1/4 font-semibold p-2 mt-2 mb-6 shadow-md mx-auto relative text-center z-20 bg-gray-100 hover:bg-gray-200 text-md rounded-md hover:cursor-pointer hover:text-indigo-600 text-blue-600 mr-2'>Submit</button>
               <button onClick = {(e)=> {
                   e.preventDefault()
                   setTextArea(false)
                   setEditing(false)
               }} class = 'w-1/4 font-semibold p-2 shadow-md mx-auto relative text-center z-20 bg-gray-100 hover:bg-gray-200 text-md rounded-md hover:cursor-pointer hover:text-indigo-600 text-blue-600'>Cancel</button>
            <br/>
            </form>
            :
            <form onSubmit={addInterest}>
            <h1 class = 'font-semibold text-2xl left-1 -mt-2 text-gray-700 mb-4'>Add an Interest:</h1>
            <input placeholder="Title of Interest" required name = 'title' onChange={handleChange} class = 'text-black mx-auto p-2 justify-self-center relative shadow-lg text-sm  rounded-md mb-3'></input><br/>
            <textArea max = {120} name = 'desc' required onChange = {handleChange} placeholder = 'Brief Description (Max 120 characters)' class = ' w-9/12 text-black text-sm p-2 mx-auto relative justify-self-center shadow-lg h-24 rounded-md '></textArea>
            <br/>
             <button type = 'submit' class = 'w-1/4 font-semibold p-2 mt-2 mb-6 shadow-md mx-auto relative text-center z-20 bg-gray-100 hover:bg-gray-200 text-md rounded-md hover:cursor-pointer hover:text-indigo-600 text-blue-600 mr-2'>Submit</button>
              <button onClick = {(e)=> {
                  e.preventDefault()
                setTextArea(false)
              }} class = 'w-1/4 font-semibold p-2 shadow-md mx-auto relative text-center z-20 bg-gray-100 hover:bg-gray-200 text-md rounded-md hover:cursor-pointer hover:text-indigo-600 text-blue-600'>Cancel</button>
<br/>
</form>}
            
            </>:

<>
{currentUser.user.interests.length>0?
<div class = 'grid grid-cols-3 space-x-3 mb-10 -mt-5'>
{currentUser.user.interests.map((interest,i)=> {
          return (
              <div class="max-w-xs col-span-1 mx-auto top-5 relative mb-5 mr- overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-100  rounded-lg shadow-lg ">
                <div class="px-4 py-2">
                    <h1 class="text-xl text-center mr-4 font-bold mb-5 top-1.5 relative  text-gray-600">{interest.title}</h1>
                    <i data-tip="Remove Picture" 
                    onClick = {()=>{
                        setShowToolTip(false)
                        setTextArea(true); 
                    setEditing(true); 
                    setEditedInterest(currentUser.user.interests[i])
                    setEditIndex(i)
                }}
                     onMouseOver={() => setShowToolTip(true)} 
                 onMouseLeave={() => setShowToolTip(false)} 
                className="fas hover:cursor-pointer hover:text-blue-900  fa-edit font-semibold text-md absolute right-2 top-2 text-blue-600">
<Tooltip show={showToolTip} position = 'left' fontSize = '16px' padding = '6px 3px'>
  <span class = 'font-semibold text-center font-sans right-10 bottom-0.5'>Edit</span>
</Tooltip></i>
                    <i data-tip="Remove Picture" onClick = {()=> {
                       setShowToolTip2(false)
                        removeInterest(i)}}
                    onMouseOver={() => setShowToolTip2(true)} 
                 onMouseLeave={() => setShowToolTip2(false)} className="fas hover:cursor-pointer hover:text-red-800  fa-trash font-semibold text-md absolute right-3 top-8 text-red-600">
<Tooltip show={showToolTip2} position = 'left' fontSize = '16px' padding = '6px 3px'>
  <span class = 'font-semibold text-center font-sans right-10 bottom-0.5'>Delete</span>
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
              }} class = {`w-1/3 bottom-1 font-semibold p-2 shadow-md mx-auto relative text-center z-20 bg-gray-100 hover:bg-gray-200 ${currentUser.user.interests.length>0?'mt-1  mb-4':'mb-7'}   rounded-md hover:cursor-pointer hover:text-indigo-600 text-blue-600`}>Add Interest</button>
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