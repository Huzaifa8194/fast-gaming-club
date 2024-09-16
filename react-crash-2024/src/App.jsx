import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { toast } from "react-toastify";

import ExecutiveApplicationForm from "./pages/ExecutiveApplicationForm";
import axios from "axios";
import ViewEventRequests from "./pages/ViewEventRequests";

import AddTaskPage from "./pages/AddTaskPage";


// Import your components and pages
import HomePage from "./pages/HomePage";
import Mainlayout from "./layouts/Mainlayout";
import Jobspagge from "./pages/Jobspagge";
import NotFoundpage from "./pages/NotFoundpage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Applicationspage from "./pages/Applicationspage";
import EventRequestPage from "./pages/EventRequestPage";
import Gallery from "./pages/Gallery";
import BlogPage from "./pages/BlogPage";
import TasksPage from "./pages/TasksPage";
import AppointMembersPage from "./pages/AppointMemberPage";

const addJob = async (newJob) => {
  const res = fetch("/api/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newJob),
  });
  return;
};

const addApplication = async (application) => {
  try {
    console.log(application);
    const response = await axios.post("http://localhost:8660/api/applications", application);
    console.log("Application submitted successfully:", response.data);
  } catch (error) {
    console.error("Error submitting application:", error);
  }
};


const addEventRequest = async (eventRequest) => {
  try {
    console.log(eventRequest);
    const response = await axios.post("http://localhost:8660/api/event-requests", eventRequest);
    console.log("Event request submitted successfully:", response.data);
  } catch (error) {
    console.error("Error submitting event request:", error);
  }
};




const deletetheJob = async (thejob) => {
  const res = fetch(`/api/jobs/${thejob}`, { method: "DELETE" });
};

const updatedJob = async (thejob) => {
  const res = await fetch(`/api/jobs/${thejob.id}`, 
    {
      method: 'PUT',
      header: 
      {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(thejob)
    }
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Mainlayout />}>
      <Route index element={<HomePage />} />
      <Route path="/jobs" element={<Jobspagge />} />
      <Route path="/applicationlist" element={<Applicationspage />} />
      <Route path="/eventrequestlist" element={<ViewEventRequests />} />
      <Route path="/viewtask" element={<TasksPage />} />

      <Route path="/appointmember" element={<AppointMembersPage />} />

      <Route path="/addtask" element={<AddTaskPage />} />

      <Route
        path="/jobs/:id"
        element={<JobPage deleteJob={deletetheJob} />}
        loader={jobLoader}
      />
       <Route path="/application" element={<ExecutiveApplicationForm addApplication={addApplication} />} />
       <Route path="/eventrequest" element={<EventRequestPage addEventRequestSubmit={addEventRequest} />} />
      <Route
        path="/edit-job/:id"
        element={<EditJobPage updateJobSubmit={updatedJob}/>}
        loader={jobLoader}
      />

      <Route path="/blog" element={<BlogPage />} />
      <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<NotFoundpage />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
