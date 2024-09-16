import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../../../theme";
import { mockDataSalesHistory } from "../../../../../data/mockData"; // You'll need to update the mock data accordingly
import Header from "../../../../../components/Header";
import { useTheme } from "@mui/material";

const SalesHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "saleId", headerName: "Sale ID", flex: 0.5 },
    { field: "medicineName", headerName: "Medicine Name", flex: 1 },
    { field: "batch", headerName: "Batch", flex: 1 },
    { field: "quantity", headerName: "Qty", type: "number", headerAlign: "left", align: "left" },
    { field: "price", headerName: "Price", type: "number", flex: 0.7, headerAlign: "left", align: "left" },
    { field: "buyerName", headerName: "Buyer Name", flex: 1 },
    { field: "buyerId", headerName: "Buyer ID", flex: 1 },
    { field: "buyerCity", headerName: "Buyer City", flex: 1 },
    { field: "buyerPhone", headerName: "Buyer Phone No.", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header title="SALES HISTORY" subtitle="List of Sales Transactions for Future Reference" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `${colors.grey[100]} !important` },
        }}
      >
        <DataGrid
          rows={mockDataSalesHistory}
          columns={columns}
          getRowId={(row) => row.saleId} // Specify that saleId should be used as the unique identifier
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default SalesHistory;
