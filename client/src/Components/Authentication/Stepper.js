const Stepper = () => {



    return (
        <div class="p-0 mr-80 mt-5">
  <div class="mx-0 p-0"> 
    <div class="flex items-center">
      <div class="flex items-center text-purple-500 relative">
        <div
          class="
            rounded-full
            transition
            duration-500
            ease-in-out
            h-12
            w-12
            py-3
            border-2 border-purple-500
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-bookmark"
          >
            <path
              d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
            ></path>
          </svg>
        </div>
        <div
          class="
            absolute
            top-0
            -ml-10
            text-center
            mt-16
            w-32
            text-xs
            font-medium
            uppercase
            text-purple-500
          "
        >
          Personal 
        </div>
      </div>
      <div
        class="
          flex-auto
          border-t-2
          transition
          duration-500
          ease-in-out
          border-purple-500
            w-10
          -mr-11
        "
      ></div>
      <div class="flex items-center text-white relative">
        <div
          class="
    
            rounded-full
            transition
            duration-500
            ease-in-out
            h-12
            w-12
            py-3
            border-2
            bg-purple-500
            border-purple-500
            ml-9
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-user-plus"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
        </div>
        <div
          class="
            absolute
            top-0
            -ml-1
            text-center
            mt-16
            w-32
            text-xs
            font-medium
            uppercase
            text-purple-500
          "
        >
          Account
        </div>
      </div>
      <div
        class="
          flex-auto
          border-t-2
          transition
          duration-500
          ease-in-out
          border-gray-300
        "
      ></div>
      <div class="flex items-center text-gray-500 relative">
    
         
        
      </div>
      <div
        class="
          flex-auto
          border-t-2
          transition
          duration-500
          ease-in-out
          border-gray-300
        "
      ></div>
      <div class="flex items-center text-gray-500 relative">
        <div
          class="
            rounded-full
            transition
            duration-500
            ease-in-out
            h-12
            w-12
            py-3
            border-2 border-gray-300
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-database"
          >
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          </svg>
        </div>
        <div
          class="
            absolute
            top-0
            -ml-10
            text-center
            mt-16
            w-32
            text-xs
            font-medium
            uppercase
            text-gray-500
          "
        >
          Confirm
        </div>
      </div>
    </div>
  </div>
  <div class="mt-8 p-4">
    <div class="flex p-2 mt-4">
      <button
        class="
          bg-gray-200
          text-gray-800
          active:bg-purple-600
          font-bold
          uppercase
          text-sm
          px-6
          py-3
          rounded
          shadow
          hover:shadow-lg
          outline-none
          focus:outline-none
          mr-1
          mb-1
          ease-linear
          transition-all
          duration-150
        "
        type="button"
      >
        Previous
      </button>
      <div class="flex-auto flex flex-row-reverse">
        <button
          class="
            mx-3
            bg-purple-500
            text-white
            active:bg-purple-600
            font-bold
            uppercase
            text-sm
            px-6
            py-3
            rounded
            shadow
            hover:shadow-lg
            outline-none
            focus:outline-none
            mr-1
            mb-1
            ease-linear
            transition-all
            duration-150
          "
          type="button"
        >
          Next
        </button>
        
      </div>
    </div>
  </div>
</div>
    )
}

export default Stepper