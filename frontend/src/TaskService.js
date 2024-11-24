// TaskService.js (Updated to pass searchQuery to API)
import axios from 'axios';

const API_URL = 'http://localhost:5000/tasks';

// Updated getAllTasks function to accept searchQuery and pass it to the backend
const getAllTasks = (searchQuery) => {
  return axios.get(`${API_URL}?search=${searchQuery}`);  // Pass search query to the backend
};

const createTask = (taskData) => {
  return axios.post(API_URL, taskData);  // Create a new task
};

const getTaskById = (taskId) => {
  return axios.get(`${API_URL}/${taskId}`);  // Get a task by ID
};

const updateTask = (taskId, taskData) => {
  return axios.put(`${API_URL}/${taskId}`, taskData);  // Update a task
};

const deleteTask = (taskId) => {
  return axios.delete(`${API_URL}/${taskId}`);  // Delete a task
};

export default {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask
};
