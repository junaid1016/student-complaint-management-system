import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./header.css";

import backIcon from "./back.png";
import homeIcon from "./home.png";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <div className="headerMain">

      {/* 🔙 Back button – only on NON-home pages */}
      {!isHomePage && (
        <button className="navBtn backBtn" onClick={() => navigate(-1)}>
          <img src={backIcon} alt="Back" className="navIcon" />
        </button>
      )}

      {/* 🏷 Title */}
      <div className="headerTitle">
        Student Complaint Management System
      </div>

      {/* Right side buttons */}
      <div className="headerRight">

        {/* 🏠 HOME PAGE ONLY */}
        {isHomePage && (
          <>
            <button className="navBtn textBtn" onClick={() => alert("About page")}>
              About
            </button>
            <button className="navBtn textBtn" onClick={() => alert("Contact page")}>
              Contact
            </button>
          </>
        )}

        {/* 📄 OTHER PAGES */}
        {!isHomePage && (
          <button className="navBtn homeBtn" onClick={() => navigate("/")}>
            <img src={homeIcon} alt="Home" className="navIcon" />
          </button>
        )}

      </div>
    </div>
  );
}

export default Header;
