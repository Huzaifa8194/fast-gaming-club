const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  memberType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending', // Default value for the status field
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
