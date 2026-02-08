
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Task.css";
import { TbLayoutSidebar } from "react-icons/tb";
import { LuSquareCheckBig } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";

function Task() {

  const [tasks, setTasks] = useState([]);
  const [viewTasks, setViewTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8083/task/get");
      setTasks(response.data);
      // setViewTasks(response.data); 
    }
    catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    setViewTasks(tasks);
  }, [tasks]);


  const showAll = () => {
    setViewTasks(tasks);
  };

  const showPending = () => {
    const pending = tasks.filter(task => task.completed === false);
    setViewTasks(pending);
  };

  const showCompleted = () => {
    const completed = tasks.filter(task => task.completed === true);
    setViewTasks(completed);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
     setSearchTerm(value);
     
    const result = tasks.filter(task =>
      task.title.toLowerCase().includes(value) ||
      task.description.toLowerCase().includes(value) ||
      task.priority.toLowerCase().includes(value)
    );

    setViewTasks(result);
  };



  const handleToggle = async (id) => {
    try {
      const selectedTask = tasks.find(t => t.id === id);
      const updatedTask = { completed: !selectedTask.completed };
      await axios.patch(`http://localhost:8083/task/change/${id}`, updatedTask);
      console.log(updatedTask);
      console.log(tasks);
      await fetchTasks();
    }
    catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this task?")) {
      try {
        await axios.delete(`http://localhost:8083/task/del/${id}`);
        await fetchTasks();
      }
      catch (error) {
        console.log(error);
      }
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="task-container">
      <div className="sidebar">
        <div className="sidebar-top">
          <i id="task"> <LuSquareCheckBig /></i>
          <span className="app-title">TaskFlow</span><br />
          <div className="sidebar-center">
            <i><MdOutlineDashboard /></i>
            <Link to={"/Dashboard"} className="dash-link"> <span className="dashboard">Dashboard</span></Link> <br />
          </div>
          <div className="sidebar-bottom">
            <i> <LuSquareCheckBig /></i>
            <Link to={"/Task"} className="dash-link"> <span className="task">Tasks</span></Link>
          </div>
          <div className="sidebar-line"></div>
        </div>
        <div>
          <button className="logout-button" onClick={handleLogout}>
            <i><LuLogOut /></i>
            Logout
          </button>
        </div>
      </div>

      <div className="tasks-content">
        <i className="tasks-sidebar"><TbLayoutSidebar /></i>

        <h1>Tasks</h1>
        <p>Manage and track all your tasks</p>

        <div className="search-container">
          <input
            type="text"
            placeholder=" Search tasks..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="filter">
          <button className="filter-tab" onClick={showAll}>All
            <span className="count">{tasks.length}</span>
          </button>
          <button className="filter-tab" onClick={showPending}>Pending
            <span className="count">{tasks.filter(val => val.completed == false).length}</span>
          </button>
          <button className="filter-tab" onClick={showCompleted}>Completed
            <span className="count">{tasks.filter(val => val.completed == true).length}</span>
          </button>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Title</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {viewTasks.map((value, index) => (
                <tr key={index} className={value.completed ? "completed" : ""}>
                  <td className="table-row"><input type="checkbox" name="" id=""
                    checked={value.completed}
                    onChange={() => handleToggle(value.id)}
                  />
                  </td>
                  <td className="table-row">{value.title}</td>
                  <td className="table-row">{value.description}</td>
                  <td><span className={value.priority}>{value.priority}</span></td>
                  <td className="table-date">{value.created_date}</td>
                  <td >
                    <Link to={`/Edit/${value.id}`}>
                      <button className="edit-button">
                        <i><FiEdit2 /></i>
                      </button>
                    </Link>
                    <button className="delete-button" onClick={() => {
                      handleDelete(value.id)
                    }}>
                      <i> <RiDeleteBinLine /></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Task;
