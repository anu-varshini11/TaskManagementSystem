const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require('dotenv').config();  // Add this line at the top of the file

// Import the task routes
const taskRoutes = require('./routes/taskRoutes');

// Initialize the Express app
const app = express();

// Middleware setup
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // Allow this origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specific methods
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
  next();
});
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // To parse JSON request bodies

// MongoDB connection string for local MongoDB
const mongoURI = 'mongodb://localhost:27017/task_management';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.log('MongoDB connection error: ', error));

// Setup routes
app.use('/tasks', taskRoutes); // Use the task routes for all `/tasks` endpoints

// Test route to check if the server is running
app.get("/", (req, res) => res.send("Server is running..."));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
