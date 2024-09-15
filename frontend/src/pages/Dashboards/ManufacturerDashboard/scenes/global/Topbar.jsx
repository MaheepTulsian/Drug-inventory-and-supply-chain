import { Box, Button, IconButton, useTheme } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { ColorModeContext, tokens } from "../../../../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import Logo1 from "../../../../../assets/Logo_Dark.png";
import Logo2 from "../../../../../assets/Logo_Light.png";
import axios from "axios";

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  // Logo based on theme
  const Logo = theme.palette.mode === "dark" ? Logo1 : Logo2;

  const handleLogout = async () => {
    try {
      // Proper axios configuration with 'withCredentials'
      const response = await axios.get(
        'http://localhost:3000/api/manufacturer/logout', // Ensure this URL is correct
        {},
        { withCredentials: true } // Pass it in the axios config
      );
  
      console.log('Logout successful:', response.data);
  
      // Clear user data and redirect to the login page
      localStorage.clear();
      window.location.href = '/';
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error response from server:', error.response.data);
        console.error('Status code:', error.response.status);
      } else if (error.request) {
        // No response from server
        console.error('No response from server:', error.request);
      } else {
        // Other errors
        console.error('Error logging out:', error.message);
      }
    }
  };

  const [data, setData] = useState("Your Company Name");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/manufacturer/manufacturer_profile", {
        withCredentials: true,
      })
      .then((response) => {
        const apiData = response.data.data;
        // Ensure the address is an array and safely access fields using optional chaining
        const formattedData = {
          company_name: apiData.company_name || "Your Company Name",
        };
        setData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>

      {/* Company Name */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        color={tokens(theme.palette.mode).textColor}
        fontSize={20}
        fontWeight="bold"
      >
        {/* Logo */}
        <img src={Logo} alt="logo" style={{ width: 40, height: 40, marginRight: 10 }} />
        {data.company_name}
      </Box>

      {/* ICONS */}
      <Box display="flex" gap={2}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        
        {/* Logout Button */}
        <Button
          variant="contained"
          color="secondary"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          aria-label="logout"
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Topbar;
