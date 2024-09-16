import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Paper,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useTheme,
    TextField,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { mockOrderHistoryData as dummyOrderData } from '../../../../../data/mockData';
import { tokens } from "../../../../../theme";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const steps = ['Pending', 'Approved', 'Return Raised', 'Return Approved'];

const OrderDetails = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const normalizedOrderId = orderId.trim().toUpperCase();
    const order = dummyOrderData.find(order => order.order_id.trim().toUpperCase() === normalizedOrderId);

    const currentStep = steps.indexOf(order.status);
    const activeStep = currentStep >= 0 ? currentStep : 0;

    // State for return functionality
    const [isReturning, setIsReturning] = useState(false);
    const [returnReason, setReturnReason] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Check if return is possible
    const approvalDate = new Date(order.date_of_approval);
    const today = new Date();
    const daysSinceApproval = Math.floor((today - approvalDate) / (1000 * 60 * 60 * 24));

    const handleReturn = () => {
        if (returnReason.trim()) {
            // Update order status and handle return logic
            order.status = 'Return Raised'; // Update the order status
            // Optionally: Save the return reason (e.g., in a database)
            console.log(`Return reason: ${returnReason}`);
            setIsReturning(false); // Hide the input after submission
            setReturnReason(''); // Reset the input
            setErrorMessage(''); // Clear any error messages
        } else {
            setErrorMessage('Please provide a return reason.');
        }
    };

    return (
        <Box m="20px">
            <Typography variant="h5" gutterBottom>Order Details - ID: {order.order_id}</Typography>

            <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 3 }}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel
                            StepIconComponent={(props) => {
                                const isCompleted = index <= activeStep;
                                return (
                                    <Box display="flex" alignItems="center">
                                        {isCompleted ? (
                                            <CheckCircleIcon sx={{ color: 'green', mr: 1 }} />
                                        ) : (
                                            <Box sx={{ width: 24, height: 24, borderRadius: '50%', border: '1px solid grey', mr: 1 }} />
                                        )}
                                        <Typography>{label}</Typography>
                                    </Box>
                                );
                            }}
                        />
                    </Step>
                ))}
            </Stepper>

            <Box
                mt="20px"
                p="24px"
                component={Paper}
                elevation={6}
                sx={{
                    backgroundColor: colors.primary[500],
                    borderRadius: '12px',
                }}
            >
                <Typography variant="h5" gutterBottom sx={{ color: colors.grey[100], fontWeight: 'bold' }}>
                    Order Information
                </Typography>
                <Divider sx={{ borderColor: colors.grey[700], mb: 2, borderWidth: 2 }} />
                <Typography variant="body1" sx={{ color: colors.grey[300], mb: 1 }}>
                    <strong>Status:</strong> <span style={{ color: colors.greenAccent[300] }}>{order.status}</span>
                </Typography>
                <Typography variant="body1" sx={{ color: colors.grey[300], mb: 1 }}>
                    <strong>Order Date:</strong> {new Date(order.date_of_order).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" sx={{ color: colors.grey[300], mb: 1 }}>
                    <strong>Approval Date:</strong> {new Date(order.date_of_approval).toLocaleDateString()}
                </Typography>
                <Divider sx={{ borderColor: colors.grey[700], my: 2, borderWidth: 2 }} />
            </Box>

            <Box
                mt="40px"
                component={Paper}
                elevation={3}
                sx={{
                    backgroundColor: colors.primary[400],
                    borderRadius: '10px',
                }}
            >
                <Typography variant="h5" gutterBottom sx={{ color: colors.grey[100], p: 2 }}>
                    Medicines Ordered
                </Typography>
                <Divider sx={{ borderColor: colors.grey[600], mb: 2 }} />

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: colors.grey[100] }}>Medicine ID</TableCell>
                                <TableCell sx={{ color: colors.grey[100] }}>Medicine Name</TableCell>
                                <TableCell sx={{ color: colors.grey[100] }}>Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {order.medicines.map(med => (
                                <TableRow key={med.medicine_id}>
                                    <TableCell sx={{ color: colors.grey[300] }}>{med.medicine_id}</TableCell>
                                    <TableCell sx={{ color: colors.grey[300] }}>{med.medicine_name}</TableCell>
                                    <TableCell sx={{ color: colors.grey[300] }}>{med.quantity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Return button logic */}
            {daysSinceApproval > 7 ? (
                <Typography sx={{ color: 'red', mt: 2 }}>
                    Return not possible, 7 days over
                </Typography>
            ) : (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={() => setIsReturning(!isReturning)}
                    >
                        {isReturning ? 'Cancel Return' : 'Return Order'}
                    </Button>
                    {isReturning && (
                        <Box mt={2}>
                            <TextField
                                label="Reason for Return"
                                variant="outlined"
                                fullWidth
                                value={returnReason}
                                onChange={(e) => setReturnReason(e.target.value)}
                                error={!!errorMessage}
                                helperText={errorMessage}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                                onClick={handleReturn}
                            >
                                Submit Return
                            </Button>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

export default OrderDetails;
