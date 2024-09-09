import React from 'react';
import Example from '../utils/Lottie';
import animation from '../assets/NotFoundAnimation.json';
import { Box } from '@mui/material';

const NotFound = () => {
  return (
    <Box className="full-screen">
      <Example Link={animation} />
    </Box>
  );
};

export default NotFound;
