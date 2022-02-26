import Dropdown from './Dropdown'


const Browse = () => {





    return (
        <>
        <h1 class = 'text-6xl -mb-12 mt-12 font-semibold text-center'>Browse <span class = 'text-blue-600'>Projects</span></h1>
        
        <div class="flex items-center justify-center top-20 mt-8  mb-4 relative">
    <div class="flex border-2 rounded-sm border-gray-300">
        <input type="text" class="px-4 py-2 w-64 shadow-md border-0" placeholder="Search..."/>
        <button class="flex items-center hover:shadow-lg hover:bg-blue-700 active:shadow-sm shadow-md justify-center px-4 border-l bg-blue-600">
            <svg class="w-6 h-6 text-gray-100" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
        </button>
    </div>

   <Dropdown/>
<button class="flex items-center hover:shadow-lg hover:bg-gray-300 hover:border-gray-100 hover:text-gray-700 border-l-2 border-l-gray-500 z-10 border-2 border-gray-300 active:shadow-sm shadow-md justify-center px-4 py-2  bg-gray-100">
            <svg class="w-6 h-6 text-gray-900" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
</button>
</div>
        
        
        
        <hr class = 'border-top-2 border-gray-500 mx-auto mb-6 top-24 w-10/12 relative'/>
        
        <div class="flex flex-wrap  p-32 px-32">
         <div class="w-full md:w-1/2 xl:w-1/3 px-4">
            <div class={`rounded-lg shadow-md bg-gradient-to-r  from-blue-50 to-indigo-100 overflow-hidden mb-10`}>
               <img
                  src="https://cdn.tailgrids.com/1.0/assets/images/cards/card-01/image-03.jpg"
                  alt="image"
                  class="w-full "
                  />
               <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
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
                        mb-4
                        block
                        hover:text-primary
                        "
                        >
                     50+ Best creative website themes & templates
                     </a>
                  </h3>
                  <p class="text-base text-body-color leading-relaxed mb-7">
                     Lorem ipsum dolor sit amet pretium consectetur adipiscing
                     elit. Lorem consectetur adipiscing elit.
                  </p>
                  <a
                     href="javascript:void(0)"
                     class="
                     inline-block
                     py-2
                     px-7
                     border border-[#4577da]
                     rounded-full
                     text-base text-body-color
                     font-medium
                     hover:border-primary hover:bg-white hover:text-indigo-600
                     transition
                     "
                     >
                  View Details
                  </a>
               </div>
            </div>
         </div>
         <div class="w-full md:w-1/2 xl:w-1/3 px-4">
            <div class="rounded-lg  shadow-md bg-gradient-to-r from-blue-50 to-indigo-100 overflow-hidden mb-10">
               <img
                  src="https://cdn.tailgrids.com/1.0/assets/images/cards/card-01/image-02.jpg"
                  alt="image"
                  class="w-full"
                  />
               <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
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
                        mb-4
                        block
                        hover:text-primary
                        "
                        >
                     The ultimate UX and UI guide to card design
                     </a>
                  </h3>
                  <p class="text-base text-body-color leading-relaxed mb-7">
                     Lorem ipsum dolor sit amet pretium consectetur adipiscing
                     elit. Lorem consectetur adipiscing elit.
                  </p>
                  <a
                     href="javascript:void(0)"
                     class="
                     inline-block
                     py-2
                     px-7
                     border border-[#4577da]
                     rounded-full
                     text-base text-body-color
                     font-medium
                     hover:border-primary hover:bg-white hover:text-indigo-600
                     transition
                     "
                     >
                  View Details
                  </a>
               </div>
            </div>
         </div>
         <div class="w-full md:w-1/2 xl:w-1/3 px-4">
            <div class="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-lg  shadow-md  overflow-hidden mb-10">
               <img
                  src="https://cdn.tailgrids.com/1.0/assets/images/cards/card-01/image-03.jpg"
                  alt="image"
                  class="w-full"
                  />
               <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
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
                        mb-4
                        block
                        hover:text-primary
                        "
                        >
                     Creative Card Component designs graphic elements
                     </a>
                  </h3>
                  <p class="text-base text-body-color leading-relaxed mb-7">
                     Lorem ipsum dolor sit amet pretium consectetur adipiscing
                     elit. Lorem consectetur adipiscing elit.
                  </p>
                  <a
                     href="javascript:void(0)"
                     class="
                     inline-block
                     py-2
                     px-7
                     border border-[#4577da]
                     rounded-full
                     text-base text-body-color
                     font-medium
                     hover:border-primary hover:bg-white hover:text-indigo-600
                     transition
                     "
                     >
                  View Details
                  </a>
               </div>
            </div>
         </div>
      </div>
   
        
        
        
        </>

    )
}

export default Browse