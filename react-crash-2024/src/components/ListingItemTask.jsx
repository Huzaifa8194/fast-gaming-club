import React, { useState, useEffect } from "react";
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

const ListingItemTask = ({ task, onTaskUpdate }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedMember, setSelectedMember] = useState(task.assignedMember || "");
  const [selectedPosition, setSelectedPosition] = useState(task.memberPosition || "");

  const handleUpdate = async (status) => {
    try {
      const response = await fetch(`http://localhost:8660/api/task/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTask = await response.json();
      toast.success(`Task "${task.taskName}" has been updated to ${status}.`);
      onTaskUpdate(updatedTask);
    } catch (error) {
      toast.error('Failed to update the task.');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8660/api/task/${task._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      toast.error(`Task "${task.taskName}" has been deleted.`);
      onTaskUpdate(task);
    } catch (error) {
      toast.error('Failed to delete the task.');
    }
  };

  const handleMemberChange = (e) => {
    const member = e.target.value;
    setSelectedMember(member);

    // Optionally, update the task's assigned member via API
    fetch(`http://localhost:8660/api/task/${task._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ assignedMember: member, memberPosition: selectedPosition }),
    })
      .then(response => response.json())
      .then(updatedTask => {
        toast.success(`Member updated to ${member}.`);
        onTaskUpdate(updatedTask);
      })
      .catch(() => toast.error('Failed to update the member.'));
  };

  const handlePositionChange = (e) => {
    const position = e.target.value;
    setSelectedPosition(position);

    // Optionally, update the task's member position via API
    fetch(`http://localhost:8660/api/task/${task._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ assignedMember: selectedMember, memberPosition: position }),
    })
      .then(response => response.json())
      .then(updatedTask => {
        toast.success(`Position updated to ${position}.`);
        onTaskUpdate(updatedTask);
      })
      .catch(() => toast.error('Failed to update the position.'));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-4">
      <div className="flex flex-col lg:flex-row justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-1">{task.taskName}</h3>
          <p className="text-gray-600 mb-2">{task.description}</p>
          <p className="text-gray-600 mb-2">Status: {task.status}</p>
          <p className="text-gray-600 mb-2">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
          <p className="text-gray-600 mb-2">Assigned Member:</p>
          <select
            value={selectedMember}
            onChange={handleMemberChange}
            className="bg-stone-800 text-white border border-stone-600 rounded-lg p-2"
          >
            <option value="">-- Select a Member --</option>
            {members.map(member => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </select>
          <p className="text-gray-600 mb-2">Member Position:</p>
          <select
            value={selectedPosition}
            onChange={handlePositionChange}
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

      <div className="flex justify-end gap-4">
        <button
          onClick={() => handleUpdate('completed')}
          className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Complete
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ListingItemTask;
