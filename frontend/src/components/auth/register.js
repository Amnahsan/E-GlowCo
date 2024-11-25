import { useState } from 'react';
import axios from 'axios';
import './auth.css'; // Assuming auth.css is the file you are using for global styles

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ name, email, password, role });  // Log the data before sending

    try {
      await axios.post('http://localhost:3001/api/auth/register', { name, email, password, role });
      window.location.href = '/login';
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Registration failed');
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
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Name" 
            required
          />
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
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="seller">Seller</option>
          </select>
          <button type="submit">Register</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
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

export default Register;
