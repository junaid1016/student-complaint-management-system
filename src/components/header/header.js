import React from "react";
import "./header.css";
import collegeLogo from "./college.png";
import complaintLogo from "./sw.jpeg";

function Header() {


    return (
        <>
            <div className="headerMain">
                <img src={collegeLogo} alt="College Logo" className="logo leftLogo"/>
                <p className="headerP">Student Complaint Management System</p>
                <img src={complaintLogo} alt="Namme-Voice" className="logo rightLogo"/>
            </div>
        </>
    );
}

export default Header;