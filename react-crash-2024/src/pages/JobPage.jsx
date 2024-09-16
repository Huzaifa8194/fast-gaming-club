import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from '../context/AuthContext';

const JobPage = ({ deleteJob }) => {
  const { id } = useParams();
  const job = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleJoinEvent = () => {
    if (user) {
      addParticipant(user.email);

    } else {
      toast.error("No user is signed in");
    }
  };

  const addParticipant = async () => {
    try {
      const jobRes = await fetch(`/api/jobs/${job.id}`);
      if (!jobRes.ok) {
        throw new Error("Failed to fetch the job");
      }
      const jobData = await jobRes.json();
  
      jobData.participants.push(user.email);
  
      const updateRes = await fetch(`/api/jobs/${job.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });
      if (!updateRes.ok) {
        throw new Error("Failed to update the job with new participant");
      }
  
      toast.success("Participant added successfully");
      navigate("/");
    } catch (error) {
      console.error("Error adding participant:", error);
      toast.error("Failed to add participant");
    }
  };

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link to="/jobs" className="text-red-900 hover:text-indigo-600 flex items-center">
            <FaArrowLeft className="mr-2" /> Back to Event Listing
          </Link>
        </div>
      </section>

      <section className="bg-stone-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{job.type}</div>
                <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className="mr-2 text-orange-700" />
                  <p className="text-orange-700">{job.location}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-red-800 text-lg font-bold mb-6">Description</h3>
                <p className="mb-4">{job.description}</p>
                <h3 className="text-red-800 text-lg font-bold mb-2">Prize</h3>
                <p className="mb-4">{job.salary}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-red-800 text-lg font-bold mb-6">Participants</h3>
                {job.participants.length > 0 ? (
                  <ul>
                    {job.participants.map((participant, index) => (
                      <li key={index} className="mb-2">
                        {participant}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No participants yet</p>
                )}
              </div>
            </main>

            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Host Info</h3>
                <h2 className="text-2xl">{job.company.name}</h2>
                <p className="my-2">{job.company.description}</p>
                <hr className="my-4" />
                <h3 className="text-xl">Contact Email:</h3>
                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.contactEmail}
                </p>
                <h3 className="text-xl">Contact Phone:</h3>
                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.contactPhone}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Event</h3>
                <Link to={`/edit-job/${job.id}`} className="bg-stone-800 hover:bg-red-800 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                  Edit Event
                </Link>
                <button onClick={() => onDeleteclick(job.id)} className="bg-red-800 hover:bg-stone-800 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                  Delete Event
                </button>
                <button onClick={handleJoinEvent} className="bg-stone-800 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                  Join Event
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

const jobLoader = async ({ params }) => {
  const res = await fetch(`/api/jobs/${params.id}`);
  const data = await res.json();
  return data;
};

export { JobPage as default, jobLoader };
