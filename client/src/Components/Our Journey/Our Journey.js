import { useEffect } from "react";
import AOS from 'aos';
import "aos/dist/aos.css";
import founder from '../NavMenu/logo2.jpg'
import founder1 from './founder.jpg'


const OurJourney = () => {
    useEffect(() => {
        AOS.init({
          duration : 1200
        });
      }, []);

    return (<>
        <section class="pt-20 lg:pt-[63px] pb-12 lg:pb-[150px] -mb-72 overflow-hidden">
           <div  class="container relative mx-auto left-4">
              <div data-aos={"fade-up"} data-aos-once='true' class="flex flex-wrap justify-between items-center -mx-4">
                 <div  class="w-full lg:w-6/12 px-4 -mr-3 ml-8 relative">
                    <div class="flex items-center -mx-3 sm:-mx-4">
                       <div class="w-full xl:w-1/2 px-3 sm:px-4">
                          <div class="py-3 sm:py-4">
                             <img
                             src = 'https://media.istockphoto.com/photos/idea-light-bulb-puzzle-on-blue-background-picture-id1355473752?b=1&k=20&m=1355473752&s=612x612&w=0&h=tG9LGXM_PFQahq9xFhD1RQpRsvjG_AQhe6uarb7RTqI='
                                alt=""
                                class="rounded-2xl shadow-md w-full"
                                />
                          </div>
                          <div class="py-3 px-2 bg-white shadow-md rounded-lg sm:py-6 sm:px-3">
                             <img
                                src={founder}
                                alt=""
                                class="rounded-2xl w-full"
                                />
                          </div>
                       </div>
                       <div class="w-full xl:w-[37%] px-3 sm:px-4">
                          <div class="my-4 relative grayscale z-10">
                             <img
                                src={founder1}
                                alt=""
                                class="rounded-2xl shadow-md w-full"
                                />
                             <span class="absolute -right-7 -bottom-7 z-[-1]">
                                <svg
                                   width="134"
                                   height="106"
                                   viewBox="0 0 134 106"
                                   fill="none"
                                   xmlns="http://www.w3.org/2000/svg"
                                   >
                                   <circle
                                      cx="1.66667"
                                      cy="104"
                                      r="1.66667"
                                      transform="rotate(-90 1.66667 104)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="16.3333"
                                      cy="104"
                                      r="1.66667"
                                      transform="rotate(-90 16.3333 104)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="31"
                                      cy="104"
                                      r="1.66667"
                                      transform="rotate(-90 31 104)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="45.6667"
                                      cy="104"
                                      r="1.66667"
                                      transform="rotate(-90 45.6667 104)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="60.3334"
                                      cy="104"
                                      r="1.66667"
                                      transform="rotate(-90 60.3334 104)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="88.6667"
                                      cy="104"
                                      r="1.66667"
                                      transform="rotate(-90 88.6667 104)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="117.667"
                                      cy="104"
                                      r="1.66667"
                                      transform="rotate(-90 117.667 104)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="74.6667"
                                      cy="104"
                                      r="1.66667"
                                      transform="rotate(-90 74.6667 104)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="103"
                                      cy="104"
                                      r="1.66667"
                                      transform="rotate(-90 103 104)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="132"
                                      cy="104"
                                      r="1.66667"
                                      transform="rotate(-90 132 104)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="1.66667"
                                      cy="89.3333"
                                      r="1.66667"
                                      transform="rotate(-90 1.66667 89.3333)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="16.3333"
                                      cy="89.3333"
                                      r="1.66667"
                                      transform="rotate(-90 16.3333 89.3333)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="31"
                                      cy="89.3333"
                                      r="1.66667"
                                      transform="rotate(-90 31 89.3333)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="45.6667"
                                      cy="89.3333"
                                      r="1.66667"
                                      transform="rotate(-90 45.6667 89.3333)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="60.3333"
                                      cy="89.3338"
                                      r="1.66667"
                                      transform="rotate(-90 60.3333 89.3338)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="88.6667"
                                      cy="89.3338"
                                      r="1.66667"
                                      transform="rotate(-90 88.6667 89.3338)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="117.667"
                                      cy="89.3338"
                                      r="1.66667"
                                      transform="rotate(-90 117.667 89.3338)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="74.6667"
                                      cy="89.3338"
                                      r="1.66667"
                                      transform="rotate(-90 74.6667 89.3338)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="103"
                                      cy="89.3338"
                                      r="1.66667"
                                      transform="rotate(-90 103 89.3338)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="132"
                                      cy="89.3338"
                                      r="1.66667"
                                      transform="rotate(-90 132 89.3338)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="1.66667"
                                      cy="74.6673"
                                      r="1.66667"
                                      transform="rotate(-90 1.66667 74.6673)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="1.66667"
                                      cy="31.0003"
                                      r="1.66667"
                                      transform="rotate(-90 1.66667 31.0003)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="16.3333"
                                      cy="74.6668"
                                      r="1.66667"
                                      transform="rotate(-90 16.3333 74.6668)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="16.3333"
                                      cy="31.0003"
                                      r="1.66667"
                                      transform="rotate(-90 16.3333 31.0003)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="31"
                                      cy="74.6668"
                                      r="1.66667"
                                      transform="rotate(-90 31 74.6668)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="31"
                                      cy="31.0003"
                                      r="1.66667"
                                      transform="rotate(-90 31 31.0003)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="45.6667"
                                      cy="74.6668"
                                      r="1.66667"
                                      transform="rotate(-90 45.6667 74.6668)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="45.6667"
                                      cy="31.0003"
                                      r="1.66667"
                                      transform="rotate(-90 45.6667 31.0003)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="60.3333"
                                      cy="74.6668"
                                      r="1.66667"
                                      transform="rotate(-90 60.3333 74.6668)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="60.3333"
                                      cy="30.9998"
                                      r="1.66667"
                                      transform="rotate(-90 60.3333 30.9998)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="88.6667"
                                      cy="74.6668"
                                      r="1.66667"
                                      transform="rotate(-90 88.6667 74.6668)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="88.6667"
                                      cy="30.9998"
                                      r="1.66667"
                                      transform="rotate(-90 88.6667 30.9998)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="117.667"
                                      cy="74.6668"
                                      r="1.66667"
                                      transform="rotate(-90 117.667 74.6668)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="117.667"
                                      cy="30.9998"
                                      r="1.66667"
                                      transform="rotate(-90 117.667 30.9998)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="74.6667"
                                      cy="74.6668"
                                      r="1.66667"
                                      transform="rotate(-90 74.6667 74.6668)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="74.6667"
                                      cy="30.9998"
                                      r="1.66667"
                                      transform="rotate(-90 74.6667 30.9998)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="103"
                                      cy="74.6668"
                                      r="1.66667"
                                      transform="rotate(-90 103 74.6668)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="103"
                                      cy="30.9998"
                                      r="1.66667"
                                      transform="rotate(-90 103 30.9998)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="132"
                                      cy="74.6668"
                                      r="1.66667"
                                      transform="rotate(-90 132 74.6668)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="132"
                                      cy="30.9998"
                                      r="1.66667"
                                      transform="rotate(-90 132 30.9998)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="1.66667"
                                      cy="60.0003"
                                      r="1.66667"
                                      transform="rotate(-90 1.66667 60.0003)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="1.66667"
                                      cy="16.3333"
                                      r="1.66667"
                                      transform="rotate(-90 1.66667 16.3333)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="16.3333"
                                      cy="60.0003"
                                      r="1.66667"
                                      transform="rotate(-90 16.3333 60.0003)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="16.3333"
                                      cy="16.3333"
                                      r="1.66667"
                                      transform="rotate(-90 16.3333 16.3333)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="31"
                                      cy="60.0003"
                                      r="1.66667"
                                      transform="rotate(-90 31 60.0003)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="31"
                                      cy="16.3333"
                                      r="1.66667"
                                      transform="rotate(-90 31 16.3333)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="45.6667"
                                      cy="60.0003"
                                      r="1.66667"
                                      transform="rotate(-90 45.6667 60.0003)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="45.6667"
                                      cy="16.3333"
                                      r="1.66667"
                                      transform="rotate(-90 45.6667 16.3333)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="60.3333"
                                      cy="60.0003"
                                      r="1.66667"
                                      transform="rotate(-90 60.3333 60.0003)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="60.3333"
                                      cy="16.3333"
                                      r="1.66667"
                                      transform="rotate(-90 60.3333 16.3333)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="88.6667"
                                      cy="60.0003"
                                      r="1.66667"
                                      transform="rotate(-90 88.6667 60.0003)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="88.6667"
                                      cy="16.3333"
                                      r="1.66667"
                                      transform="rotate(-90 88.6667 16.3333)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="117.667"
                                      cy="60.0003"
                                      r="1.66667"
                                      transform="rotate(-90 117.667 60.0003)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="117.667"
                                      cy="16.3333"
                                      r="1.66667"
                                      transform="rotate(-90 117.667 16.3333)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="74.6667"
                                      cy="60.0003"
                                      r="1.66667"
                                      transform="rotate(-90 74.6667 60.0003)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="74.6667"
                                      cy="16.3333"
                                      r="1.66667"
                                      transform="rotate(-90 74.6667 16.3333)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="103"
                                      cy="60.0003"
                                      r="1.66667"
                                      transform="rotate(-90 103 60.0003)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="103"
                                      cy="16.3333"
                                      r="1.66667"
                                      transform="rotate(-90 103 16.3333)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="132"
                                      cy="60.0003"
                                      r="1.66667"
                                      transform="rotate(-90 132 60.0003)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="132"
                                      cy="16.3333"
                                      r="1.66667"
                                      transform="rotate(-90 132 16.3333)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="1.66667"
                                      cy="45.3333"
                                      r="1.66667"
                                      transform="rotate(-90 1.66667 45.3333)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="1.66667"
                                      cy="1.66683"
                                      r="1.66667"
                                      transform="rotate(-90 1.66667 1.66683)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="16.3333"
                                      cy="45.3333"
                                      r="1.66667"
                                      transform="rotate(-90 16.3333 45.3333)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="16.3333"
                                      cy="1.66683"
                                      r="1.66667"
                                      transform="rotate(-90 16.3333 1.66683)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="31"
                                      cy="45.3333"
                                      r="1.66667"
                                      transform="rotate(-90 31 45.3333)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="31"
                                      cy="1.66683"
                                      r="1.66667"
                                      transform="rotate(-90 31 1.66683)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="45.6667"
                                      cy="45.3333"
                                      r="1.66667"
                                      transform="rotate(-90 45.6667 45.3333)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="45.6667"
                                      cy="1.66683"
                                      r="1.66667"
                                      transform="rotate(-90 45.6667 1.66683)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="60.3333"
                                      cy="45.3338"
                                      r="1.66667"
                                      transform="rotate(-90 60.3333 45.3338)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="60.3333"
                                      cy="1.66683"
                                      r="1.66667"
                                      transform="rotate(-90 60.3333 1.66683)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="88.6667"
                                      cy="45.3338"
                                      r="1.66667"
                                      transform="rotate(-90 88.6667 45.3338)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="88.6667"
                                      cy="1.66683"
                                      r="1.66667"
                                      transform="rotate(-90 88.6667 1.66683)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="117.667"
                                      cy="45.3338"
                                      r="1.66667"
                                      transform="rotate(-90 117.667 45.3338)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="117.667"
                                      cy="1.66683"
                                      r="1.66667"
                                      transform="rotate(-90 117.667 1.66683)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="74.6667"
                                      cy="45.3338"
                                      r="1.66667"
                                      transform="rotate(-90 74.6667 45.3338)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="74.6667"
                                      cy="1.66683"
                                      r="1.66667"
                                      transform="rotate(-90 74.6667 1.66683)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="103"
                                      cy="45.3338"
                                      r="1.66667"
                                      transform="rotate(-90 103 45.3338)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="103"
                                      cy="1.66683"
                                      r="1.66667"
                                      transform="rotate(-90 103 1.66683)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="132"
                                      cy="45.3338"
                                      r="1.66667"
                                      transform="rotate(-90 132 45.3338)"
                                      fill="#3056D3"
                                      />
                                   <circle
                                      cx="132"
                                      cy="1.66683"
                                      r="1.66667"
                                      transform="rotate(-90 132 1.66683)"
                                      fill="#3056D3"
                                      />
                                </svg>
                             </span>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div class="w-full lg:w-1/2 xl:w-5/12 px-4 right-20 relative">
                    <div class="mt-10 lg:mt-0">
                       <span class="font-semibold text-lg text-primary mb-2 block">
                       How We Started
                       </span>
                       <h2 class="font-bold text-3xl sm:text-4xl text-dark mb-8">
                          Our Journey
                       </h2>
                       <p class="text-base text-body-color mb-8">
                       "Arduino, Robotics, Programming, 3D Modeling and Internet of Things; As a STEM student, I’ve built and pitched numerous STEM projects over the course of my school journey. However, as you might expect of most students, I failed.<br/><br/> I failed to deliver those projects to market or even refine them for commercial applications/research. 

I realized that it was customary for students to be unable to carry their STEM projects forward. Most people boiled this down to a lack of experience.<br/><br/> In contrast, there were just 2 primary factors I observed that held me back: a lack of networking services and an unavailable industry mentorship."<br/><br/><span class = 'font-semibold underline'>- Vismay Suramwar, Founder</span>

                       </p>
                       <p class="text-base text-indigo-700 bottom-3 relative text-body-color mb-12">
                       And so, as a team committed to solving the problem at hand, we built the next big thing in the STEM EdTech Industry.

                       </p>
                       <a
                          href="javascript:void(0)"
                          class="
                          py-3
                          px-8
                          lg:px-6
                          xl:px-8
                          inline-flex
                          items-center
                          justify-center
                          text-center text-white text-base
                          to-blue-600
                          from-blue-500
                          bg-gradient-to-r
                          font-semibold
                          hover:bg-opacity-90
                          rounded-lg
                          bottom-6 relative
                          hover:shadow-md
                          "
                          >
                       Get Started
                       </a>
                    </div>
                 </div>
              </div>
           </div>


        </section>

<section class="pt-20 lg:pt-[100px] pb-12 lg:pb-[88px] -mb-[330px] mt-44 border-dashed border-blue-700 border-t-2  overflow-hidden">
<div class="container relative mx-auto left-4 ">
   <div data-aos={"fade-up"} data-aos-once='true' class="flex flex-wrap justify-between items-center -mx-4">      

<div class="w-full lg:w-1/2 xl:w-5/12 px-4 left-[97px] bottom-7  relative">
         <div class="mt-10 lg:mt-0 text-center -mr-14">
            <span class="font-semibold text-lg text-primary mb-2 block">
            Crowdfunding Campaign
            </span>
            <h2 class="font-bold text-3xl sm:text-4xl text-dark mb-8">
               Support Us
            </h2>
            <p class="text-base text-body-color mb-8">
            <strong>IdeaStack.org</strong> is now live on <strong>Dubai SME’s crowdfunding platform: Dubai Next</strong>, established by HH Sheikh Hamdan Bin Mohammed Bin Rashid Al Maktoum, Crown Prince of Dubai and Chairman of the Executive Council.
            </p>
            <p class="text-base text-body-color mb-8">
            Support us in this crowdfunding campaign, and  <strong>help us revolutionize the traditional project planning process in STEM.</strong> We’re actively expanding our group of STEM experts and academicians, and <strong>we need your help to scale and grow.</strong>
            </p>
            <p class="text-base text-body-color mb-12">
            We reward contributors with acknowledgement of <strong>early support and sponsorship,</strong> additionally offering <strong>other mentorship benefits.</strong> 
            </p>
            <a
               href="javascript:void(0)"
               class="
               py-3
               px-8
               lg:px-6
               xl:px-8
               inline-flex
               items-center
               justify-center
               text-center text-white text-base
               to-blue-600
               from-blue-500
               bg-gradient-to-r
               font-semibold
               hover:bg-opacity-90
               rounded-lg
               hover:shadow-md
               "
               >
            Our Crowdfunding Campaign
            </a>
         </div>
      </div>
<div class  = 'w-full lg:w-1/2 xl:w-5/12 px-4 right-24 bottom-[35px] relative'>
<iframe target = '_top' class = 'relative rounded-sm mx-auto shadow-lg border-blue-600 border-2' width="310" height="580" onClick={() => {
    window.open('https://www.dubainext.ae/embed/card-view/1730', '_blank')
}} src = 'https://www.dubainext.ae/embed/card-view/1730' frameborder="0" scrolling="no"></iframe>
</div>
</div>

</div>

</section>

</>
        )
}
export default OurJourney