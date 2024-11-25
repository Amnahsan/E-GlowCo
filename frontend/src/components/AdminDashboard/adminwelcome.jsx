import { Link } from "react-router-dom";
import "./admin.css"; // Add styles here for your admin dashboard

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      {/* Navbar */}
      <header className="admin-header">
        <div className="logo">SAM E-GlowCo Admin</div>
        <nav>
          <ul className="admin-nav-list">
            <li><Link to="/admin-dashboard" className="admin-nav-link">Dashboard</Link></li>
            <li><Link to="/add-product" className="admin-nav-link">Add Product</Link></li>
            <li><Link to="/manage-products" className="admin-nav-link">Manage Products</Link></li>
            <li><Link to="/view-orders" className="admin-nav-link">View Orders</Link></li>
            <li><Link to="/admin-profile" className="admin-nav-link">Profile</Link></li>
          </ul>
        </nav>
      </header>

      {/* Body */}
      <main className="admin-main-content">
        <h1>Welcome to Admin Dashboard</h1>
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

export default AdminDashboard;
