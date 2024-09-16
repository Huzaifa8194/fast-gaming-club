import React from 'react'


import Card from './Card'
import { Link } from 'react-router-dom'


const HomeCards = () => {
  return (
    
    <section className="mt-0 mb-0 bg-red-800 py-4" >
    <div className="container-xl lg:container m-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
        <Card bg = 'bg-stone-300'>
        <h2 className="text-2xl font-bold ">News</h2>
          <p className="mt-2 mb-4 ">
            Browse latest FGC News
          </p>
          <Link
            to="/jobs"
            className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
          >
            Browse News
          </Link>
        </Card>
        <Card bg = 'bg-stone-300'>
        <h2 className="text-2xl font-bold">Announcements</h2>
          <p className="mt-2 mb-4">
           Look at latest Announcements made
          </p>
          <Link
            to="/add-job"
            className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
          >
            Announcements
          </Link>
        </Card>
      </div>
    </div>
  </section>
   
   
  )
}

export default HomeCards