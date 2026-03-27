import React from 'react';
import { Link, useLocation } from "react-router-dom";

function Sidebar({ darkMode }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const sidebarStyle = {
    width: "250px",
    height: "100vh",
    // Uses a deep navy for light mode, and a pure dark for dark mode
    background: darkMode ? "#0f172a" : "#1e293b", 
    color: "white",
    padding: "30px 20px",
    position: "fixed",
    left: 0,
    top: 0,
    boxShadow: "4px 0 15px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    zIndex: 1000,
    transition: "background 0.3s ease"
  };

  const logoStyle = {
    fontSize: "1.4rem",
    fontWeight: "800",
    color: "#87CEEB", 
    textAlign: "center",
    letterSpacing: "1px"
  };

  const subLogoStyle = {
    fontSize: "0.75rem",
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: "30px",
    letterSpacing: "3px",
    fontWeight: "bold"
  };

  const linkStyle = (path) => ({
    display: "flex",
    alignItems: "center",
    padding: "12px 15px",
    color: "white",
    textDecoration: "none",
    borderRadius: "12px",
    marginBottom: "8px",
    transition: "all 0.3s ease",
    background: isActive(path) ? "#4CAF50" : "transparent",
    boxShadow: isActive(path) ? "0 4px 12px rgba(76, 175, 80, 0.3)" : "none",
    fontWeight: isActive(path) ? "600" : "400",
  });

  return (
    <div style={sidebarStyle}>
      {/* Branding Section */}
      <div style={logoStyle}>ZANITH PRIME</div>
      <div style={subLogoStyle}>PHARMACARE</div>
      
      <hr style={{ borderColor: "rgba(255,255,255,0.1)", marginBottom: "30px" }} />

      {/* Navigation Links */}
      <nav style={{ flexGrow: 1 }}>
        <Link to="/" style={linkStyle("/")}>
          <span style={{ marginRight: "12px", fontSize: "1.2rem" }}>📊</span> Dashboard
        </Link>

        <Link to="/products" style={linkStyle("/products")}>
          <span style={{ marginRight: "12px", fontSize: "1.2rem" }}>📦</span> Inventory List
        </Link>

        <Link to="/add-product" style={linkStyle("/add-product")}>
          <span style={{ marginRight: "12px", fontSize: "1.2rem" }}>➕</span> Add Medicine
        </Link>
      </nav>

      {/* REVISED BOTTOM SECTION: No specific names, just professional status */}
      <div style={{ 
        padding: "15px", 
        background: "rgba(255, 255, 255, 0.05)", 
        borderRadius: "15px",
        border: "1px solid rgba(255, 255, 255, 0.1)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ 
            width: "10px", 
            height: "10px", 
            borderRadius: "50%", 
            background: "#4CAF50",
            boxShadow: "0 0 8px #4CAF50" 
          }}></div>
          <div style={{ fontSize: "0.85rem", fontWeight: "600" }}>System Active</div>
        </div>
        <div style={{ fontSize: "0.7rem", color: "#87CEEB", marginTop: "5px", paddingLeft: "20px" }}>
          Authenticated Session
        </div>
      </div>
    </div>
  );
}

export default Sidebar;