// import React, { useState } from 'react';
// import Layout from './layout';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import NotFound from './pages/NotFound';
// import Auth from './pages/auth/Auth';
// import ManufacturerDashboard from './pages/Dashboards/ManufacturerDashboard/ManufacturerDashboard';
// import { Bar, Line, Pie, Topbar, Sidebar, Dashboard, Profile, Orders, OrderDetails, Returns, ReturnDetails, Inventory, InventoryDetails, Sales, Form } from './pages/Dashboards/ManufacturerDashboard/index.js';
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { ColorModeContext, useMode } from "./theme";
// import { Outlet } from 'react-router-dom';

// const DashboardLayout = ({ isSidebar, setIsSidebar }) => (
//   <>
//     <Sidebar isSidebar={isSidebar} />
//     <main className="content">
//       <Topbar setIsSidebar={setIsSidebar} />
//       <Outlet /> {/* Renders the child routes */}
//     </main>
//   </>
// );

// const App = () => {
//   const [theme, colorMode] = useMode();
//   const [isSidebar, setIsSidebar] = useState(true);

//   return (
//     <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />

//         <Router>
//           {/* Non-dashboard routes */}
//           <Routes>
//             <Route path="/" element={<Layout />} />
//             <Route path="*" element={<NotFound />} />
//             <Route path="/auth" element={<Auth />} />
//           </Routes>

//           {/* Dashboard routes inside the app div */}
//           <div className='app'>
//             <Routes>
//               {/* Main dashboard layout */}
//               <Route path="/manufacturer-dashboard" element={
//                 <DashboardLayout isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
//               }>
//                 {/* This route renders the Dashboard component when accessing /manufacturer-dashboard */}
//                 <Route index element={<Dashboard />} />

//                 {/* Sub-routes */}
//                 <Route path="profile" element={<Profile />} />
//                 <Route path="inventory" element={<Inventory />} />
//                 <Route path="inventory/:id" element={<InventoryDetails />} />
//                 <Route path="orders" element={<Orders />} />
//                 <Route path="orders/:id" element={<OrderDetails />} />
//                 <Route path="returns" element={<Returns />} />
//                 <Route path="returns/:id" element={<ReturnDetails />} />
//                 <Route path="sales" element={<Sales />} />
//                 <Route path="list-medicine" element={<Form />} />
//                 <Route path="bar" element={<Bar />} />
//                 <Route path="pie" element={<Pie />} />
//                 <Route path="line" element={<Line />} />
//               </Route>
//             </Routes>
//           </div>
//         </Router>
        
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//   );
// };

// export default App;



import React, { useState } from 'react';
import Layout from './layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Auth from './pages/auth/Auth';
import NotFound from './pages/NotFound';
import ManufacturerDashboard from './pages/Dashboards/ManufacturerDashboard/ManufacturerDashboard';
import { Bar, Line, Pie, Dashboard, Profile, Orders, OrderDetails, Returns, ReturnDetails, Inventory, InventoryDetails, Sales, Form } from './pages/Dashboards/ManufacturerDashboard/index.js';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Router>
            <Routes>
              <Route path="/" element={<Layout />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/auth" element={<Auth />} />

              <Route path="/manufacturer-dashboard" element={
                  <ProtectedRoute>
                    <ManufacturerDashboard />
                  </ProtectedRoute>
                }>
                <Route path="/manufacturer-dashboard/" element={<Dashboard />} />
                <Route path="/manufacturer-dashboard/profile" element={<Profile />} />
                <Route path="/manufacturer-dashboard/inventory" element={<Inventory />} />
                <Route path="/manufacturer-dashboard/inventory/:id" element={<InventoryDetails />} />
                <Route path="/manufacturer-dashboard/orders" element={<Orders />} />
                <Route path="/manufacturer-dashboard/orders/:id" element={<OrderDetails />} />
                <Route path="/manufacturer-dashboard/returns" element={<Returns />} />
                <Route path="/manufacturer-dashboard/returns/:id" element={<ReturnDetails />} />
                <Route path="/manufacturer-dashboard/sales" element={<Sales />} />
                <Route path="/manufacturer-dashboard/list-medicine" element={<Form />} />
                <Route path="/manufacturer-dashboard/bar" element={<Bar />} />
                <Route path="/manufacturer-dashboard/pie" element={<Pie />} />
                <Route path="/manufacturer-dashboard/line" element={<Line />} />
              </Route>
            </Routes>
          </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;