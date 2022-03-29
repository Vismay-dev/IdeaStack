

import Feed from './Feed'
import Contact from './Contact'
import Documents from './Documents'


const Collaborate = () => {

    return (
        <>
            <h2 class = 'text-center font-bold text-6xl text-gray-800 top-1 relative mt-8  -mb-0.5'>Collaborate</h2>


<div class = ' grid-cols-5 grid-rows-3 grid relative gap-6 space-y-1 top-1  mt-14 -mb-[205px] w-full h-fit px-28'>
       <Feed/>
       <Documents/>
        <Contact/>
</div>
            
        
        </>
    )
}

export default Collaborate