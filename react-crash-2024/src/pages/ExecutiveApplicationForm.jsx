import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import { toast } from "react-toastify";

const ExecutiveApplicationForm = ({ addApplication }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState("");
  const [motivation, setMotivation] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    const newApplication = {
      name,
      email,
      phone,
      position,
      experience,
      motivation,
      linkedin,
    };
    addApplication(newApplication);
    navigate("/");
  };

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to view this page");
      navigate("/login"); // Redirect to login page if not logged in
    }
  }, [user, navigate]);

  return (
    <section className="bg-stone-800">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-stone-300 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm} className="bg-stone-300">
            <h2 className="text-3xl text-center font-semibold mb-6">
              Apply for Executive Member Position
            </h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="border rounded w-full py-2 px-3 mb-2 bg-stone-200"
                placeholder="Your Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                className="border rounded w-full py-2 px-3 mb-2 bg-stone-200"
                placeholder="Your Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="border rounded w-full py-2 px-3 mb-2 bg-stone-200"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="position" className="block text-gray-700 font-bold mb-2">
                Position
              </label>
              <input
                type="text"
                id="position"
                name="position"
                className="border rounded w-full py-2 px-3 mb-2 bg-stone-200"
                placeholder="Position you're applying for"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="experience" className="block text-gray-700 font-bold mb-2">
                Experience
              </label>
              <textarea
                id="experience"
                name="experience"
                className="border rounded w-full py-2 px-3 bg-stone-200"
                rows="4"
                placeholder="Describe your relevant experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="motivation" className="block text-gray-700 font-bold mb-2">
                Motivation
              </label>
              <textarea
                id="motivation"
                name="motivation"
                className="border rounded w-full py-2 px-3 bg-stone-200"
                rows="4"
                placeholder="Why do you want to join as an executive member?"
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="linkedin" className="block text-gray-700 font-bold mb-2">
                LinkedIn Profile
              </label>
              <input
                type="text"
                id="linkedin"
                name="linkedin"
                className="border rounded w-full py-2 px-3 mb-2 bg-stone-200"
                placeholder="Your LinkedIn Profile URL"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>
            <div>
              <button
                className="bg-stone-800 hover:bg-stone-400 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ExecutiveApplicationForm;
