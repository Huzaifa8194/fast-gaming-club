import React from 'react'
import {useState, useEffect} from 'react'
import Spinner from './Spinner'

import { baseURL } from '../../utils/constants'
import axios from 'axios'

import Listingitem from './Listingitem'



    const Listings = ({isHome = false}) => {
      
        const [listings, setListings] = useState([]);
        const [loading, setLoading] = useState(true);    

        useEffect( () => {
            const fetchitems = async () => {
                const apiurl = isHome ? '/api/jobs?_limit=3' : '/api/jobs'
                try
                {
                    const res = await fetch(apiurl)
                    const data = await res.json();
                    setListings(data);
                }
                catch(error)
                {
                        console.log("Error ara hai dummy", error);
                }
                finally
                {
                    setLoading(false)
                }
              //   try
              //  { axios.get(`${baseURL}/get`)
              //   .then((res)=>{
                    
              //       setListings(res.data);
              //       console.log(res.data[0]);
              //   })}
              //   catch (error)
              //   {
              //     console.log("Error hai: ");
              //   }
              //   finally
              //   {
              //     setLoading(false);
              //   }
            } 
            fetchitems();
        })
 
 
    return (
    
       
    <section className= {isHome ? "bg-red-800 px-4 py-10" : "bg-stone-800 px-4 py-10"}>
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          {isHome ? 'Recent Events' : 'Browse Events'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (<Spinner />) : ( 
               <>{ listings.map( (l_list) => (
                  
                  <Listingitem key = {l_list.id} l_list = {l_list} />
                ))}</>
            )}
            
          </div>
        </div>
    </section>
  )
}


export default Listings