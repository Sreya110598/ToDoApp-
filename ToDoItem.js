import React from "react";
import { FaTrashAlt } from "react-icons/fa";  
import { FaEdit } from "react-icons/fa";     

function ToDoItem({ task, toggleTask, deleteTask, updateTask }) {
  return (
    <li>
      <div className="task-header">
        <div className="task-title" onClick={toggleTask}>
          {task.text}
        </div>
        <span className="status">
          {task.status === "completed" ? "Completed" : "In Progress"}
        </span>
      </div>
      <div className="task-body">
        <p>{task.description}</p>
        <span className="date-time">Created: {new Date(task.createdAt).toLocaleString()}</span>
        <span className="date-time">Updated: {task.updatedAt ? new Date(task.updatedAt).toLocaleString() : "N/A"}</span>
        <span className="date-time">Completed: {task.completedAt ? new Date(task.completedAt).toLocaleString() : "N/A"}</span>
      </div>
      <div className="task-actions">
        <button className="update-btn" onClick={() => updateTask(task)}>
          <FaEdit /> Update
        </button>
        <button className="delete-btn" onClick={() => deleteTask(task.id)}>
          <FaTrashAlt /> Delete
        </button>
      </div>
    </li>
  );
}

export default ToDoItem;
