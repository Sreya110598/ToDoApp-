import React, { useState, useEffect } from "react";
import ToDoList from "./ToDoList";
import Form from "./ToDoForm";
import './App.css'; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState(null);

  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await response.json();
        
        const formattedData = data.map((task) => ({
          text: task.title,
          description: "",  
          createdAt: new Date(),
          updatedAt: null,
          completed: task.completed,
          status: task.completed ? "Completed" : "To Do",  
        }));
        setTasks(formattedData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  
  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    newTasks[index].status = newTasks[index].completed ? "Completed" : "To Do"; 
    newTasks[index].updatedAt = new Date();
    setTasks(newTasks);
  };

  
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };


  const addNewTask = async (newTask) => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTask.text,
          completed: false,
        }),
      });

      const createdTask = await response.json();
      const task = {
        text: createdTask.title,
        description: newTask.description || "",
        createdAt: new Date(),
        updatedAt: null,
        completed: createdTask.completed,
        status: createdTask.completed ? "Completed" : "To Do",  
      };
      setTasks([...tasks, task]);
    } catch (error) {
      console.error("Error adding new task:", error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-heading">Task Manager</h1>
      
      <div className="task-form-container">
        <Form
          tasks={tasks}
          setTasks={setTasks}
          addNewTask={addNewTask}  
          editIndex={editIndex}
          setEditIndex={setEditIndex}
          editTask={editTask}
          setEditTask={setEditTask}
        />
      </div>

      <div className="task-list-container">
        <ToDoList
          tasks={tasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          setEditIndex={setEditIndex}
          setEditTask={setEditTask}
        />
      </div>
    </div>
  );
}

export default App;
