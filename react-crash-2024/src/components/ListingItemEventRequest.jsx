import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ListingItemEventRequest = ({ eventRequest }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();
  const {
    requesterName,
    email,
    eventType,
    eventName,
    description,
    proposedPrize,
    proposedFunding,
    location,
    hostName,
    hostDescription,
    hostContactEmail,
    hostContactPhone,
    date,
  } = eventRequest;

  const addeventrequest = async () => {
    try {


      const title = eventName;
      const type = eventType;
      let salary = proposedPrize;
      const contactEmail = hostContactEmail;
      const contactPhone = hostContactPhone;
      const companyName = hostName
      const companyDescription = hostDescription
      const participants = []
      const company = {
        name: hostName,
        description: hostDescription,
        contactEmail, 
        contactPhone
      }
      const newJob = {
        title,
        type,
        location,
        description,
        salary,
        company: {
          name: companyName,
          description: companyDescription,
          contactEmail,
          contactPhone,
        },
        participants,
      };
     

      console.log(newJob);



      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( newJob ),
      });

      deleteeventrequest();
      navigate("/");
      toast.success("Event approved successfully.")
    } catch (error) {
      console.error("Error approving event request:", error);
    }
  };



  const deleteeventrequest = async () => {
    try {
      const response = await axios.delete(`http://localhost:8660/api/event-requests/${eventRequest._id}`);
      console.log("Event request deleted successfully:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error deleting event request:", error);
    }
  };

  const denyeventrequest = async () => {
    try {
      const response = await axios.delete(`http://localhost:8660/api/event-requests/${eventRequest._id}`);
      console.log("Event request deleted successfully:", response.data);
      navigate("/");
      toast.success("Event Deleted Successfully.");
    } catch (error) {
      console.error("Error deleting event request:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-4">
      <div className="flex flex-col lg:flex-row justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-1">{eventName}</h3>
          <p className="text-gray-600 mb-2">Requested by: {requesterName}</p>
          <p className="text-gray-600 mb-2">Email: {email}</p>
          <p className="text-gray-600 mb-2">Event Type: {eventType}</p>
          <p className="text-gray-600 mb-2">Location: {location}</p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Description</h4>
        <p className="text-gray-700">
          {showFullDescription ? description : `${description.slice(0, 100)}...`}
        </p>
        {description.length > 100 && (
          <button 
            onClick={() => setShowFullDescription(prev => !prev)}
            className="text-indigo-400 hover:text-indigo-700 mt-2"
          >
            {showFullDescription ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Proposed Prize</h4>
        <p className="text-gray-700">{proposedPrize || "No prize specified."}</p>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Proposed Funding</h4>
        <p className="text-gray-700">${proposedFunding || 0}</p>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Host Information</h4>
        <p className="text-gray-700">Host: {hostName}</p>
        <p className="text-gray-700">Description: {hostDescription || "No description provided."}</p>
        <p className="text-gray-700">Contact Email: {hostContactEmail}</p>
        <p className="text-gray-700">Contact Phone: {hostContactPhone || "No phone provided."}</p>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={addeventrequest}
          className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Approve
        </button>
        <button
          onClick={denyeventrequest}
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Deny
        </button>
      </div>

      <div className="text-right">
       
      </div>
    </div>
  );
};

export default ListingItemEventRequest;
