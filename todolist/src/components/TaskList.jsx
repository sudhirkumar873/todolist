import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchDueDate, setSearchDueDate] = useState("");
  const [searchAssignee, setSearchAssignee] = useState("");
  const [sortBy, setSortBy] = useState({ field: "", order: "asc" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/todo/get_todo");
        setTasks(response.data.data);
        setAllTasks(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:8000/todo/delete_todo/${_id}`);
      setTasks(tasks.filter((task) => task._id !== _id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleSort = (field) => {
    let newOrder = "asc";
    if (sortBy.field === field && sortBy.order === "asc") {
      newOrder = "desc";
    }
    setSortBy({ field, order: newOrder });
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const field = sortBy.field;
    const order = sortBy.order === "asc" ? 1 : -1;

    if (field === "title") {
      return order * a.title.localeCompare(b.title);
    } else if (field === "description") {
      return order * a.description.localeCompare(b.description);
    } else if (field === "status") {
      return order * a.status.localeCompare(b.status);
    } else if (field === "due_date") {
      return order * new Date(a.due_date) - new Date(b.due_date);
    } else {
      // For other fields or if no field is selected, do not sort
      return 0;
    }
  });

  const filteredTasks = () => {
    const update = allTasks.filter((task) => {
      const nameMatch = task.title
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const statusMatch = task.status
        .toLowerCase()
        .includes(searchStatus.toLowerCase());
      const dueDateMatch = task.due_date
        .toLowerCase()
        .includes(searchDueDate.toLowerCase());
      const assigneeMatch = task.assignee
        .toLowerCase()
        .includes(searchAssignee.toLowerCase());

      return nameMatch && statusMatch && dueDateMatch && assigneeMatch;
    });
    setTasks(update);
  };

  return (
    <div className="w-full pt-10 px-4">
      <h1 className="text-3xl text-center mb-10">Task List</h1>
      <div className="flex flex-col w md:flex-row justify-evenly mb-8 gap-3 md:flex-wrap">
        <div className="flex flex-col w md:flex-row justify-evenly mb-8 gap-3 md:flex-wrap border border-black p-1 hover:bg-blue-400">
          <input
            className="rounded pl-2 w-fit"
            type="text"
            placeholder="Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input
            className="rounded pl-2 w-fit"
            type="text"
            placeholder="Status"
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
          />
          <input
            className="rounded pl-2 w-fit"
            type="text"
            placeholder="Due Date"
            value={searchDueDate}
            onChange={(e) => setSearchDueDate(e.target.value)}
          />
          <input
            className="rounded pl-2 w-fit"
            type="text"
            placeholder="Assignee"
            value={searchAssignee}
            onChange={(e) => setSearchAssignee(e.target.value)}
          />

          <button
            onClick={filteredTasks}
            className="bg-green-500 w-[100px] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 shadow-md shadow-green-800"
          >
            Search
          </button>
        </div>
        <div className=" flex gap-5">
          <Link to="/add">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 shadow-md shadow-green-800">
              Add Task
            </button>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-800 rounded-lg">
          <thead className="bg-blue-400 ">
            <tr>
              <th
                className="border border-gray-800 px-4 capitalize py-2 cursor-pointer"
                onClick={() => handleSort("title")}
              >
                Title&nbsp;&nbsp;&nbsp;
                {sortBy.field === "title" && (
                  <span>{sortBy.order === "asc" ? "^" : "v"}</span>
                )}
              </th>
              <th
                className="border border-gray-800 px-4 capitalize py-2 cursor-pointer"
                onClick={() => handleSort("description")}
              >
                Description&nbsp;&nbsp;&nbsp;
                {sortBy.field === "description" && (
                  <span>{sortBy.order === "asc" ? "^" : "v"}</span>
                )}
              </th>
              <th
                className="border border-gray-800 px-4 capitalize py-2 cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status&nbsp;&nbsp;&nbsp;
                {sortBy.field === "status" && (
                  <span>{sortBy.order === "asc" ? "^" : "v"}</span>
                )}
              </th>
              <th
                className="border border-gray-800 px-4 capitalize py-2 cursor-pointer"
                onClick={() => handleSort("due_date")}
              >
                Due Date&nbsp;&nbsp;&nbsp;
                {sortBy.field === "due_date" && (
                  <span>{sortBy.order === "asc" ? "^" : "v"}</span>
                )}
              </th>
              <th className="border border-gray-800 px-4 capitalize py-2">
                Assignee
              </th>
              <th className="border border-gray-800 px-4 capitalize py-2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map((task) => (
              <tr key={task._id}>
                <td className="border border-gray-800 px-4 capitalize py-2">
                  {task.title}
                </td>
                <td className="border border-gray-800 px-4 capitalize py-2">
                  {task.description}
                </td>
                <td className="border border-gray-800 px-4 capitalize py-2">
                  {task.status}
                </td>
                <td className="border border-gray-800 px-4 capitalize py-2">
                  {task.due_date}
                </td>
                <td className="border border-gray-800 px-4 capitalize py-2">
                  {task.assignee}
                </td>
                <td className="border border-gray-400 px-4 capitalize py-2 flex gap-2 flex-col md:flex-row">
                  <Link to={`/edit/${task._id}`}>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-800">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
