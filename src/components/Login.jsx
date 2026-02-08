
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { GoTasklist } from "react-icons/go"

function Login() {

  const [Login, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Login) {
      navigate("/Dashboard");
    } else {
      alert("Account created successfully!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="login-icon">
          <i><GoTasklist /></i>
          <h1>TaskFlow</h1>
        </div>
        <p>Manage your tasks efficiently</p>
      </div>
      <div className="login-card">
        <div className="login-welcome">
          <h1>Welcome</h1>
          <p>Sign in to your account or create a new one</p>
        </div>

        <div className="form-tabs">
          <button
            className="tab"
            onClick={() => {
              setIsLogin(true);
            }}
          >
            Login
          </button>
          <button
            className="tab"
            onClick={() => {
              setIsLogin(false);
            }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <label>Email</label>
            <input
              type="email"
              placeholder="test@gmail.com"
              required
            />
          </div>

          <div className="form-row">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••"
              required
            />
          </div>

          <button type="submit" className="form-submit">
            {Login ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
