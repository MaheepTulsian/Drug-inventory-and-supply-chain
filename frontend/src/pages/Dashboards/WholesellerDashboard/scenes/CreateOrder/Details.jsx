import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { tokens } from "../../../../../theme";
import { Box, Button, Paper, Typography, useTheme, Divider } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { mockMapManufacturerData as dummyData } from '../../../../../data/mockData';
import Header from "../../../../../components/Header";

const PageComponent = () => {
    const { id } = useParams(); // Get the dynamic id from the URL
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const [manufacturer, setManufacturer] = useState(null);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const foundManufacturer = dummyData.features.find(
            (feature) => feature.properties.id === id
        );
        if (foundManufacturer) {
            setManufacturer(foundManufacturer.properties);
        }
    }, [id]);

    const handleQuantityChange = (medicineId, change) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [medicineId]: Math.max(0, (prevQuantities[medicineId] || 0) + change),
        }));
    };

    const handleQuantityInput = (medicineId, value) => {
        // Convert the input value to an integer or default to 0
        const quantity = value ? parseInt(value, 10) : 0; // Handle empty input
        setQuantities((prev) => ({
            ...prev,
            [medicineId]: quantity,
        }));
    };
      

    const handlePlaceOrder = () => {
        // Find the manufacturer feature using the provided ID (id should be obtained from params)
        const manufacturerFeature = dummyData.features.find(feature => feature.properties.id === id);
        
        if (!manufacturerFeature || !manufacturerFeature.properties.medicines) {
            console.error("Medicines data is not available for the specified manufacturer");
            return; // Exit the function if medicines data is not available
        }
    
        const order = Object.keys(quantities).map((medicineId) => {
            // Find the medicine in the manufacturer's medicines
            const medicine = manufacturerFeature.properties.medicines.find(med => med.medicine_id === medicineId);
    
            return {
                medicineId,
                medicineName: medicine ? medicine.medicine_name : "Unknown", // Add the medicine name
                quantity: quantities[medicineId],
            };
        });
    
        console.log("Order placed:", order);
    };
        
    

    if (!manufacturer) {
        return <div>Loading...</div>;
    }

    const columns = [
        { field: 'medicine_id', headerName: 'Medicine ID', flex: 1 },
        { field: 'medicine_name', headerName: 'Medicine Name', flex: 1 },
        {
            field: 'quantity',
            headerName: 'Quantity',
            // width: 200,
            flex: 1,
            renderCell: (params) => (
                <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 1 }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleQuantityChange(params.row.medicine_id, -1)}
                    >
                        -
                    </Button>
                    <input
                        type="number"
                        value={quantities[params.row.medicine_id] || 0}
                        onChange={(e) => handleQuantityInput(params.row.medicine_id, e.target.value)}
                        style={{
                            width: '60px',
                            textAlign: 'center',
                            margin: '0 16px',
                            padding: '5px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            backgroundColor: 'white',
                            color: 'black',
                        }}
                    />
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleQuantityChange(params.row.medicine_id, 1)}
                    >
                        +
                    </Button>
                </Box>
            ),
        },
    ];

    const rows = manufacturer.medicines.map((medicine, index) => ({
        id: index, 
        medicine_id: medicine.medicine_id,
        medicine_name: medicine.medicine_name,
    }));

    return (
        <Box m="20px">
            <Header title="Manufacturer Details" subtitle={`Details for Point ID: ${id}`} />
            
            {/* Manufacturer Info Section */}
            <Box
                mt="20px"
                p="20px"
                component={Paper}
                elevation={3}
                sx={{
                    backgroundColor: colors.primary[400],
                    borderRadius: '10px',
                }}
            >
                <Typography variant="h5" gutterBottom sx={{ color: colors.grey[100] }}>
                    Manufacturer Information
                </Typography>
                <Divider sx={{ borderColor: colors.grey[600], mb: 2 }} />

                {/* Box Layout for Manufacturer Details */}
                <Box
                    display="flex"
                    flexDirection={{ xs: 'column', sm: 'row' }} // Stacks items in a column on small screens and in a row on larger screens
                    flexWrap="wrap" // Allows wrapping of items to the next line if necessary
                    spacing={2} // You can control spacing using margin or padding
                >
                    <Box flex="1 1 45%" m={1}> {/* Adjust width and margin for spacing */}
                        <Typography variant="body1" sx={{ color: colors.grey[300] }}>
                            <strong>Company Name:</strong> {manufacturer.company_name}
                        </Typography>
                    </Box>
                    <Box flex="1 1 45%" m={1}>
                        <Typography variant="body1" sx={{ color: colors.grey[300] }}>
                            <strong>Company ID:</strong> {manufacturer.id}
                        </Typography>
                    </Box>
                    <Box flex="1 1 45%" m={1}>
                        <Typography variant="body1" sx={{ color: colors.grey[300] }}>
                            <strong>GST Number:</strong> {manufacturer.GST_No}
                        </Typography>
                    </Box>
                    <Box flex="1 1 45%" m={1}>
                        <Typography variant="body1" sx={{ color: colors.grey[300] }}>
                            <strong>City:</strong> {manufacturer.city}
                        </Typography>
                    </Box>
                    <Box flex="1 1 45%" m={1}>
                        <Typography variant="body1" sx={{ color: colors.grey[300] }}>
                            <strong>Postal Code:</strong> {manufacturer.postal_code}
                        </Typography>
                    </Box>
                    <Box flex="1 1 45%" m={1}>
                        <Typography variant="body1" sx={{ color: colors.grey[300] }}>
                            <strong>State:</strong> {manufacturer.state}
                        </Typography>
                    </Box>
                </Box>

            </Box>

            {/* Stock Details Section */}
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                        color: colors.grey[300],  // Text color for the cells
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],  // Column header text color
                        fontWeight: "bold",       // Bold header for better readability
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],  // Footer text color
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-columnSeparator": {
                        display: "none",  // Remove vertical separators between columns for a cleaner look
                    },
                    "& .MuiDataGrid-row:hover": {
                        backgroundColor: colors.primary[300],  // Highlight row on hover for interactivity
                    },
                }}
            >

                <Typography variant="h5" gutterBottom sx={{ color: colors.grey[100] }}>
                    Stock Details
                </Typography>
                <Divider sx={{ borderColor: colors.grey[600], mb: 2 }} />
                
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    autoHeight
                    getRowId={(row) => row.id}
                />
                
                <Button
                    variant="contained"
                    onClick={handlePlaceOrder}
                    sx={{ mt: 2, color:colors.grey[900], backgroundColor: colors.greenAccent[200] , fontWeight: "bold" }}
                >
                    Place Order
                </Button>
            </Box>
        </Box>
    );
};

export default PageComponent;
