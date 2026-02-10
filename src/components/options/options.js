import React from "react";
import "./options.css";
import { useNavigate } from "react-router-dom";

function Options() {

    const navigate = useNavigate();

    return (
        <div className="dashboardBg">
            <div className="heroSection">
                <h1>Student Complaint Management System</h1>

                <div className="cardContainer">
                    <div
                        className="card adminCard"
                        onClick={() => navigate("/admin")}
                    >
                        <span>🛡️</span>
                        <h3>Admin</h3>
                    </div>

                    <div
                        className="card studentsCard"
                        onClick={() => navigate("/students")}
                    >
                        <span>👥</span>
                        <h3>Students</h3>
                    </div>

                    <div
                        className="card complaintsCard"
                        onClick={() => navigate("/complaints")}
                    >
                        <span>⚠️</span>
                        <h3>Complaints</h3>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Options;