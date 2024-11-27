import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FeedbackButton = ({ productId }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  const handleClick = () => {
    if (!isLoggedIn) {
      navigate('/login', { 
        state: { 
          from: `/feedback/new/${productId}`,
          message: 'Please login to write a review' 
        } 
      });
      return;
    }

    if (userRole !== 'user') {
      // Show error or notification that only customers can write reviews
      return;
    }

    navigate(`/feedback/new/${productId}`);
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      className="bg-primary-600 hover:bg-primary-700"
    >
      Write a Review
    </Button>
  );
};

export default FeedbackButton; 