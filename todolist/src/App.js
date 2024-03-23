import logo from "./logo.svg";
import "./App.css";
import TaskList from "./components/TaskList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Imported BrowserRouter as Router
import TaskAdd from "./components/TaskAdd";
import EditTask from "./components/EditTask";
import LoginPage from "./components/login";

function App() {
  return (
    <div className="bg-gradient-to-tr from-blue-100 to-blue-400 h-screen w-screen min--[100vh]">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />{" "}
          <Route path="/task" element={<TaskList />} />{" "}
          {/* Define path for TaskList component */}
          <Route path="/add" element={<TaskAdd />} />{" "}
          <Route path="/edit/:id" element={<EditTask />} />{" "}
          {/* Define path for TaskAdd component */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
