import React, { useState } from "react";
import "./students.css";

function Students() {
  const [formData, setFormData] = useState({
    studentName: "",
    studentUSN: "",
    complaintDescription: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 🔹 Loader state

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { studentName, studentUSN, complaintDescription } = formData;

    // ✅ Frontend validation
    if (!studentName || !studentUSN || !complaintDescription) {
      setError("Please fill in all fields before submitting.");
      return;
    }

    setError("");
    setLoading(true); // 🔹 Start loader

    try {
      const response = await fetch("http://localhost:5000/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // ✅ Check if the backend responded with 201
      if (response.status === 201) {
        console.log("Complaint submitted:", result);
        alert("Complaint submitted successfully!");
        // Optionally reset form
        setFormData({
          studentName: "",
          studentUSN: "",
          complaintDescription: "",
        });
      } else {
        // Backend didn’t return 201
        setError(result.message || "Failed to submit complaint. Try again.");
      }
    } catch (err) {
      console.error("Error submitting complaint:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false); // 🔹 Stop loader
    }
  };

  return (
    <div className="studentsFormContainer">
      <h2>Student Complaint Form</h2>

      <form className="studentsForm" onSubmit={handleSubmit}>
        <label>Student Name:</label>
        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
          disabled={loading}
        />

        <label>Student USN:</label>
        <input
          type="text"
          name="studentUSN"
          value={formData.studentUSN}
          onChange={handleChange}
          placeholder="Enter your USN"
          required
          disabled={loading}
        />

        <label>Complaint Description:</label>
        <textarea
          name="complaintDescription"
          value={formData.complaintDescription}
          onChange={handleChange}
          placeholder="Describe your issue here..."
          rows="5"
          required
          disabled={loading}
        ></textarea>

        {error && <p className="errorMsg">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>

        {loading && (
          <div className="loaderContainer">
            <div className="loader"></div>
            <p>Submitting your complaint...</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default Students;
