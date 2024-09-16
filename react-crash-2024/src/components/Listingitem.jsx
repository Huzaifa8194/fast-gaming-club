import React from "react"
import { useState} from 'react'
import { FaMapMarker} from 'react-icons/fa'
import {Link} from 'react-router-dom'


const Listingitem = ({l_list}) => {
    const [showfulldescription, setshowfulldescription] = useState(false);

   // console.log("LIST BEING RECIVED: " + l_list.id);


    let description = l_list.description;
    
    if ( !showfulldescription)
        {
            //description = description.substring(0,90) + "...";
        }

  return (
    <div className="bg-white rounded-xl shadow-md relative">
    <div className="p-4">
      <div className="mb-6">
        <div className="text-gray-600 my-2">{l_list.type}</div>
        <h3 className="text-xl font-bold">{l_list.title}</h3>
      </div>

      <div className="mb-5">
            {description}
      </div>

      <button onClick ={()=>setshowfulldescription((prev) => !prev )  } className="text-indigo-400 mb-5 hover: text-indigo-700">
        {showfulldescription ? 'Less' : 'More'}
      </button>

      <h3 className="text-black mb-2">{l_list.salary}</h3>

      <div className="border border-gray-100 mb-5"></div>

      <div className="flex flex-col lg:flex-row justify-between mb-4">
        <div className="text-orange-700 mb-3">
          
          <FaMapMarker className = 'inline text-lg mb-1 mr-1 ' />
          {l_list.location}
        </div>
        <Link

          to= {`/jobs/${l_list.id}`}
          className="h-[36px] bg-black hover:bg-stone-700 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
         Read More
        </Link>
      </div>
    </div>
  </div>
  )
}

export default Listingitem