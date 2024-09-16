import { Box } from "@mui/material";
import Header from "../../../../../components/Header";
import { LineChart } from "../../../../../charts/index.js";
import { mockLineData as data } from "../../../../../data/mockData";

const Line = () => {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChart data={data} />
      </Box>
    </Box>
  );
};

export default Line;
