import React, { useState } from 'react';
import TaskService from '../TaskService';

const AddTask = () => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: '',
    status: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    TaskService.createTask(taskData)
      .then(response => {
        alert('Task added successfully!');
      })
      .catch(error => {
        alert('Error adding task');
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Priority:
          <input
            type="text"
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={taskData.status}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
