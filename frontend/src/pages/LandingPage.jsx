import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const LandingPage = () => {
  const theme = useTheme();

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: theme.spacing(4),
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="lg">
          {/* Hero Section */}
          <Box textAlign="center" mb={4}>
            <Typography variant="h2" gutterBottom>
              Welcome to MyApp
            </Typography>
            <Typography variant="h5" gutterBottom>
              Your one-stop solution for all your needs
            </Typography>
            <Button variant="contained" color="primary" size="large">
              Get Started
            </Button>
          </Box>

          {/* Features Section */}
          <Box>
            <Typography variant="h4" gutterBottom textAlign="center">
              Features
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' }, // Stack on mobile, row on larger screens
                justifyContent: 'space-between',
                gap: 4,
              }}
            >
              <Box flex={1} textAlign="center">
                <Typography variant="h6" gutterBottom>
                  Feature One
                </Typography>
                <Typography>
                  Description of feature one goes here. It explains the benefits and functionalities.
                </Typography>
              </Box>
              <Box flex={1} textAlign="center">
                <Typography variant="h6" gutterBottom>
                  Feature Two
                </Typography>
                <Typography>
                  Description of feature two goes here. It explains the benefits and functionalities.
                </Typography>
              </Box>
              <Box flex={1} textAlign="center">
                <Typography variant="h6" gutterBottom>
                  Feature Three
                </Typography>
                <Typography>
                  Description of feature three goes here. It explains the benefits and functionalities.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;
