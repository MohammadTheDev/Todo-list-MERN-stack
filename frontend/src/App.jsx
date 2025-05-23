import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTittle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      const response = await axios.post("http://localhost:5000/api/tasks", { title });
      setTasks([...tasks, response.data]);
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { completed: !completed });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div dir="ltr" className="max-w-lg mx-auto p-5 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">To-Do Lists</h1>

        <form onSubmit={addTask} className="flex gap-3 mb-5">
          <input
            type="text"
            value={title}
            onChange={(e) => setTittle(e.target.value)}
            placeholder="Add new task"
            className="flex-1 p-2 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Add Task
          </button>
        </form>
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li key={task._id} className="flex items-center gap-3 p-3 border-b border-gray-200">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task._id, task.completed)}
                className="h-5 w-5 text-blue-600 rounded"
              />
              <span className={`flex-1 ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                {task.title}
              </span>
              <button
                onClick={() => deleteTask(task._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
