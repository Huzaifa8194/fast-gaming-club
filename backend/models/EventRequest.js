const mongoose = require("mongoose");

const eventRequestSchema = new mongoose.Schema({
  requesterName: { type: String, required: true },
  email: { type: String, required: true },
  eventType: { type: String, required: true },
  eventName: { type: String, required: true },
  description: { type: String },
  proposedPrize: { type: String },
  proposedFunding: { type: Number },
  location: { type: String },
  hostName: { type: String, required: true },
  hostDescription: { type: String },
  hostContactEmail: { type: String, required: true },
  hostContactPhone: { type: String }, // Add validation if necessary
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("EventRequest", eventRequestSchema);
