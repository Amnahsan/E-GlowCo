import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';  // Corrected import

const AdminData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token); // Correct usage of jwtDecode
      const isAdmin = decodedToken.role === 'admin'; // Check if the user is admin

      if (isAdmin) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Fetch protected admin data
        axios.get('/api/admin-data', { headers })
          .then((response) => {
            setData(response.data);
          })
          .catch((err) => {
            setError('You do not have permission to access this data.');
          });
      } else {
        setError('Access denied. You are not an admin.');
      }
    } else {
      setError('No token found, please log in.');
    }
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Admin Data</h1>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
  );
};

export default AdminData;
