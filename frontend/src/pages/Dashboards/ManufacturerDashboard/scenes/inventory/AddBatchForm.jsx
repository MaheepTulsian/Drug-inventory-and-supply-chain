import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { tokens } from "../../../../../theme";

const AddBatchForm = ({ medicineId, onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [batchData, setBatchData] = useState({
    batch_id: "",
    manufacture_date: "",
    expiry_date: "",
    quantity: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New batch for medicine", medicineId, batchData);
    onClose(); // Close the form after submission
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBatchData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box>
      <Typography variant="h6" mb="20px" color={colors.greenAccent[500]}>
        Add New Batch for Medicine ID: {medicineId}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Batch ID"
          name="batch_id"
          value={batchData.batch_id}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Manufacture Date"
          name="manufacture_date"
          type="date"
          value={batchData.manufacture_date}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Expiry Date"
          name="expiry_date"
          type="date"
          value={batchData.expiry_date}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          value={batchData.quantity}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AddBatchForm;
