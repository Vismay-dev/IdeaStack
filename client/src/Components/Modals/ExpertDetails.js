import { useEffect, useState, useRef, useContext } from "react"
import axios from 'axios'
import AOS from 'aos';
import "aos/dist/aos.css";
import { StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react'
import {useHistory} from 'react-router-dom'

const product = {
  
    breadcrumbs: [
      { id: 1, name: 'Industry Mentorship', href: '#' },
      { id: 2, name: 'Browsing Experts', href: '#' },
    ],
 
    sizes: [
      { name:1, inStock: true },
      { name: 2, inStock: true },
      { name: 3, inStock: true },
      { name: 4, inStock: true },
    ],
    description:
      'Hey there! I hope to be able to make the entire patenting process easier for you and your project team. Sign Up for one-to-one mentorship! Id love to help out a few students via IdeaStack. Ill progress from basic patenting info to the resources you may need to undertake the patenting process. Ill also connect you to the appropriate connections to execute your projects patenting',
    highlights: [
      'Hand cut and sewn locally',
      'Dyed with our proprietary colors',
      'Pre-washed & pre-shrunk',
      'Ultra-soft 100% cotton',
    ],
    details:
      'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
  }
const reviews = { href: '#', average: 4, totalCount: 117 }
  
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const ExpertDetails = (props) => {


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

    const [selectedSize, setSelectedSize] = useState(product.sizes[2])  
    const [showConfirm, setShowConfirm] = useState(false)
    const [numberOfSessions, setNumberOfSessions] = useState(0);

    const submitHandler = (e) => {
      e.preventDefault();

      if(numberOfSessions===0||numberOfSessions===null){
        setShowError(true)
        setShowConfirm(false);
      } else {
        setShowError(false)
        finalizeMentorshipPackage()
        setShowConfirm(true);
      }
    }

    const [expert,setExpert] = useState();
    const [teamSize, setTeamSize] = useState();
    const [mentorshipPackage, setMentorshipPackage] = useState({

    })

    useEffect(()=> {
        axios.post(process.env.NODE_ENV ==='production'?'https://taskdeck-app.herokuapp.com/api/project/getTeamContacts':'http://localhost:4000/api/project/getTeamContacts',{token:sessionStorage.getItem('token'), projectID:sessionStorage.getItem('managing')}).then(res=> {
            setTeamSize(res.data.length)
            }).catch(err=> {
                console.log(err)
            })    

      for(let i = 0; i<props.experts.length;i++){
        if(props.experts.id===props.id) {
          setExpert(props.experts[i]);
        setMentorshipPackage({
            ...props.experts[i],
            teamSize: teamSize,
            individualCostPerSession: props.experts[i].pricing[0]/teamSize
          })

        }
      }
    },[props.experts])


    const [showMail, setShowMail] = useState(false)
    const [showPhone, setShowPhone] = useState(false)

    const [showError, setShowError] = useState(false)
    
    const finalizeMentorshipPackage = () => {

      let mentorshipPackageTemp = {
        ...mentorshipPackage,
        numberOfSessions: numberOfSessions,
        individualTotalCost: expert.pricing[0]/teamSize*numberOfSessions,
        paymentPending: true
      }

      setMentorshipPackage(mentorshipPackageTemp)

      console.log(mentorshipPackageTemp)


    }

    const history = useHistory()

    const addMentorshipPackage = () => {
      axios.post(process.env.NODE_ENV ==='production'?'https://taskdeck-app.herokuapp.com/api/project/addMentorshipPackage':'http://localhost:4000/api/project/addMentorshipPackage',{token:sessionStorage.getItem('token'), projectID:sessionStorage.getItem('managing'),mentorshipPackage}).then(res=> {
          history.push('/myprojects/manageproject/mentorship/')
          props.close()
        }).catch(err=> {
                console.log(err)
            })    
      
    }

    return (
        <div class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay, show/hide based on modal state. */}
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      
          {/* This element is to trick the browser into centering the modal contents. */}
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
   
          <div ref = {myRef} data-aos={"fade-up"} 
          style = {showConfirm?{'backgroundImage':'url(https://wallpaperaccess.com/full/885179.jpg)'}:{}} 
          data-aos-once='true' class="bg-cover inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:mt-5 sm:align-middle w-10/12">
            
            
            
          <div className="pt-6  -mb-[80px] relative">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-4 h-5 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {expert && expert.name}
              </a>
            </li>
          </ol>
        </nav>

        {!showConfirm?<>

        {/* Image gallery */}
        <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
         
          <div className="aspect-w-3 col-start-2 shadow-md mt-4 mb-1.5 relative mx-auto block justify-center aspect-h-3 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
            <img
              src={expert && expert.pic}
              alt={expert && expert.pic}
              className="w-full h-full shadow-md object-center object-cover"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{expert && expert.name}</h1>
            <h2 className="text-xl font-extrabold tracking-tight text-gray-600">{expert && expert.role}</h2>

          </div>

          {/* Options */}
          <div className="mt-4 lg:mt-0 lg:row-span-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900"><span class = 'font-bold'>AED {expert && expert.pricing[0]}</span> per session</p>
            {expert && expert.pricing[1]!==0 ? <p className="text-xl text-gray-600">First {expert.pricing[1]!==1?expert.pricing[1]:''} session{expert.pricing[1]>1?'s':''} <span class = 'font-semibold'>free of cost</span></p>:''}


            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form className="mt-12" onSubmit={submitHandler}>
              {/* Colors */}
              <div>
                <h3 className="text-sm text-gray-900 font-medium">Contact</h3>

                <RadioGroup className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                  <div className="flex items-center space-x-3">

                  <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{
                    if(showPhone&&!showMail){
                      setShowPhone(false)
                    } 
                    setShowMail(!showMail)}} class="h-7 w-7 text-indigo-500 hover:text-indigo-700 hover:h-9 hover:w-9 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
</svg>

<svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{
   if(showMail&&!showPhone){
    setShowMail(false)
  } 
  setShowPhone(!showPhone);
}} class="h-7 w-7 text-indigo-500 hover:text-indigo-700 hover:h-9 hover:w-9 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
</svg>





                  </div>
                </RadioGroup>
              </div>

<div class = 'mt-6 text-gray-700 font-semibold text-center'>
              {showMail&&expert?
expert.contact[0]===''||expert.contact[0]===null?'Email ID: Unavailable':
'Email ID: ' + expert.contact[0]:''
}

{showPhone&&expert?
expert.contact[1]===''||expert.contact[1]===null?'Phone Number: Unavailable':
'Phone Number: ' + expert.contact[1]:''
}
</div>

              {/* Sizes */}
              <div className="mt-9">
                <div className="flex items-center justify-between">
                  <h3 className={` ${showError?'text-red-600 font-semibold text-md':'text-gray-900 text-sm font-medium'} `}>Select no. of sessions</h3>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Info
                  </a>
                </div>

                <RadioGroup value={numberOfSessions} required onChange={(e)=>{setNumberOfSessions(e)}} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 mt-6 relative sm:grid-cols-8 lg:grid-cols-4">
                    {product.sizes.map((size) => {
                      let seshNum = (Number(size.name))
                      return(
                      <RadioGroup.Option
                      onClick = {()=>{setNumberOfSessions(size.name)}}
                        key={seshNum}
                        value={seshNum}
                        className={({ active }) =>
                          classNames(
                            size.inStock
                              ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                              : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                            active ? 'ring-2 ring-indigo-500' : '',
                            'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="p">{seshNum}</RadioGroup.Label>
                            {size.inStock ? (
                              <div
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-indigo-500' : 'border-transparent',
                                  'absolute -inset-px rounded-md pointer-events-none'
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <div
                                aria-hidden="true"
                                className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                              >
                                <svg
                                  className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                </svg>
                              </div>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>)
})}
                  </div>
                </RadioGroup>
              </div>

              {showError?
              <p class = 'text-center -mb-8 mt-8 font-semibold text-red-600 text-md'>Please select no. of sessions..</p>:''}

              <button
              type = 'submit'
                className="mt-12 mb-4 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Seek Mentorship - Paid
              </button>
            </form>
          </div>

          <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 -mb-3 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6 mt-3 relative">
                <p className="text-base text-gray-900">{expert && expert.mentorshipProp}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Mentor Strengths</h3>

              <div className="mt-4">
                <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                  {expert && expert.strengths.map((str) => (
                    <li key={str} className="text-gray-400">
                      <span className="text-gray-600">{str}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Background Information and Interests</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{expert && expert.background}</p>
              </div>
            </div>
          </div>
        </div>
        </> : <>
        
        
    <div 
    class="max-w-xs bg-cover mb-8 mt-12 relative mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <img class="object-cover  w-full" src={expert&&expert.pic} alt="avatar"/>
        
        <div class="py-5 text-center">
            <a href="#" class="block text-2xl font-bold text-gray-800 dark:text-white">{expert&& expert.name}</a>
            <span class="text-sm text-gray-700 dark:text-gray-200">{expert&&expert.role}</span>
        </div>
    </div>

    <div class = 'bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg shadow-lg border-indigo-700 border-2 w-1/2 relative mx-auto block  p-4 pl-5 pb-1 mb-32'>

    <h1 class = 'relative mx-auto block -mb-2.5  text-2xl font-semibold '>Is your project team willing to pay for this mentorship session?</h1>
    <h1 class = 'relative mx-auto block mt-8 text-2xl font-semibold   mb-3  '>Pricing <span class = 'text-indigo-800'>Details:</span></h1>

    <h1 class = 'relative mx-auto block mt-2 text-gray-800 text-lg font-semibold mb-1  w-full '>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 font-bold text-indigo-800 bottom-[1.5px] inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
</svg> Per Session Cost: <span class = 'font-bold'>AED {expert&&expert.pricing[0]/parseFloat(teamSize)}</span> Per Head</h1>

<h1 class = 'relative mx-auto block text-gray-800 text-lg font-semibold   w-full'>
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 font-bold text-indigo-800 bottom-[1.3px] inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
</svg> Total Cost for <span class = 'font-bold'>{numberOfSessions} sessions :  AED {numberOfSessions&&numberOfSessions*expert.pricing[0]/parseFloat(teamSize)}</span> Per Head</h1>

<div class = 'grid-cols-3 grid w-[360px]  gap-3 mt-10 mb-4'>
<button
    onClick = {()=> setShowConfirm(false)}
  className="bg-indigo-600 col-span-1 inline border border-transparent rounded-md py-2 px-8 items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
 Cancel
    </button>
    <button
    onClick = {()=> addMentorshipPackage()}
  className="bg-indigo-600 col-span-2 border border-transparent rounded-md py-2 px-3 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
 Confirm & Continue
    </button>
    </div>
</div>






        
        
        </> }
      </div>
            
            
        
        
     
        
        
        </div>


        </div>
    </div>

    )
}

export default ExpertDetails