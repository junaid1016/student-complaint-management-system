import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./adminLogin.css";

function AdminLogin() {
  const [form, setForm] = useState({ userId: "", password1: "", password2: "" });
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
          localStorage.removeItem("adminToken"); // token invalid → clear it
        }
      } catch (err) {
        console.error("Token verification failed:", err);
        localStorage.removeItem("adminToken");
      }
    };

    verifyToken();
  }, [navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
    <div className="adminLoginContainer">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="adminForm">
        <input type="text" name="userId" placeholder="User ID" value={form.userId} onChange={handleChange} required />
        <input type="password" name="password1" placeholder="Password 1" value={form.password1} onChange={handleChange} required />
        <input type="password" name="password2" placeholder="Password 2" value={form.password2} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {message && <p className="loginMessage">{message}</p>}
    </div>
  );
}

export default AdminLogin;
