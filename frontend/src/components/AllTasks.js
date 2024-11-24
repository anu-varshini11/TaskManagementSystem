import React, { useState, useEffect } from 'react';
import TaskService from '../TaskService';
import EditTaskModal from './EditTaskModal';

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: '',
    status: '',
  });
  const [searchQuery, setSearchQuery] = useState(''); // Track search input

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await TaskService.getAllTasks(searchQuery); // Pass searchQuery to the API
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [searchQuery]); // Re-fetch when searchQuery changes

  const handleSearch = () => {
    setSearchQuery(searchQuery); // Trigger search by updating the searchQuery state
  };

  const handleAdd = async () => {
    try {
      const response = await TaskService.createTask(newTask); // Changed to createTask
      const addedTask = response.data;
      setTasks((prevTasks) => [...prevTasks, addedTask]);
      setNewTask({ title: '', description: '', priority: '', status: '' });
      setShowAddTaskForm(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
  };

  const handleSave = async (updatedTask) => {
    try {
      const response = await TaskService.updateTask(updatedTask._id, updatedTask);
      const updatedTaskData = response.data;
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTaskData._id ? updatedTaskData : task
        )
      );
      setSelectedTask(null);
    } catch (error) {
      console.error('Error saving the updated task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this task?');
    if (isConfirmed) {
      try {
        await TaskService.deleteTask(taskId);
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  return (
    <div>
      <h2>All Tasks</h2>

      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search by Title or Status"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery as user types
        />
        <button onClick={handleSearch}>Search</button> {/* Button to trigger search */}
      </div>

      {/* Add Task Form */}
      {showAddTaskForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
        >
          <input
            name="title"
            placeholder="Task Title"
            value={newTask.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Task Description"
            value={newTask.description}
            onChange={handleInputChange}
            required
          />
          <select
            name="priority"
            value={newTask.priority}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            name="status"
            value={newTask.status}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button type="submit">Add Task</button>
        </form>
      )}

      {/* Task List */}
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <div className="container">
          {tasks.map((task) => (
            <div className="task-card" key={task._id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Priority: {task.priority}</p>
              <p>Status: {task.status}</p>
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {/* Edit Task Modal */}
      {selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AllTasks;
