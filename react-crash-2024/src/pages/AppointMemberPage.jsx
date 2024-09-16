import React, { useState } from "react";
import { toast } from "react-toastify";

const members = [
  "huzaifa71",
  "huzaifa8195",
  "testaccount3"
];

const positions = [
  "Team Lead",
  "Team Coordinator",
  "Veteran Member",
  "Non-Member"
];

const AppointMembersPage = () => {
  const [appointments, setAppointments] = useState({});

  const handlePositionChange = (member, position) => {
    setAppointments((prev) => ({
      ...prev,
      [member]: position
    }));
  };

  return (
    <div className="min-h-screen bg-stone-800 text-white p-6">
      <div className="max-w-3xl mx-auto bg-stone-700 rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">Appoint Members to Positions</h1>
        
        {members.map(member => (
          <div key={member} className="mb-4 p-4 bg-stone-600 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-2">{member}</h2>
            <div className="mb-2">
              <label htmlFor={`${member}-position`} className="block text-lg font-medium mb-1">
                Select Position:
              </label>
              <select
                id={`${member}-position`}
                value={appointments[member] || ""}
                onChange={(e) => handlePositionChange(member, e.target.value)}
                className="bg-stone-800 text-white border border-stone-600 rounded-lg p-2"
              >
                <option value="">-- Select a Position --</option>
                {positions.map(position => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

        <div className="text-right mt-6">
          <button
            onClick={() => toast.success("Members update")}
            className="bg-red-800 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Save Appointments
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointMembersPage;
