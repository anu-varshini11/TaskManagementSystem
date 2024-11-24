const mongoose = require('mongoose');

// Define the task schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },          // Task title (string)
  description: { type: String, required: true },    // Task description (string)
  priority: { type: String, required: true },       // Task priority (string)
  status: { type: String, required: true }          // Task status (string)
});

// Create the Task model based on the schema
const Task = mongoose.model('Task', taskSchema);

// Export the Task model
module.exports = Task;
