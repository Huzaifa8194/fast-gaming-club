import React, { useState } from "react";
import { toast } from "react-toastify";

const ListingItemApplication = ({ l_list, onStatusChange }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleAccept = async () => {
    try {
      const response = await fetch(`http://localhost:8660/api/applications/${l_list._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'accepted' }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const updatedApplication = await response.json();
      toast.success(`${l_list.name} has been added to the position applied.`);
      onStatusChange(updatedApplication); // Callback to update the state in parent component
    } catch (error) {
      toast.error('Failed to accept the application.');
    }
  };

  const handleDeny = async () => {
    try {
      const response = await fetch(`http://localhost:8660/api/applications/${l_list._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'rejected' }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const updatedApplication = await response.json();
      toast.error(`${l_list.name}'s application has been denied.`);
      onStatusChange(updatedApplication); // Callback to update the state in parent component
    } catch (error) {
      toast.error('Failed to deny the application.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-4">
      <div className="flex flex-col lg:flex-row justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-1">{l_list.name}</h3>
          <p className="text-gray-600 mb-2">{l_list.email}</p>
          <p className="text-gray-600 mb-2">{l_list.phone}</p>
          <p className="text-gray-600 mb-2">Position Applied: {l_list.position}</p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Experience</h4>
        <p className="text-gray-700">{l_list.experience || "No experience provided."}</p>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Motivation</h4>
        <p className="text-gray-700">{l_list.motivation}</p>
        <button
          onClick={() => setShowFullDescription((prev) => !prev)}
          className="text-indigo-400 hover:text-indigo-700 mt-2"
        >
          {showFullDescription ? 'Show Less' : 'Read More'}
        </button>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">LinkedIn</h4>
        <a href={l_list.linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-700">
          {l_list.linkedin || "No LinkedIn profile provided."}
        </a>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Status</h4>
        <p className={`text-lg font-bold ${l_list.status === 'accepted' ? 'text-green-600' : 'text-red-600'}`}>
          {l_list.status}
        </p>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={handleAccept}
          className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Accept
        </button>
        <button
          onClick={handleDeny}
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Deny
        </button>
      </div>
    </div>
  );
};

export default ListingItemApplication;
