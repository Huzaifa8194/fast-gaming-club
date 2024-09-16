const express = require("express");
const router = express.Router();

// Models
const Application = require("../models/Application");
const EventRequest = require("../models/EventRequest"); // Import the EventRequest model
const Task = require("../models/Task");



router.post("/task", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Error adding task", error });
  }
});

// Get all tasks
router.get("/task", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tasks", error });
  }
});

// Get a specific task by ID
router.get("/task/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving task", error });
  }
});

// Update a task by ID
router.put("/task/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedTask) {
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
});

// Delete a task by ID
router.delete("/task/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (deletedTask) {
      res.status(200).json({ message: "Task deleted" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
});







// Route to handle adding a new application
router.post("/applications", async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).send(application);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to get all applications
router.get("/applications", async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).send(applications);
  } catch (error) {
    res.status(500).send(error);
  }
});


router.patch("/applications/:id", async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).send({ message: 'Application not found' });
    }

    res.status(200).send(application);
  } catch (error) {
    res.status(400).send({ message: 'Error updating application status', error });
  }
});


// Route to handle adding a new event request
router.post("/event-requests", async (req, res) => {
  try {
    const eventRequest = new EventRequest(req.body);
    await eventRequest.save();
    res.status(201).send(eventRequest);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to get all event requests
router.get("/event-requests", async (req, res) => {
  try {
    const eventRequests = await EventRequest.find();
    res.status(200).send(eventRequests);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to delete an event request by ID
router.delete("/event-requests/:id", async (req, res) => {
  try {
    const eventRequest = await EventRequest.findByIdAndDelete(req.params.id);
    if (!eventRequest) {
      return res.status(404).send({ error: "Event request not found" });
    }
    res.status(200).send(eventRequest);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Export the router
module.exports = router;
