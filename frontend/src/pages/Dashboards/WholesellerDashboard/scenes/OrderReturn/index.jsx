import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { mockOrderHistoryData as dummyOrderData } from '../../../../../data/mockData';
import { tokens } from "../../../../../theme";

const OrderStatus = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();  // Create navigate instance

    const handleRowClick = (orderId) => {
        navigate(`./${orderId}`);  // Navigate to details page with order ID
    };

    return (
        <Box p={3}>
            <Typography variant="h5" gutterBottom>Order and Return Status</Typography>

            {/* Order Table */}
            <TableContainer component={Paper} sx={{ backgroundColor: colors.primary[400] }} >
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: colors.blueAccent[600] }} >
                            <TableCell sx={{ color: colors.grey[100] }}>Order ID</TableCell>
                            <TableCell sx={{ color: colors.grey[100] }}>Date of Order</TableCell>
                            <TableCell sx={{ color: colors.grey[100] }}>Date of Approval</TableCell>
                            <TableCell sx={{ color: colors.grey[100] }}>Medicines</TableCell>
                            <TableCell sx={{ color: colors.grey[100] }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dummyOrderData.map((order) => (
                            <TableRow key={order.order_id} onClick={() => handleRowClick(order.order_id)} sx={{ '&:nth-of-type(odd)': { backgroundColor: colors.primary[600] }, cursor: 'pointer' }} >
                                <TableCell sx={{ color: colors.grey[100] }}>{order.order_id}</TableCell>
                                <TableCell sx={{ color: colors.grey[100] }}>{order.date_of_order}</TableCell>
                                <TableCell sx={{ color: colors.grey[100] }}>{order.date_of_approval}</TableCell>
                                <TableCell sx={{ color: colors.grey[100] }}>
                                    {order.medicines.map(med => med.medicine_name).join(', ')}
                                </TableCell>
                                <TableCell sx={{ color: colors.grey[100] }}>{order.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default OrderStatus;
