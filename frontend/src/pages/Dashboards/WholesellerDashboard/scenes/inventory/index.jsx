import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockMedicineInventoryData } from "../../../../../data/mockData";
import { tokens } from "../../../../../theme";
import { useNavigate } from "react-router-dom";
import Header from "../../../../../components/Header";

const Inventory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const columns = [
    { field: "medicine_id", headerName: "Medicine ID", width: 150 },
    { field: "medicine_name", headerName: "Medicine Name", flex: 1 },
    { field: "quantity_available", headerName: "Total Quantity Available", width: 200 },
  ];

  // Transform the mock data to include total quantity
  const rows = mockMedicineInventoryData.map((medicine) => ({
    ...medicine,
    quantity_available: medicine.batches.reduce((acc, batch) => acc + batch.quantity, 0), // Sum of batch quantities
  }));

  return (
    <Box m="20px">
      <Header title="INVENTORY" subtitle="Manage Medicine Inventory" />
      <Box
        m="40px 0 20px 0"
        height="65vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.medicine_id}
          onRowClick={(params) => {
            navigate(`./${params.id}`); // Navigate to Batch Details page with medicine ID
          }}
        />
      </Box>
    </Box>
  );
};

export default Inventory;
