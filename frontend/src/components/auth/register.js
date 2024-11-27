import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Alert,
  InputAdornment,
  IconButton,
  MenuItem 
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { registerUser } from '../../api/auth';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      await registerUser({ name, email, password, role });
      // Show success message and redirect to login
      navigate('/login', { 
        state: { 
          message: 'Registration successful! Please login to continue.' 
        }
      });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleSubmit} className="space-y-6">
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          variant="outlined"
          className="bg-gray-50"
          disabled={isLoading}
        />

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

        <TextField
          select
          fullWidth
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          variant="outlined"
          className="bg-gray-50"
          disabled={isLoading}
        >
          <MenuItem value="">Select Role</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="seller">Seller</MenuItem>
        </TextField>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="bg-primary-600 hover:bg-primary-700 text-white py-3"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </Button>

        {errorMessage && (
          <Alert severity="error" className="mt-4">
            {errorMessage}
          </Alert>
        )}
      </form>
    </AuthLayout>
  );
};

export default Register;
