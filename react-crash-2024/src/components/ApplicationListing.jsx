import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import ListingItemApplication from './ListingItemApplication';

const ApplicationListing = ({ isHome = false }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const apiurl = 'http://localhost:8660/api/applications';
      try {
        const res = await fetch(apiurl);
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.log("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleStatusChange = (updatedApplication) => {
    // setListings((prevListings) =>
    //   prevListings.filter((application) => application._id !== updatedApplication._id)
    // );
  };

  return (
    <section className={isHome ? "bg-red-800 px-4 py-10" : "bg-stone-800 px-4 py-10"}>
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          {isHome ? 'Recent Applications' : 'Browse Applications'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <Spinner />
          ) : (
            listings.map((l_list) => (
              <ListingItemApplication
                key={l_list._id}
                l_list={l_list}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ApplicationListing;
