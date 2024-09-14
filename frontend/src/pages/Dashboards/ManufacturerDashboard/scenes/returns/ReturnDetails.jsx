// src/pages/ReturnDetails.js

import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { mockReturnsData } from "../../../../../data/mockData";
import { tokens } from "../../../../../theme";

const ReturnDetails = () => {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Find the return request by ID from mockReturnsData
  const returnRequest = mockReturnsData.find((request) => request.id === parseInt(id));

  return (
    <Box m="20px">
      <Typography variant="h4" color={colors.blueAccent[600]} gutterBottom>
        Return Details - ID: {id}
      </Typography>

      {returnRequest ? (
        <Box>
          {/* Buyer Info */}
          <Box mb="30px" p="20px" borderRadius="8px" bgcolor={colors.primary[400]} boxShadow={3}>
            <Typography variant="h6" color={colors.greenAccent[500]} mb="20px">
              Buyer Information
            </Typography>
            <Box display="flex" flexDirection="column" gap={2} mb="20px">
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Name:</strong> {returnRequest.buyerName}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Buyer ID:</strong> {returnRequest.buyerId}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>City:</strong> {returnRequest.city}
              </Typography>
              <Typography variant="body1">
                <strong>GSTN:</strong> {returnRequest.gstn}
              </Typography>
              <Typography variant="body1">
                <strong>Reason of Return:</strong> {returnRequest.returnReason}
              </Typography>
            </Box>
          </Box>

          {/* Medicines Returned */}
          <Typography variant="h6" color={colors.greenAccent[500]} mb="20px">
            Medicines Returned
          </Typography>
          <TableContainer component={Paper} sx={{ backgroundColor: colors.primary[400] }}>
            <Table aria-label="medicines returned table">
              <TableHead>
                <TableRow sx={{ backgroundColor: colors.blueAccent[600] }}>
                  <TableCell sx={{ color: colors.grey[100] }}>Medicine Name</TableCell>
                  <TableCell sx={{ color: colors.grey[100] }} align="right">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {returnRequest.medicines.map((medicine, index) => (
                  <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: colors.primary[600] } }}>
                    <TableCell component="th" scope="row" sx={{ color: colors.grey[100] }}>
                      {medicine.name}
                    </TableCell>
                    <TableCell align="right" sx={{ color: colors.grey[100] }}>
                      {medicine.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Approve Return Button */}
          <Box display="flex" justifyContent="center" mt="30px">
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: colors.greenAccent[600],
                color: colors.grey[100],
                padding: "10px 20px",
              }}
            >
              Approve Return
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography variant="body1" color={colors.redAccent[500]}>
          Return request not found
        </Typography>
      )}
    </Box>
  );
};

export default ReturnDetails;
