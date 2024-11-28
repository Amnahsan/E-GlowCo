import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './themes/theme';
import PrivateRoute from './components/auth/PrivateRoute';

// Pages
import Home from "./pages/home/HomePage";
import AdminWelcome from "./components/AdminDashboard/adminwelcome";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import NotFound from "./components/auth/notfoundpage";
import ProductManagement from "./components/AdminDashboard/productMng";
import Dashboard from "./components/SellerDashboard/SellerDashboard";
import Products from "./components/SellerDashboard/ProductsPage";
import DiscountPage from "./components/SellerDashboard/DiscountPage";
import FeedbackPage from './components/feedback/customer/FeedbackPage';
import SellerFeedbackPage from './components/feedback/seller/SellerFeedbackPage';
import ProductFeedbacks from './components/product/ProductFeedbacks';
import OrdersPage from './components/SellerDashboard/OrdersPage';
import ProductOrderPage from './components/customer/ProductOrderPage';
import CustomerDashboard from './components/customer/CustomerDashboard';
import OrderHistory from './components/customer/OrderHistory';
import VideoManagement from './components/SellerDashboard/VideoManagement';


// Global Styles
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Provides consistent baseline styles */}
      <Router>
        <div className="app-container">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id/reviews" element={<ProductFeedbacks />} />

            {/* Customer Routes */}
            <Route 
              path="/feedback" 
              element={
                <PrivateRoute allowedRoles={['user']}>
                  <FeedbackPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/feedback/new/:productId" 
              element={
                <PrivateRoute allowedRoles={['user']}>
                  <FeedbackPage />
                </PrivateRoute>
              } 
            />

            {/* Seller Routes */}
            <Route 
              path="/seller-dashboard/feedback" 
              element={
                <PrivateRoute allowedRoles={['seller']}>
                  <SellerFeedbackPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/seller-dashboard/orders" 
              element={
                <PrivateRoute allowedRoles={['seller']}>
                  <OrdersPage />
                </PrivateRoute>
              } 
            />

            {/* Admin Routes */}
            <Route path="/admin-dashboard" element={<AdminWelcome />} />
            <Route path="/add-product" element={<ProductManagement />} />

            {/* Seller Routes */}
            <Route 
              path="/seller-dashboard" 
              element={
                <PrivateRoute allowedRoles={['seller']}>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/seller-dashboard/products" 
              element={
                <PrivateRoute allowedRoles={['seller']}>
                  <Products />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/seller-dashboard/discounts" 
              element={
                <PrivateRoute allowedRoles={['seller']}>
                  <DiscountPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/seller-dashboard/videos" 
              element={
                <PrivateRoute allowedRoles={['seller']}>
                  <VideoManagement />
                </PrivateRoute>
              } 
            />

            {/* Customer Routes */}
            <Route 
              path="/order-products" 
              element={
                <PrivateRoute allowedRoles={['user']}>
                  <ProductOrderPage />
                </PrivateRoute>
              } 
            />

            {/* Customer Routes */}
            <Route 
              path="/customer-dashboard" 
              element={
                <PrivateRoute allowedRoles={['user']}>
                  <CustomerDashboard />
                </PrivateRoute>
              } 
            />

            {/* Customer Routes */}
            <Route 
              path="/order-history" 
              element={
                <PrivateRoute allowedRoles={['user']}>
                  <OrderHistory />
                </PrivateRoute>
              } 
            />

            {/* 404 Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
