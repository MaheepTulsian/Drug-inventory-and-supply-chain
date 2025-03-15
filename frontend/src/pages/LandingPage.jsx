import { useContext } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useMediaQuery,
  useTheme,
  IconButton,
  Divider,
} from "@mui/material"
import {
  Menu as MenuIcon,
  ArrowForward as ArrowForwardIcon,
  HealthAndSafety as HealthIcon,
  Analytics as AnalyticsIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  LightMode as LightModeOutlinedIcon,
  DarkMode as DarkModeOutlinedIcon,
} from "@mui/icons-material"
import Banner from "../assets/banner.svg"
import { ColorModeContext } from "../theme.js"
import { Link } from "react-router-dom"

const LandingPage = () => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const mode = theme.palette.mode

  // Gradient text style
  const gradientTextStyle = {
    background: "linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    display: "inline-block",
  }

  const featureItems = [
    {
      icon: <HealthIcon fontSize="large" color="secondary" />,
      title: "Smart Inventory Management",
      description: "Automatically track and optimize medical supplies with AI-powered insights.",
    },
    {
      icon: <AnalyticsIcon fontSize="large" color="secondary" />,
      title: "Advanced Analytics",
      description: "Make data-driven decisions with comprehensive dashboards and reports.",
    },
    {
      icon: <SpeedIcon fontSize="large" color="secondary" />,
      title: "Real-time Monitoring",
      description: "Stay informed with instant alerts and notifications for critical events.",
    },
    {
      icon: <SecurityIcon fontSize="large" color="secondary" />,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security ensuring patient data remains protected.",
    },
  ]

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
        color: mode === "dark" ? theme.palette.grey[100] : theme.palette.grey[900],
      }}
    >

      {/* Hero Section */}
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexGrow: 1,
          alignItems: "center",
          py: { xs: 6, md: 10 },
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 6 : 0,
        }}
      >
        {/* Left Section */}
        <Box sx={{ width: isMobile ? "100%" : "50%", textAlign: isMobile ? "center" : "left" }}>
          <Typography
            variant="h2"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              lineHeight: 1.2,
            }}
          >
            <span style={gradientTextStyle}>Transforming Healthcare</span> with Smart Insights
          </Typography>

          <Typography
            variant="h5"
            color="text.secondary"
            gutterBottom
            sx={{
              fontSize: { xs: "1rem", sm: "1.25rem" },
              mt: 2,
              mb: 3,
            }}
          >
            Monitor, analyze, and optimize medical inventory and patient care with real-time data.
          </Typography>

          <Box mt={4} display="flex" gap={2} sx={{ justifyContent: isMobile ? "center" : "flex-start" }}>
            <Link to="/dashboard">
            <Button
              variant="contained"
              color="secondary"
              size="large"
              endIcon={<ArrowForwardIcon />}

              sx={{
                px: 3,
                py: 1.5,
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Get Started
            </Button>
            </Link>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
            Trusted by leading healthcare providers worldwide
          </Typography>
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            width: isMobile ? "100%" : "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={Banner}
            alt="Healthcare Dashboard"
            sx={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "12px",
            }}
          />
        </Box>
      </Container>

      {/* Features Section */}
      <Box
        sx={{
          py: 8,
          backgroundColor: mode === "dark" ? theme.palette.primary[400] : theme.palette.primary[400],
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom sx={{ mb: 6 }}>
            Powerful <span style={gradientTextStyle}>Features</span>
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
              gap: 4,
            }}
          >
            {featureItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  p: 3,
                  borderRadius: "12px",
                  backgroundColor: mode === "dark" ? theme.palette.primary[600] : "white",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{item.icon}</Box>
                <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.secondary.main }} gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 10,
          backgroundColor: mode === "dark" ? theme.palette.primary[500] : theme.palette.primary[400],
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
            Ready to <span style={gradientTextStyle}>Transform</span> Your Healthcare Operations?
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 5, maxWidth: "700px", mx: "auto" }}>
            Join hundreds of healthcare providers who are already optimizing their operations and improving patient care
            with our platform.
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Schedule a Demo
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 5,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "center", md: "flex-start" },
              textAlign: { xs: "center", md: "left" },
              gap: 4,
            }}
          >
            <Box sx={{ maxWidth: "300px" }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                MedTrack
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Empowering healthcare providers with intelligent solutions for better patient outcomes.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                gap: { xs: 4, sm: 8 },
              }}
            >
              <Box>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Product
                </Typography>
                <Link href="#" color="inherit" display="block" sx={{ my: 1 }}>
                  Features
                </Link>
                <Link href="#" color="inherit" display="block" sx={{ my: 1 }}>
                  Pricing
                </Link>
                <Link href="#" color="inherit" display="block" sx={{ my: 1 }}>
                  Integrations
                </Link>
              </Box>

              <Box>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Resources
                </Typography>
                <Link href="#" color="inherit" display="block" sx={{ my: 1 }}>
                  Documentation
                </Link>
                <Link href="#" color="inherit" display="block" sx={{ my: 1 }}>
                  Blog
                </Link>
                <Link href="#" color="inherit" display="block" sx={{ my: 1 }}>
                  Case Studies
                </Link>
              </Box>

              <Box>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Company
                </Typography>
                <Link href="#" color="inherit" display="block" sx={{ my: 1 }}>
                  About
                </Link>
                <Link href="#" color="inherit" display="block" sx={{ my: 1 }}>
                  Careers
                </Link>
                <Link href="#" color="inherit" display="block" sx={{ my: 1 }}>
                  Contact
                </Link>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} MedTrack. All rights reserved.
            </Typography>

            <Box sx={{ display: "flex", gap: 3 }}>
              <Link href="#" color="inherit" variant="body2">
                Privacy Policy
              </Link>
              <Link href="#" color="inherit" variant="body2">
                Terms of Service
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default LandingPage

