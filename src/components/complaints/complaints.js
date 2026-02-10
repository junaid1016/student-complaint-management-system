import React, { useEffect, useState } from "react";
import "./complaints.css";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch complaints from backend
  const fetchComplaints = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/complaints");
      const data = await res.json();

      if (res.ok) {
        setComplaints(data.complaints);
      } else {
        setError(data.message || "Failed to load complaints");
      }
    } catch (err) {
      setError("Error fetching complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // ✅ Handle upvote
  const handleUpvote = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/complaints/${id}/upvote`, {
        method: "PUT",
      });
      const data = await res.json();

      if (res.ok) {
        setComplaints((prev) =>
          prev.map((c) =>
            c._id === id ? { ...c, upvotes: data.upvotes } : c
          )
        );
      } else {
        alert(data.message || "Failed to upvote");
      }
    } catch (err) {
      alert("Error while upvoting");
    }
  };

  if (loading) return <p>Loading complaints...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="complaintsBg">
      <h2 className="complaintsTitle">All Complaints</h2>

      {complaints.length === 0 ? (
        <p className="noComplaints">No complaints found.</p>
      ) : (
        <div className="complaintsGrid">
          {complaints.map((complaint) => (
            <div key={complaint._id} className="complaintCard">
              <p className="description">
                {complaint.complaintDescription}
              </p>

              <div className="cardBottom">
                <span className="upvotes">
                  👍 {complaint.upvotes}
                </span>

                <button
                  className="upvoteBtn"
                  onClick={() => handleUpvote(complaint._id)}
                >
                  Upvote
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

}

export default Complaints;
