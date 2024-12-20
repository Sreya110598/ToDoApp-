import React from "react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import moment from "moment"; 

function ToDoList({ tasks, toggleTask, deleteTask, setEditIndex, setEditTask }) {
  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li key={index} className="task-item">
          <div className="task-content">
            
            <span className={`status-badge ${task.status.toLowerCase().replace(" ", "-")}`}>
              {task.status}
            </span>
            <span
              className="task-title"
              style={{ textDecoration: task.completed ? "line-through" : "none" }}
            >
              {task.text}
            </span>
            <p className="task-description">{task.description}</p>
          </div>

          
          <div className="task-meta">
            <small>
              Created: {moment(task.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
            </small>
            {task.updatedAt && (
              <small>
                Updated: {moment(task.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
              </small>
            )}
          </div>

          
          <div className="action-buttons">
            <button
              onClick={() => toggleTask(index)}
              className="action-btn mark-complete"
              title={task.completed ? "Undo Complete" : "Mark as Complete"}
            >
              <FaCheck />
            </button>
            <button
              onClick={() => {
                setEditIndex(index);
                setEditTask(task);
              }}
              className="action-btn edit-btn"
              title="Edit Task"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => deleteTask(index)}
              className="action-btn delete-btn"
              title="Delete Task"
            >
              <FaTrash />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ToDoList;
