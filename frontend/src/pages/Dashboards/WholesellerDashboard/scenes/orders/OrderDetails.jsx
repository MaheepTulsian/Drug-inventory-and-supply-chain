import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { mockOrderData } from "../../../../../data/mockData";
import { tokens } from "../../../../../theme";

const OrderDetails = () => {
    const { id } = useParams();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Find the order by ID from mockOrderData
    const order = mockOrderData.find((order) => order.id === parseInt(id));

    return (
        <Box m="20px">
            <Typography variant="h4" color={colors.blueAccent[600]} gutterBottom>
                Order Details - ID: {id}
            </Typography>

            {order ? (
                <Box>
                    {/* Buyer Info */}
                    <Box mb="30px" p="20px" borderRadius="8px" bgcolor={colors.primary[400]} boxShadow={3}>
                        <Typography variant="h6" color={colors.greenAccent[500]} mb="20px">
                            Buyer Information
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={2} mb="20px">
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Name:</strong> {order.buyerName}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Buyer ID:</strong> {order.buyerId}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>City:</strong> {order.city}
                            </Typography>
                            <Typography variant="body1">
                                <strong>GSTN:</strong> {order.gstn}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Medicines Ordered */}
                    <Typography variant="h6" color={colors.greenAccent[500]} mb="20px">
                        Medicines Requested
                    </Typography>
                    <TableContainer component={Paper} sx={{ backgroundColor: colors.primary[400] }}>
                        <Table aria-label="medicines requested table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: colors.blueAccent[600] }}>
                                    <TableCell sx={{ color: colors.grey[100] }}>Medicine Name</TableCell>
                                    <TableCell sx={{ color: colors.grey[100] }} align="right">Quantity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order.medicines.map((medicine, index) => (
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

                    {/* Approve Order Button */}
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
                            Approve Order
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Typography variant="body1" color={colors.redAccent[500]}>
                    Order not found
                </Typography>
            )}
        </Box>
    );
};

export default OrderDetails;
