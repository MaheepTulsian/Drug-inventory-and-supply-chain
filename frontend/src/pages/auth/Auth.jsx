import React, { useState } from 'react';
import Example from '../../utils/Lottie'; // Import your Lottie wrapper component
import animationData from '../../assets/AuthAnimation.json'; // Lottie animation JSON
import {
  Container, Box, Typography, TextField, Button, MenuItem,
  FormControl, InputLabel, Select, ThemeProvider, createTheme,
  CssBaseline, useMediaQuery
} from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#ffffff',
    },
  },
});

const roles = ['Manufacturer', 'Vendor', 'Hospital', 'Individual'];

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [role, setRole] = useState('');
  const isMobile = useMediaQuery('(max-width: 600px)'); // Media query to detect mobile screens

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container
        className='auth-container'
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between', // Or use justifyContent: 'center' if you want both centered
          gap: 16, // Adjust the gap value as needed (e.g., 4, 6, 8)
          padding: 0,
        }}
      >
        {!isMobile && (
          <Box
            sx={{
              width: '50%',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Example Link={animationData} />
          </Box>
        )}

        <Box
          component="form"
          sx={{
            width: isMobile ? '100%' : '50%',
            backgroundColor: 'background.paper',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            {isSignup ? 'Sign Up' : 'Login'}
          </Typography>

          {isSignup && (
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Role</InputLabel>
              <Select value={role} onChange={handleRoleChange}>
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {isSignup && (
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              type="text"
              required
            />
          )}

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            required
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            required
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </Button>

          <Button
            fullWidth
            variant="text"
            sx={{ marginTop: 1 }}
            onClick={toggleAuthMode}
          >
            {isSignup ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AuthPage;
