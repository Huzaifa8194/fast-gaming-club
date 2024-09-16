import React, { useEffect, useState } from "react";
import axios from "axios";
import ListingItemEventRequest from "./ListingItemEventRequest";

const EventRequestListing = () => {
  const [eventRequests, setEventRequests] = useState([]);

  useEffect(() => {
    const fetchEventRequests = async () => {
      try {
        const response = await axios.get("http://localhost:8660/api/event-requests");
        setEventRequests(response.data);
      } catch (error) {
        console.error("Error fetching event requests:", error);
      }
    };

    fetchEventRequests();
  }, []);

  return (
    <div className="mx-auto py-8 bg-stone-800 mb-0">
      {eventRequests.length > 0 ? (
        eventRequests.map((eventRequest) => (
          <ListingItemEventRequest key={eventRequest._id} eventRequest={eventRequest} />
        ))
      ) : (
        <p className="text-center text-gray-500">No event requests available.</p>
      )}
    </div>
  );
};

export default EventRequestListing;
