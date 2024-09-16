const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String }, // Add validation if necessary
  position: { type: String },
  experience: { type: String },
  motivation: { type: String },
  linkedin: { type: String },
  status: { type: String, enum: ["accepted", "rejected", "pending"], default: "pending" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Application", applicationSchema);
