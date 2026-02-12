import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./adminLogin.css";

function AdminLogin() {
  const [form, setForm] = useState({
    userId: "",
    password1: "",
    password2: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    const verifyToken = async () => {
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/admin/home", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (res.ok && data.success) {
          navigate("/admin/home");
        } else {
          localStorage.removeItem("adminToken");
        }
      } catch (err) {
        localStorage.removeItem("adminToken");
      }
    };

    verifyToken();
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin/home");
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      setMessage("❌ Error connecting to server.");
    }
  };

  return (
    <div className="adminLoginBg">
      <div className="loginCard">
        <h2 className="loginTitle">Admin Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label>User ID</label>
            <input
              type="text"
              name="userId"
              value={form.userId}
              onChange={handleChange}
              placeholder="Enter Admin ID"
            />
          </div>

          <div className="inputGroup">
            <label>Password 1</label>
            <input
              type="password"
              name="password1"
              value={form.password1}
              onChange={handleChange}
              placeholder="Enter Password 1"
            />
          </div>

          <div className="inputGroup">
            <label>Password 2</label>
            <input
              type="password"
              name="password2"
              value={form.password2}
              onChange={handleChange}
              placeholder="Enter Password 2"
            />
          </div>

          <button type="submit" className="loginBtn">
            Login
          </button>

          {message && <p className="errorMsg">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
