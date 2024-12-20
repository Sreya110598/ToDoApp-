import React, { useState, useEffect } from "react";
import './App.css';

function Form({ tasks, setTasks, addNewTask, editIndex, setEditIndex, editTask, setEditTask }) {
  const [taskText, setTaskText] = useState(editTask ? editTask.text : "");
  const [taskDescription, setTaskDescription] = useState(editTask ? editTask.description : "");

  useEffect(() => {
    if (editTask) {
      setTaskText(editTask.text);
      setTaskDescription(editTask.description);
    }
  }, [editTask]);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedTasks = tasks.map((task, index) => {
        if (index === editIndex) {
          return {
            ...task,
            text: taskText,
            description: taskDescription,
            updatedAt: new Date(),
          };
        }
        return task;
      });
      setTasks(updatedTasks);
      setEditIndex(null);
      setEditTask(null);
    } else {
    
      addNewTask({ text: taskText, description: taskDescription });
    }
    setTaskText("");
    setTaskDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task Name"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        required
        className="task-input"
      />
      <textarea
        placeholder="Task Description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        className="task-description"
      />
      <button type="submit" className="submit-btn">
        {editIndex === null ? "Add Task" : "Update Task"}
      </button>
    </form>
  );
}

export default Form;
