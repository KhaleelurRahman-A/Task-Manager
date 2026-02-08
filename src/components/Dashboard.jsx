import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";
import { LuSquareCheckBig } from "react-icons/lu";
import { TbLayoutSidebar } from "react-icons/tb";
import { FaTasks } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { GoTasklist } from "react-icons/go";

function Dashboard() {

  const title = useRef();
  const description = useRef();
  const priority = useRef();
  const [task, settask] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8083/task/get");
      console.log(response);
      settask(response.data);
    }
    catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newTask = {
        title: title.current.value,
        description: description.current.value,
        priority: priority.current.value,
      };
      axios.post("http://localhost:8083/task/create", newTask);
      console.log(newTask);
      alert("Task created successfully!");
      console.log(task);
      navigate("/Task")
    }
    catch (error) {
      console.error("Error creating task:", error);
      alert("Error creating task!");
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-top">
          <i id="task"> <LuSquareCheckBig /></i>
          <span className="app-title">TaskFlow</span><br />
          <div className="sidebar-center">
            <i><MdOutlineDashboard /></i>
            <Link to={"/Dashboard"} className="dash-link"> <span className="dashboard">Dashboard</span></Link><br />
          </div>
          <div className="sidebar-bottom">
            <i> <LuSquareCheckBig /></i>
            <Link to={"/Task"} className="dash-link"> <span className="task">Tasks</span></Link>
          </div>
          <div className="sidebar-line"></div>
        </div>
        <div >
          <button className="logout-button" onClick={handleLogout}>
            <i><LuLogOut /></i>
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-main-content">
        <div className="dashboard-content">
          <i id="sidebar"><TbLayoutSidebar /></i>
          <h1>Dashboard</h1>
          <p className="welcome">Welcome to TaskFlow - Your productivity companion</p>
          <div className="task-stats">
            <div className="stat-item">
              <div>
                <i> <FaTasks /></i>
              </div>
              <div>
                <p className="stat-label">Total Tasks</p>
                <p className="stat-number">{task.length}</p>
              </div></div>
            <div className="stat-item">
              <div>
                <i id="completed"> <CiCircleCheck /></i>
              </div>
              <div>
                <p className="stat-label">Completed</p>
                <p className="stat-number">{task.filter(val => val.completed == true).length}</p>
              </div></div>
            <div className="stat-item">
              <div>
                <i id="pending"> <GoTasklist /></i>
              </div>
              <div>
                <p className="stat-label">Pending</p>
                <p className="stat-number">{task.filter(val => val.completed == false).length}</p>
              </div></div>
          </div>
          <h2>Create New Task</h2>

          <form onSubmit={handleSubmit} className="task-form">
            <div className="form-group">
              <h3>Task Title</h3>
              <input
                type="text"
                placeholder="Enter task title..."
                ref={title}
                required
              />
            </div>

            <div className="form-group">
              <h3>Description (Optional)</h3>
              <textarea
                placeholder="Add more details..."
                ref={description}
              />
            </div>

            <div className="form-group">
              <h3>Priority</h3>
              <select
                ref={priority}
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
            <button type="submit" className="add-task-btn">
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;