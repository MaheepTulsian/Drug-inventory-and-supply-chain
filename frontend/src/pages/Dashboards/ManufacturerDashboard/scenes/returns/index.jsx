import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockReturnsData } from "../../../../../data/mockData";
import { tokens } from "../../../../../theme";
import { useNavigate } from "react-router-dom";
import Header from "../../../../../components/Header";

const Returns = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "Return ID", width: 100 },
    { field: "buyerName", headerName: "Buyer Name", flex: 1 },
    { field: "city", headerName: "Buyer City", flex: 1 },
    { field: "gstn", headerName: "Buyer GSTN", flex: 1 },
    { field: "returnReason", headerName: "Reason for Return", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header title="RETURNS" subtitle="Managing Return Requests" />
      <Box
        m="40px 0 0 0"
        height="75vh"
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
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockReturnsData}
          columns={columns}
          onRowClick={(params) => {
            navigate(`./${params.id}`);
          }}
        />
      </Box>
    </Box>
  );
};

export default Returns;
