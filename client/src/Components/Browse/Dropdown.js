/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

import {MdDeveloperMode, MdWeb, MdOutlineCastForEducation, MdHealthAndSafety} from 'react-icons/md'
import {GiVintageRobot, GiPowerGenerator, GiArtificialIntelligence} from 'react-icons/gi'
import {GrDeliver} from 'react-icons/gr'
import {SiHiveBlockchain} from 'react-icons/si'
import {BsCheckAll} from 'react-icons/bs'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown(props) {

  const [catSelected, setCatSelected] = useState('')

  let categories = [
    {name:'All', icon:<BsCheckAll class = 'inline mr-[3.5px] w-[18px] right-[1px] bottom-[0.85px] relative h-[18px]'/>,id:0},
    {name:'Robotics', icon:<GiVintageRobot class = 'inline mr-[3.5px] w-[18px] right-[1px] bottom-[0.85px] relative h-[18px]'/>,id:1},
    {name:'Web Development',icon:<MdWeb class = 'inline mr-[3.5px] w-[18px] bottom-[0.85px] right-[1px] relative h-[18px]'/>,id:2},
    {name:'Mobile App Development',icon:<MdDeveloperMode class = 'inline mr-[3.5px] w-[18px] right-[1px] bottom-[0.85px] relative h-[18px]'/>,id:3},
    {name:'Logistics (Transport and Storage of Goods)' ,icon:<GrDeliver class = 'inline mr-[4.6px]  left-[1px] ml-[0.5px] w-[17px] bottom-[0.85px] relative h-[17px]'/>,id:4},
    {name:'EdTech (Educational Technology)',icon:<MdOutlineCastForEducation class = 'inline mr-[4px] ml-[0.5px] w-[17px] bottom-[0.85px] relative h-[17px]'/>,id:5},
    {name:'Healthcare',icon:<MdHealthAndSafety class = 'inline mr-[3.5px] w-[18px] bottom-[0.85px] right-[1px] relative h-[18px]'/>,id:6},
    {name:'Energy',icon:<GiPowerGenerator class = 'inline mr-[3.5px] w-[18px] bottom-[0.85px] right-[1px] relative h-[18px]'/>,id:7},
    {name:'AI',icon:<GiArtificialIntelligence class = 'inline mr-[3.5px] w-[18px] bottom-[0.85px] right-[1px] relative h-[18px]'/>,id:8},
    {name:'Blockchain', icon:<SiHiveBlockchain class = 'inline mr-[3.5px] w-[18px] bottom-[0.85px] right-[1px] relative h-[18px]'/>,id:9},
  ]
  return (
    <Menu as="div" className="relative sm:inline-block block md:text-md text-sm z-[100] sm:px-0 px-9  sm:mt-0 -mt-2.5 sm:mb-0 mb-2  sm:ml-5 mx-auto text-left">
      <div class = 'z-[100]'>
        <Menu.Button className="py-2 z-[100]  inline-flex justify-center w-full sm:border-2 rounded-sm sm:border-gray-300 shadow-md px-4 bg-white text-md font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  ">
          {catSelected?catSelected==='All'?'All Categories':'Category: '+ catSelected:'Category'}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 top-0.5 relative" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute pointer-events-auto right-0 mt-2 z-40 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {
              categories.map((cat, i) => {
                return (
                  <Menu.Item>
              {({ active }) => (
                <a
                  onClick = {()=>{
                    props.passCategory(cat.name)
                    setCatSelected(cat.name)
                  }}
                  className={classNames(
                    active ? 'bg-gray-100 cursor-pointer text-gray-900 font-semibold' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                {cat.icon}  {cat.name}
                </a>
              )}
            </Menu.Item>
                )
              })
            }
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

