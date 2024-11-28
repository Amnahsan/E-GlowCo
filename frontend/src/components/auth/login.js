import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Alert,
  InputAdornment,
  IconButton 
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { loginUser } from '../../api/auth';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const data = await loginUser({ email, password });
      const { token, user } = data;
      
      // Save all necessary data to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }));
      localStorage.setItem('role', user.role);

      // Show success message
      setSuccessMessage('Login successful! Redirecting...');

      // Redirect based on user role
      setTimeout(() => {
        switch (user.role) {
          case 'admin':
            navigate('/admin-dashboard');
            break;
          case 'user':
            navigate('/customer-dashboard');
            break;
          case 'seller':
            navigate('/seller-dashboard');
            break;
          default:
            throw new Error('Invalid user role');
        }
      }, 1500);

    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit} className="space-y-6">
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          variant="outlined"
          className="bg-gray-50"
          disabled={isLoading}
        />
        
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="outlined"
          className="bg-gray-50"
          disabled={isLoading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  disabled={isLoading}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="bg-primary-600 hover:bg-primary-700 text-white py-3"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>

        {successMessage && (
          <Alert severity="success" className="mt-4">
            {successMessage}
          </Alert>
        )}
        
        {errorMessage && (
          <Alert severity="error" className="mt-4">
            {errorMessage}
          </Alert>
        )}
      </form>
    </AuthLayout>
  );
};

export default Login;
