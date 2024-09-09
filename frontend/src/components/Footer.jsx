import React from 'react';
import { Container, Typography, Link, Box } from '@mui/material';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 500,
    },
  },
});

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        component="footer"
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: theme.spacing(4),
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              gap: theme.spacing(4),
            }}
          >
            <Box>
              <Typography variant="h6" gutterBottom>
                Company
              </Typography>
              <Typography variant="body1">
                <Link href="#" color="inherit" underline="none">
                  About Us
                </Link>
              </Typography>
              <Typography variant="body1">
                <Link href="#" color="inherit" underline="none">
                  Careers
                </Link>
              </Typography>
              <Typography variant="body1">
                <Link href="#" color="inherit" underline="none">
                  Press
                </Link>
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Support
              </Typography>
              <Typography variant="body1">
                <Link href="#" color="inherit" underline="none">
                  Help Center
                </Link>
              </Typography>
              <Typography variant="body1">
                <Link href="#" color="inherit" underline="none">
                  Privacy Policy
                </Link>
              </Typography>
              <Typography variant="body1">
                <Link href="#" color="inherit" underline="none">
                  Terms of Service
                </Link>
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Typography variant="body1">
                <Link href="#" color="inherit" underline="none">
                  Facebook
                </Link>
              </Typography>
              <Typography variant="body1">
                <Link href="#" color="inherit" underline="none">
                  Twitter
                </Link>
              </Typography>
              <Typography variant="body1">
                <Link href="#" color="inherit" underline="none">
                  Instagram
                </Link>
              </Typography>
            </Box>
          </Box>

          {/* Footer bottom section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: isMobile ? 'center' : 'space-between',
              marginTop: theme.spacing(4),
            }}
          >
            <Typography variant="body2" color="textSecondary">
              © {new Date().getFullYear()} MyApp. All rights reserved.
            </Typography>
            {!isMobile && (
              <Typography variant="body2" color="textSecondary">
                Designed by Mahi Tulsyan
              </Typography>
            )}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;
