import React, { useEffect, useState } from "react";
import "../complaints/complaints.css"; // reuse your existing style

function AdminHome() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Verify Admin & Fetch Complaints
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    const verifyAdminAndFetch = async () => {
      if (!token) {
        window.location.href = "/admin";
        return;
      }

      try {
        // ✅ Verify Token
        const verifyRes = await fetch("http://localhost:5000/api/admin/home", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const verifyData = await verifyRes.json();

        if (!verifyData.success) {
          localStorage.removeItem("adminToken");
          window.location.href = "/admin";
          return;
        }

        setMessage(verifyData.message);

        // ✅ Fetch all complaints
        const complaintsRes = await fetch("http://localhost:5000/api/complaints", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const complaintsData = await complaintsRes.json();

        if (complaintsRes.ok) {
          setComplaints(complaintsData.complaints);
        } else {
          setError(complaintsData.message || "Failed to load complaints");
        }
      } catch (err) {
        console.error("Error fetching admin data:", err);
        setError("Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    verifyAdminAndFetch();
  }, []);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
  };

  // ✅ Mark complaint as solved (DELETE)
  const handleSolve = async (id) => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("Session expired. Please login again.");
      window.location.href = "/admin";
      return;
    }

    if (!window.confirm("Are you sure you want to mark this complaint as solved?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/complaints/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        setComplaints((prev) => prev.filter((c) => c._id !== id));
      } else {
        alert(data.message || "Failed to delete complaint");
      }
    } catch (err) {
      alert("Error deleting complaint");
    }
  };

  if (loading) return <p>Loading admin data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="complaintsContainer" style={{ textAlign: "center" }}>
      <h2>Admin Dashboard</h2>
      <p>{message}</p>
      <button onClick={handleLogout}>Logout</button>

      <h3 style={{ marginTop: "40px" }}>All Student Complaints</h3>

      {complaints.length === 0 ? (
        <p>No complaints available.</p>
      ) : (
        <div className="complaintList">
          {complaints.map((complaint) => (
            <div key={complaint._id} className="complaintCard">
              <p>Complaint Code: {complaint.complaintCode}</p>
              <p className="complaintDesc">{complaint.complaintDescription}</p>
              <p>
                <strong>Submitted by:</strong> {complaint.studentName || "Unknown"} &nbsp;
                {complaint.studentUSN || "N/A"}
              </p>
              <p>
              	Date of Complaint: {new Date(complaint.dateOfComplaint).toLocaleDateString()}
              </p>
              <p>Upvotes: {complaint.upvotes}</p>

              <div className="complaintFooter">
                <button
                  onClick={() => handleSolve(complaint._id)}
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Mark as Solved
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminHome;
