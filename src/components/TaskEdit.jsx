import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./TaskEdit.css";

function TaskEdit() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [edit, setEdit] = useState({});

  const fetchTask = async () => {
    try {
      const response = await axios.get(`http://localhost:8083/task/get/${id}`);
      setEdit(response.data);
    }
    catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdit((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8083/task/update/${id}`, edit);
      await fetchTask();
      navigate("/Task");
      console.log(edit);
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-container">
      <form onSubmit={handleSubmit} className="edit-form">
        <h1>Edit Task</h1>

        <div className="edit-row">
          <label>Task Title</label>
          <input
            type="text"
            name="title"
            value={edit.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="edit-row">
          <label>Description (optional)</label>
          <textarea
            type="text"
            name="description"
            value={edit.description}
            onChange={handleChange}
          />
        </div>

        <div className="edit-row">
          <label>Priority</label>
          <select
            name="priority"
            value={edit.priority}
            onChange={handleChange}
            required
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="Update-button">
          <div className="edit-btn">
            <button type="submit">Update Task</button>
          </div>
          <div className="edit-btn">
            <button onClick={() => {
              navigate("/Task")
            }}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default TaskEdit;
