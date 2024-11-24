// taskRoutes.js (Updated to support search functionality)
const express = require('express');
const Task = require('../models/taskModel'); // Import the Task model
const router = express.Router();

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;

    // Create and save a new task
    const newTask = new Task({ title, description, priority, status });
    await newTask.save();  // Save the task to the database

    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    res.status(400).json({ message: 'Error creating task', error: error.message });
  }
});

// Get all tasks with optional search by title or status
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;  // Get search query parameter

    let tasks;
    if (search) {
      // If there is a search query, find tasks by title or status
      tasks = await Task.find({
        $or: [
          { title: { $regex: search, $options: 'i' } },  // Search by title (case-insensitive)
          { status: { $regex: search, $options: 'i' } },  // Search by status (case-insensitive)
        ]
      });
    } else {
      // If no search query, return all tasks
      tasks = await Task.find();
    }

    res.status(200).json(tasks);  // Send tasks as JSON response
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving tasks', error: error.message });
  }
});

// Get a single task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);  // Find a task by its ID
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);  // Send the task as JSON response
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving task', error: error.message });
  }
});

// Update an existing task
router.put('/:id', async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,   // Find task by ID
      { title, description, priority, status },  // New task data
      { new: true }     // Return the updated task
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    res.status(400).json({ message: 'Error updating task', error: error.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id); // Delete task by ID

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting task', error: error.message });
  }
});

// Export the routes
module.exports = router;
