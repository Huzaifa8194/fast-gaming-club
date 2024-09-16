import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext"; // Update with your path

const EventRequestPage = ({ addEventRequestSubmit }) => {
  const [requesterName, setRequesterName] = useState("");
  const [email, setEmail] = useState("");
  const [eventType, setEventType] = useState("On-Campus");
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [proposedPrize, setProposedPrize] = useState("");
  const [proposedFunding, setProposedFunding] = useState("");
  const [location, setLocation] = useState("");
  const [hostName, setHostName] = useState("");
  const [hostDescription, setHostDescription] = useState("");
  const [hostContactEmail, setHostContactEmail] = useState("");
  const [hostContactPhone, setHostContactPhone] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to view this page");
      navigate("/login"); // Redirect to login page if not logged in
    }
  }, [user, navigate]);

  const submitForm = (e) => {
    e.preventDefault();
    const newEventRequest = {
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
    };
    console.log(newEventRequest);
    addEventRequestSubmit(newEventRequest);
    toast.success("Event request submitted successfully");
    navigate("/");
  };

  return (
    user && (
      <section className="bg-stone-800">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-stone-300 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={submitForm} className="bg-stone-300">
              <h2 className="text-3xl text-center font-semibold mb-6">Create Event Request</h2>

              <div className="mb-4">
                <label htmlFor="requesterName" className="block text-gray-700 font-bold mb-2">
                  Requester Name
                </label>
                <input
                  type="text"
                  id="requesterName"
                  name="requesterName"
                  className="border rounded w-full py-2 px-3 bg-stone-200"
                  placeholder="Your Name"
                  required
                  value={requesterName}
                  onChange={(e) => setRequesterName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="border rounded w-full py-2 px-3 bg-stone-200"
                  placeholder="Your Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="eventType" className="block text-gray-700 font-bold mb-2">
                  Event Type
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  className="border rounded w-full py-2 px-3 bg-stone-200"
                  required
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                >
                  <option value="On-Campus">On-Campus</option>
                  <option value="Off-Campus">Off-Campus</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="eventName" className="block text-gray-700 font-bold mb-2">
                  Event Name
                </label>
                <input
                  type="text"
                  id="eventName"
                  name="eventName"
                  className="border rounded w-full py-2 px-3 bg-stone-200"
                  placeholder="Event Name"
                  required
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="border rounded w-full py-2 px-3 bg-stone-200"
                  rows="4"
                  placeholder="Event Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-4">
                <label htmlFor="proposedPrize" className="block text-gray-700 font-bold mb-2">
                  Proposed Prize
                </label>
                <input
                  type="text"
                  id="proposedPrize"
                  name="proposedPrize"
                  className="border rounded w-full py-2 px-3 bg-stone-200"
                  value={proposedPrize}
                  onChange={(e) => setProposedPrize(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="proposedFunding" className="block text-gray-700 font-bold mb-2">
                  Proposed Funding
                </label>
                <input
                  type="number"
                  id="proposedFunding"
                  name="proposedFunding"
                  className="border rounded w-full py-2 px-3 bg-stone-200"
                  value={proposedFunding}
                  onChange={(e) => setProposedFunding(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="border rounded w-full py-2 px-3 bg-stone-200"
                  placeholder="Event Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <h3 className="text-2xl mb-5">Host Info</h3>

              <div className="mb-4">
                <label htmlFor="hostName" className="block text-gray-700 font-bold mb-2">
                  Host Name
                </label>
                <input
                  type="text"
                  id="hostName"
                  name="hostName"
                  className="border rounded w-full py-2 px-3 bg-stone-200"
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="hostDescription" className="block text-gray-700 font-bold mb-2">
                  Host Description
                </label>
                <textarea
                  id="hostDescription"
                  name="hostDescription"
                  className="border rounded w-full py-2 px-3 bg-stone-200"
                  rows="4"
                  placeholder="Host Description"
                  value={hostDescription}
                  onChange={(e) => setHostDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-4">
                <label htmlFor="hostContactEmail" className="block text-gray-700 font-bold mb-2">
                  Host Contact Email
                </label>
                <input
                  type="email"
                  id="hostContactEmail"
                  name="hostContactEmail"
                  className="border rounded w-full py-2 px-3 bg-stone-200"
                  required
                  value={hostContactEmail}
                  onChange={(e) => setHostContactEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="hostContactPhone" className="block text-gray-700 font-bold mb-2">
                  Host Contact Phone
                </label>
                <input
                  type="tel"
                  id="hostContactPhone"
                  name="hostContactPhone"
                  className="border rounded w-full py-2 px-3 bg-stone-200"
                  value={hostContactPhone}
                  onChange={(e) => setHostContactPhone(e.target.value)}
                />
              </div>

              <div>
                <button
                  className="bg-stone-800 hover:bg-stone-400 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add Event Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  );
};

export default EventRequestPage;
