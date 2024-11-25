import React from 'react';
import { Link } from 'react-router-dom';
import './auth.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">SAM E-GlowCo</div>
        <nav>
          <ul className="nav-list">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/register" className="nav-link">Register</Link></li>
            <li><Link to="/login" className="nav-link">Login</Link></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="hero">
        <img
          src="https://www.imarcgroup.com/blogs/files/259a1fde-d26e-4025-919e-da5219f51567ezgif.com-gif-maker-(19).webp" // Replace this with the URL of your image
          alt="Hero" 
          className="hero-image"
        />
      </div>

      <footer className="footer">
        <p className="footer-text">© 2024 SAM E-GlowCo. All Rights Reserved.</p>
        <div className="group-members">
          <span>Samra Saleem</span>
          <span>Muskan Tariq</span>
          <span>Amna Hassan</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
