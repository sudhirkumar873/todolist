import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const TaskEdit = () => {
  const { id } = useParams(); // Fetching the task ID from the URL params
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");
  const [assignee, setAssignee] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/todo/get_todo_by_id/${id}`
        );
        console.log(response.data.data);
        const task = response.data.data[0];
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setDueDate(task.due_date);
        setAssignee(task.assignee);
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/todo/edit_todo/${id}`, {
        title,
        description,
        status,
        due_date: dueDate,
        assignee,
      });
      console.log("Task updated successfully");
      // Redirect back to the home page or any other appropriate page after editing
      navigate("/task");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="pt-20">
      <div className="max-w-lg mx-auto p-6 bg-blue-100 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4 underline text-center">
          Edit Task
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
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskEdit;
