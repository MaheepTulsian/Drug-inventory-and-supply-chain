import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const LandingPage = () => {

  return (
      <Box
        sx={{
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="lg">
          {/* Hero Section */}
          <Box textAlign="center" mb={4}>
            <Typography variant="h2" gutterBottom>
              Welcome to MyApp
            </Typography>
          </Box>
        </Container>
      </Box>
  );
};

export default LandingPage;
