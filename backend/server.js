const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/applicationsDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB", err));

// Import and use the routes
const applicationsRouter = require("./routes/applications");
app.use("/api", applicationsRouter); // Register the routes

// Start the server
const port = process.env.PORT || 8660;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
