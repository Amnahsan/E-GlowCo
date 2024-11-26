import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/auth/home"; // Ensure this path is correct
import AdminWelcome from "./components/AdminDashboard/adminwelcome"; // Corrected to AdminWelcome.jsx
import Login from "./components/auth/login";
import Register from "./components/auth/register";
//import ProtectedRoute from "./components/auth/protectedRoute"; // Ensure this file handles role-based protection
import NotFound from "./components/auth/notfoundpage"; // Ensure this component exists
import ProductManagement from "./components/AdminDashboard/productMng"; // Corrected to ProductManagement.jsx
import Dashboard from "./components/SellerDashboard/SellerDashboard"; // Import the Seller Dashboard
import Products from "./components/SellerDashboard/ProductsPage"; // Import the Products component
function App() {
  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />


        <Route path="/admin-dashboard" element={<AdminWelcome />} />


        {/* Add Product Route */}
        <Route path="/add-product" element={<ProductManagement />} />
        

        {/* Seller Dashboard Route */}
        <Route path="/seller-dashboard" element={<Dashboard />} />
        
        <Route path="/seller-dashboard/products" element={<Products />} />


        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
