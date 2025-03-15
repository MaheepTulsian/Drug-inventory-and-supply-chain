import React, { useContext } from "react";
import { Toolbar, Typography, IconButton, Button, Box, useTheme } from "@mui/material";
import { ColorModeContext } from "../theme.js";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const Navbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <div>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "divider" }}>
        {/* Company Name */}
        <Typography variant="h2" fontWeight="bold">
          MedTrack
        </Typography>

        {/* Right Side: Dark Mode & Get Started */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={colorMode.toggleColorMode} aria-label="toggle theme">
            {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </IconButton>
        </Box>

      </Toolbar>
    </div>
  );
};

export default Navbar;
