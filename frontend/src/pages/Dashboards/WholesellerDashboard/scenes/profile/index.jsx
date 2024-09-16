import React, { useState, useEffect } from "react";
import { Box, Grid, TextField, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../../../../theme"; // Assuming you have the tokens set up for the theme
import Logo1 from "../../../../../assets/Logo_Dark.png";
import Logo2 from "../../../../../assets/Logo_Light.png";
import axios from "axios";

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Logo based on theme
  const Logo = theme.palette.mode === "dark" ? Logo1 : Logo2;

  // Initial data
  const initialData = {
    manufacturer_id: "MFG123",
    company_name: "Pharma Corp",
    address: {
      street: "1234 Health Avenue",
      city: "Mumbai",
      state: "Maharashtra",
      postal_code: "400001",
      country: "India",
    },
    email: "info@pharmacorp.com",
    phone: "+91 9876543210",
    website: "www.pharmacorp.com",
    GST_No: "27ABCDE1234F1Z5",
    rating: 4.8,
  };

  const [data, setData] = useState(initialData);
  const [editMode, setEditMode] = useState(false);

  // Fetching data from API
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/manufacturer/manufacturer_profile", {
        withCredentials: true,
      })
      .then((response) => {
        const apiData = response.data.data;
        // Ensure the address is an array and safely access fields using optional chaining
        const formattedData = {
          manufacturer_id: apiData.manufacturer_id || "",
          company_name: apiData.company_name || "",
          address: {
            street: apiData.address?.[0]?.street || "",
            city: apiData.address?.[0]?.city || "",
            state: apiData.address?.[0]?.state || "",
            postal_code: apiData.address?.[0]?.postal_code || "",
            country: apiData.address?.[0]?.country || "",
          },
          email: apiData.email || "",
          phone: apiData.phone || "",
          website: apiData.website || "",
          GST_No: apiData.GST_No || "",
          rating: 4.8, // Assuming rating is hardcoded
        };

        setData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Toggle edit mode and handle form submission
  const handleToggleEdit = () => {
    if (editMode) {
      // Form submission logic can be added here (e.g., call a PUT/POST API to save data)
      console.log("Form submitted:", data);
    }
    setEditMode(!editMode);
  };

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address")) {
      const addressField = name.split(".")[1]; // Extract field after 'address.'
      setData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  return (
    <Box p={4}>
      {/* Logo */}
      <Grid container justifyContent="center">
        <img
          src={Logo}
          alt="Company Logo"
          style={{ width: "150px", marginBottom: "40px" }}
        />
      </Grid>

      {/* Profile Details */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" color={colors.grey[100]}>
            Company Name:
          </Typography>
          {editMode ? (
            <TextField
              fullWidth
              value={data.company_name}
              name="company_name"
              onChange={handleChange}
              sx={{ backgroundColor: colors.primary[300] }}
            />
          ) : (
            <Typography color={colors.grey[300]}>{data.company_name}</Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" color={colors.grey[100]}>
            Manufacturer ID:
          </Typography>
          {editMode ? (
            <TextField
              fullWidth
              value={data.manufacturer_id}
              name="manufacturer_id"
              onChange={handleChange}
              sx={{ backgroundColor: colors.primary[300] }}
            />
          ) : (
            <Typography color={colors.grey[300]}>
              {data.manufacturer_id}
            </Typography>
          )}
        </Grid>

        {/* Address Fields */}
        <Grid item xs={12}>
          <Typography variant="h6" color={colors.grey[100]}>
            Address:
          </Typography>
          {editMode ? (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Street"
                  value={data.address.street}
                  name="address.street"
                  onChange={handleChange}
                  sx={{ backgroundColor: colors.primary[300], mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  value={data.address.city}
                  name="address.city"
                  onChange={handleChange}
                  sx={{ backgroundColor: colors.primary[300] }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="State"
                  value={data.address.state}
                  name="address.state"
                  onChange={handleChange}
                  sx={{ backgroundColor: colors.primary[300] }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Postal Code"
                  value={data.address.postal_code}
                  name="address.postal_code"
                  onChange={handleChange}
                  sx={{ backgroundColor: colors.primary[300] }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Country"
                  value={data.address.country}
                  name="address.country"
                  onChange={handleChange}
                  sx={{ backgroundColor: colors.primary[300] }}
                />
              </Grid>
            </Grid>
          ) : (
            <Typography color={colors.grey[300]}>
              {`${data.address.street}, ${data.address.city}, ${data.address.state}, ${data.address.postal_code}, ${data.address.country}`}
            </Typography>
          )}
        </Grid>

        {/* Email and Phone */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" color={colors.grey[100]}>
            Email:
          </Typography>
          {editMode ? (
            <TextField
              fullWidth
              value={data.email}
              name="email"
              onChange={handleChange}
              sx={{ backgroundColor: colors.primary[300] }}
            />
          ) : (
            <Typography color={colors.grey[300]}>{data.email}</Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" color={colors.grey[100]}>
            Phone:
          </Typography>
          {editMode ? (
            <TextField
              fullWidth
              value={data.phone}
              name="phone"
              onChange={handleChange}
              sx={{ backgroundColor: colors.primary[300] }}
            />
          ) : (
            <Typography color={colors.grey[300]}>{data.phone}</Typography>
          )}
        </Grid>

        {/* Website and GST Number */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" color={colors.grey[100]}>
            Website:
          </Typography>
          {editMode ? (
            <TextField
              fullWidth
              value={data.website}
              name="website"
              onChange={handleChange}
              sx={{ backgroundColor: colors.primary[300] }}
            />
          ) : (
            <Typography color={colors.grey[300]}>{data.website}</Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" color={colors.grey[100]}>
            GST Number:
          </Typography>
          {editMode ? (
            <TextField
              fullWidth
              value={data.GST_No}
              name="GST_No"
              onChange={handleChange}
              sx={{ backgroundColor: colors.primary[300] }}
            />
          ) : (
            <Typography color={colors.grey[300]}>{data.GST_No}</Typography>
          )}
        </Grid>

        {/* Rating */}
        <Grid item xs={12}>
          <Typography variant="h6" color={colors.grey[100]}>
            Rating:
          </Typography>
          <Typography color={colors.grey[300]}>{data.rating}</Typography>
        </Grid>
      </Grid>

      {/* Edit/Submit Button */}
      <Box mt={2} textAlign="center">
        <Button
          variant="contained"
          color={editMode ? "success" : "secondary"}
          onClick={handleToggleEdit}
        >
          {editMode ? "Submit" : "Edit"}
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;

