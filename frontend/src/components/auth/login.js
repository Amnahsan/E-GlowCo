import React, { useState } from 'react';
import './auth.css'; // Assuming the same CSS file is being used for both pages

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending POST request to login API
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const data = await response.json();
      const { token, user } = data; // Correctly extract user object
      const { role } = user; // Extract role from user

      // Save the token and role to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Show success message
      setSuccessMessage('Login successful! Redirecting...');
      setErrorMessage(''); // Clear error message

      // Redirect based on user role
      setTimeout(() => {
        if (role === 'admin') {
          window.location.href = '/admin-dashboard'; // Corrected to match route
        } else if (role === 'user') {
          window.location.href = '/user-dashboard';
        } else if (role === 'seller') {
          window.location.href = '/seller-dashboard';
        } else {
          throw new Error('Invalid user role'); // Only reached if role is not recognized
        }
      }, 2000); // Redirect after 2 seconds

    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage(''); // Clear success message
    }
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="logo">SAM E-GlowCo</div>
        <nav>
          <ul className="nav-list">
            <li><a href="/" className="nav-link">Home</a></li>
            <li><a href="/register" className="nav-link">Register</a></li>
            <li><a href="/login" className="nav-link">Login</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            required 
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
          />
          <button type="submit">Login</button>
        </form>
        
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </main>

      {/* Footer */}
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

export default Login;
