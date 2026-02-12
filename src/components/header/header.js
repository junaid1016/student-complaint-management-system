import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./header.css";
import backIcon from "./back.png";
import homeIcon from "./home.png";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <div className="headerMain">
      {/* LEFT */}
      {!isHome && (
        <button className="navBtn" onClick={() => navigate(-1)}>
          <img src={backIcon} alt="Back" />
        </button>
      )}

      {/* CENTER */}
      <div className="headerTitle">
        Student Complaint Management System
      </div>

      {/* RIGHT */}
      {isHome ? (
        <div className="headerRight">
          <button className="navBtn">About</button>
          <button className="navBtn">Contact</button>
        </div>
      ) : (
        <button className="navBtn" onClick={() => navigate("/")}>
          <img src={homeIcon} alt="Home" />
        </button>
      )}
    </div>
  );
}

export default Header;
