import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TaskAdd = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");
  const [assignee, setAssignee] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/todo/add_todo", {
        title,
        description,
        status,
        due_date: dueDate,
        assignee,
      });
      console.log("Task added successfully:", response.data);
      // Clear form fields after successful submission
      setTitle("");
      setDescription("");
      setStatus("Pending");
      setDueDate("");
      setAssignee("");
      // Navigate back to home page
      navigate("/task");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="pt-20">
      <div className="max-w-lg mx-auto p-6 bg-blue-100 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4 underline text-center">
          Add Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              rows="4"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              required
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Due Date:</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Assignee:</label>
            <input
              type="text"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskAdd;
