import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';

function App() {
  // 1. Initialize theme from localStorage so it stays consistent
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // 2. Apply theme class to body and update localStorage
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="app-wrapper" style={{ display: 'flex', width: '100vw', minHeight: '100vh' }}>
        
        {/* Sidebar background is handled inside Sidebar.jsx based on darkMode prop */}
        <Sidebar darkMode={darkMode} />

        {/* MAIN CONTENT AREA */}
        <main className="main-content" style={{ 
          flexGrow: 1, 
          marginLeft: '250px', // Matches Sidebar width
          width: 'calc(100% - 250px)', 
          display: 'flex', 
          flexDirection: 'column',
          transition: 'background-color 0.3s ease, color 0.3s ease',
          backgroundColor: 'inherit' // Forces it to use the Body's White or Black
        }}>
          
          {/* TOP NAVIGATION BAR */}
          <nav className="navbar navbar-expand-lg shadow-sm px-4 py-3 sticky-top">
            <div className="container-fluid">
              <span className="navbar-brand mb-0 h4 fw-bold">
                <span style={{ color: '#2D6A4F' }}>Zanith</span>
                <span style={{ color: darkMode ? '#7dd3fc' : '#0369a1' }}>Prime</span>
                <small className="ms-2 fw-light opacity-75 d-none d-md-inline" style={{ fontSize: '0.9rem' }}>
                  | Pharmacare Admin
                </small>
              </span>
              
              <div className="ms-auto d-flex align-items-center">
                {/* THEME TOGGLE BUTTON */}
                <button 
                  className={`btn btn-sm px-3 rounded-pill me-3 ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
                  onClick={() => setDarkMode(!darkMode)}
                  style={{ transition: '0.3s', fontWeight: '500' }}
                >
                  {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>

                <div className="d-flex align-items-center border-start ps-3">
                   <span className="text-success me-2" style={{ fontSize: '0.7rem' }}>●</span>
                   <span className="small fw-bold opacity-75">SYSTEM ONLINE</span>
                </div>
              </div>
            </div>
          </nav>

          {/* DYNAMIC PAGE AREA */}
          <div className="p-4 flex-grow-1 container-fluid">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/edit-product/:id" element={<AddProduct />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </div>

          {/* FOOTER */}
          <footer className="py-3 text-center border-top mt-auto opacity-75" style={{ fontSize: '0.75rem' }}>
            &copy; {new Date().getFullYear()} <strong>ZANITH PRIME PHARMACARE</strong> | SECURE ADMIN PORTAL
          </footer>
        </main>
      </div>
    </Router>
  );
}

export default App;