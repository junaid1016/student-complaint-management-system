import React from "react";
import "./options.css";
import { useNavigate } from "react-router-dom";

function Options() {

    const navigate = useNavigate();

    return (
        <>
            <div className="optionsMain">
                <div className="optionsAdmin" onClick={() => navigate("/admin")}><p>Admin</p></div>
                <div className="optionsStudents" onClick={() => navigate("/students")}><p>Students</p></div>
                <div className="optionsComplaints" onClick={() => navigate("/complaints")}><p>Complaints</p></div>
            </div>
        </>
    );
}

export default Options;