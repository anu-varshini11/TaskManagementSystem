import React from 'react';
import AllTasks from './components/AllTasks';
import AddTask from './components/AddTask';

const App = () => {
  const tasks = [
    { id: 1, name: "Task 1", priority: "High", status: "In Progress" },
    { id: 2, name: "Task 2", priority: "Medium", status: "Completed" },
    { id: 3, name: "Task 3", priority: "Low", status: "Not Started" },
    { id: 4, name: "Task 4", priority: "High", status: "In Progress" },
    { id: 5, name: "Task 5", priority: "Medium", status: "Completed" },
  ];

  return (
    <div>
      <h1>Task Management App</h1>
      <AddTask />
      <AllTasks tasks={tasks} />
    </div>
  );
};

export default App;
