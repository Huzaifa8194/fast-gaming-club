import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ApplicationDetailPage = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await fetch(`http://localhost:8660/api/applications/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch the application');
        }
        const data = await res.json();
        setApplication(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!application) {
    return <p>Application not found</p>;
  }

  return (
    <div className="min-h-screen bg-stone-800 text-white p-6">
      <div className="max-w-3xl mx-auto bg-stone-700 rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">Application Details</h1>
        
        <div className="flex flex-col mb-4">
          <h3 className="text-2xl font-bold mb-1">{application.name}</h3>
          <p className="text-gray-300 mb-2">{application.email}</p>
          <p className="text-gray-300 mb-2">{application.phone || "Phone not provided"}</p>
          <p className="text-gray-300 mb-2">Position: {application.position || "Not specified"}</p>
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Experience</h4>
          <p className="text-gray-300 bg-stone-600 p-3 rounded-lg">{application.experience || "No experience provided."}</p>
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Motivation</h4>
          <p className="text-gray-300 bg-stone-600 p-3 rounded-lg">
            {showFullDescription ? application.motivation : (application.motivation ? application.motivation.substring(0, 100) : "No motivation provided.")}
            {application.motivation && application.motivation.length > 100 && (
              <button
                onClick={() => setShowFullDescription(prev => !prev)}
                className="text-indigo-400 hover:text-indigo-700 mt-2"
              >
                {showFullDescription ? 'Show Less' : 'Read More'}
              </button>
            )}
          </p>
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">LinkedIn</h4>
          <a href={application.linkedin} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-600">
            {application.linkedin || "No LinkedIn profile provided."}
          </a>
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Status</h4>
          <p className={`text-lg font-bold ${application.status === 'accepted' ? 'text-green-500' : 'text-red-500'}`}>
            {application.status}
          </p>
        </div>

        <div className="text-right">
          <Link
            to="/applications"
            className="bg-red-800 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Back to Applications
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailPage;
