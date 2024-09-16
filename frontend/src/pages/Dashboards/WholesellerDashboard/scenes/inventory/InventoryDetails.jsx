import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { mockMedicineInventoryData } from "../../../../../data/mockData"; // Import the nested mock data
import { tokens } from "../../../../../theme";
import { useState } from "react";
import AddBatchForm from "./AddBatchForm"; // Import AddBatchForm component

const BatchDetails = () => {
  const { id } = useParams(); // 'id' is the medicine_id
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Find the selected medicine by its ID
  const medicine = mockMedicineInventoryData.find((med) => med.medicine_id === id);
  const [showForm, setShowForm] = useState(false); // Control form visibility

  return (
    <Box m="20px">
      <Typography variant="h4" color={colors.blueAccent[600]} gutterBottom>
        Batch Details for {medicine?.medicine_name} (Medicine ID: {id})
      </Typography>

      {/* Table of Batches */}
      {medicine && medicine.batches.length > 0 ? (
        <TableContainer component={Paper} sx={{ backgroundColor: colors.primary[400] }}>
          <Table aria-label="batch details table">
            <TableHead>
              <TableRow sx={{ backgroundColor: colors.blueAccent[600] }}>
                <TableCell sx={{ color: colors.grey[100] }}>Batch ID</TableCell>
                <TableCell sx={{ color: colors.grey[100] }}>Manufacture Date</TableCell>
                <TableCell sx={{ color: colors.grey[100] }}>Expiry Date</TableCell>
                <TableCell sx={{ color: colors.grey[100] }} align="right">Quantity</TableCell>
                <TableCell sx={{ color: colors.grey[100] }} align="right">Current Stock</TableCell>
                <TableCell sx={{ color: colors.grey[100] }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicine.batches.map((batch) => (
                <TableRow key={batch.batch_id}>
                  <TableCell component="th" scope="row" sx={{ color: colors.grey[100] }}>
                    {batch.batch_id}
                  </TableCell>
                  <TableCell sx={{ color: colors.grey[100] }}>
                    {new Date(batch.manufacture_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ color: colors.grey[100] }}>
                    {new Date(batch.expiry_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right" sx={{ color: colors.grey[100] }}>
                    {batch.quantity}
                  </TableCell>
                  <TableCell align="right" sx={{ color: colors.grey[100] }}>
                    {batch.current_stock}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => alert(`Batch ${batch.batch_id} discontinued!`)}
                    >
                      Discontinue
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" color={colors.redAccent[500]}>
          No batches found for this medicine.
        </Typography>
      )}

      {/* Button to Show/Hide Add Batch Form */}
      <Button
        variant="contained"
        onClick={() => setShowForm(!showForm)}
        sx={{
          backgroundColor: colors.greenAccent[600],
          color: colors.grey[100],
          padding: "10px 20px",
          mt: "20px",
        }}
      >
        {showForm ? "Cancel" : "Add New Batch"}
      </Button>

      {/* Add Batch Form */}
      {showForm && (
        <Box mt="20px">
          <AddBatchForm medicineId={id} onClose={() => setShowForm(false)} />
        </Box>
      )}
    </Box>
  );
};

export default BatchDetails;
