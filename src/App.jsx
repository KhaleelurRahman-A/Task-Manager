
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Task from "./components/Task";
import TaskEdit from "./components/TaskEdit";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
// import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Task" element={<Task />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Edit/:id" element={<TaskEdit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;