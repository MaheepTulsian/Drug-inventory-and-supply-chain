import React, { useState } from "react";
import { Box, Typography, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from "@mui/material";
import { tokens } from "../../../../../theme";
import CallReceivedTwoToneIcon from '@mui/icons-material/CallReceivedTwoTone';
import CallMissedOutgoingTwoToneIcon from '@mui/icons-material/CallMissedOutgoingTwoTone';
import { LineChart, PieChart, BarChart } from "../../../../../charts/index.js";
import StatBox from "../../../../../components/StatBox";
import DateTime from "../DateTime";
import { mockLineOneWeekData, mockLineOneMonthData, mockLineOneQuarterData, mockMedicineData, mockExpiryMedicineData } from "../../../../../data/mockData";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [timeRange, setTimeRange] = useState("Past Week");
  const [data, setData] = useState(mockLineOneWeekData); // Default data for Past Week

  // Function to handle the dropdown change
  const handleTimeRangeChange = (e) => {
    const selectedRange = e.target.value;
    setTimeRange(selectedRange);

    // Update data based on selected time range
    switch (selectedRange) {
      case "Past Month":
        setData(mockLineOneMonthData);
        break;
      case "Past Quarter":
        setData(mockLineOneQuarterData);
        break;
      default:
        setData(mockLineOneWeekData);
        break;
    }
  };

  return (
    <Box m="20px">

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <DateTime />
        </Box>

        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="43"
            subtitle="New Orders Received"
            progress="0.50"
            increase="+21%"
            icon={
              <CallReceivedTwoToneIcon
                sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12"
            subtitle="New Returns Received"
            progress="0.30"
            increase="-5%"
            icon={
              <CallMissedOutgoingTwoToneIcon
                sx={{ color: colors.greenAccent[600], fontSize: "36px" }}
              />
            }
          />
        </Box>


        {/* ROW 2 */}
        <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                Revenue Generated
              </Typography>
            </Box>
            <Box>
              <Select
                labelId="time-range-label"
                id="time-range"
                value={timeRange}
                onChange={handleTimeRangeChange}
                label="Time Range"
                sx={{ color: colors.greenAccent[500], borderColor: colors.greenAccent[500] }}
              >
                <MenuItem value="Past Week">Past Week</MenuItem>
                <MenuItem value="Past Month">Past Month</MenuItem>
                <MenuItem value="Past Quarter">Past Quarter</MenuItem>
              </Select>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} data={data} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                Inventory
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <PieChart isDashboard={true} data={mockMedicineData} />
          </Box>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box mt="25px" mb="15px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                Approaching Expiry
              </Typography>
            </Box>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Medicine Name</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Batch</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Expiry Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockExpiryMedicineData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.medicineName}</TableCell>
                  <TableCell>{item.batch}</TableCell>
                  <TableCell>{item.expiryDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                Top Selling Medicines
              </Typography>
            </Box>
          </Box>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
