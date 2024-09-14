import React, { useState } from "react";
import { Box, Grid, TextField, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../../../../theme"; // Assuming you have the tokens set up for the theme

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

  // Toggle edit mode and handle submit
  const handleToggleEdit = () => {
    if (editMode) {
      // You can add form submission logic here
    }
    setEditMode(!editMode);
  };

  // Handle changes in text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address")) {
      const addressField = name.split(".")[1];
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
          src="../../assets/Logo.png"
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
            <Typography color={colors.grey[300]}>
              {data.company_name}
            </Typography>
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

        <Grid item xs={12}>
          <Typography variant="h6" color={colors.grey[100]}>
            Address:
          </Typography>
          {editMode ? (
            <>
                <Grid container spacing={2}>
                {/* Street Field */}
                <Grid item xs={12}>
                    <TextField
                    fullWidth
                    label="Street"
                    value={data.address.street}
                    name="address.street"
                    onChange={handleChange}
                    sx={{ backgroundColor: colors.primary[300], mb: 2 }} // Added margin-bottom
                    />
                </Grid>
            
                {/* City and State Fields */}
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
            
                {/* Postal Code and Country Fields */}
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
            </>          
          ) : (
            <Typography color={colors.grey[300]}>
              {`${data.address.street}, ${data.address.city}, ${data.address.state}, ${data.address.postal_code}, ${data.address.country}`}
            </Typography>
          )}
        </Grid>

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
          color={editMode ? "success" : "secondary" }
          onClick={handleToggleEdit}
        >
          {editMode ? "Submit" : "Edit"}
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
