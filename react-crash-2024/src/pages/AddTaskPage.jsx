import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddTaskPage = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [memberType, setMemberType] = useState("Developer");
  const navigate = useNavigate();

  const addTaskSubmit = async (task) => {
    try {
      console.log(task);
      const response = await axios.post("http://localhost:8660/api/task", task);
      console.log("Task submitted successfully:", response.data);
      toast.success("The task was added successfully");
      navigate("/tasks");
    } catch (error) {
      console.error("Error submitting task:", error);
      toast.error("Failed to add the task");
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const newTask = {
      taskName,
      description,
      deadline,
      memberType,
    };
    addTaskSubmit(newTask);
  };

  return (
    <section className="bg-stone-800">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-stone-300 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm} className="bg-stone-300">
            <h2 className="text-3xl text-center font-semibold mb-6">Add Team Task</h2>

            <div className="mb-4">
              <label htmlFor="taskName" className="block text-gray-700 font-bold mb-2">
                Task Name
              </label>
              <input
                type="text"
                id="taskName"
                name="taskName"
                className="border rounded w-full py-2 px-3 bg-stone-200"
                required
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
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
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="deadline" className="block text-gray-700 font-bold mb-2">
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                className="border rounded w-full py-2 px-3 bg-stone-200"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="memberType" className="block text-gray-700 font-bold mb-2">
                Type of Members Needed
              </label>
              <select
                id="memberType"
                name="memberType"
                className="border rounded w-full py-2 px-3 bg-stone-200"
                required
                value={memberType}
                onChange={(e) => setMemberType(e.target.value)}
              >
                <option value="EC Member">EC Member</option>
                <option value="Normal Member">Normal Member</option>
                <option value="Veteren Member">Veteren Memberr</option>
              </select>
            </div>

            <div>
              <button
                className="bg-stone-800 hover:bg-stone-400 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddTaskPage;
