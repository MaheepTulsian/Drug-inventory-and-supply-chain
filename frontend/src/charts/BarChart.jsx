import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { mockBarData as data } from "../data/mockData";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveBar
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={["total_sales"]}
      indexBy="medicine_name"
      // margin={{ top: 10, right: 130, bottom: 70, left: 60 }}
      margin={ isDashboard ? { top: 40, right: 100, bottom: 40, left: 100 } : { top: 50, right: 150, bottom: 50, left: 150 } }
      padding={0.3}
      layout= {isDashboard ? "vertical" : "horizontal"} // Horizontal layout for dashboard
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={({ index }) => `hsl(${index * 30}, 50%, 65%)`} // Assign different color for each bar
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: isDashboard ? -20 : -35, // Rotate medicine names in dashboard
        // legend: isDashboard ? undefined : "Medicine Name", 
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // legend: isDashboard ? undefined : "Total Sales",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={true}
      label={(d) => `${d.value}`}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 7]],
      }}
      legends={ isDashboard ? [] : [
             {
               dataFrom: "indexes", // Display medicine names in legend
               anchor: "bottom-right",
               direction: "column",
               justify: false,
               translateX: 120,
               translateY: 0,
               itemsSpacing: 2,
               itemWidth: 100,
               itemHeight: 20,
               itemDirection: "left-to-right",
               itemOpacity: 0.85,
               symbolSize: 20,
               symbolShape: "circle", // Circle shape for each legend item
               effects: [
                 {
                   on: "hover",
                   style: {
                     itemOpacity: 1,
                   },
                 },
               ],
             },
      ] }
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in medicine: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
