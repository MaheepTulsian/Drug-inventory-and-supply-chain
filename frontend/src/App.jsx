import React, { useState } from 'react';
import Layout from './layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Auth from './pages/auth/Auth';
import NotFound from './pages/NotFound';
import ManufacturerDashboard from './pages/Dashboards/ManufacturerDashboard/ManufacturerDashboard';
import DistributorDashboard from './pages/Dashboards/WholesellerDashboard/DistributorDashboard';
import { Bar, Line, Pie, Dashboard, Profile, Orders, OrderDetails, Returns, ReturnDetails, Inventory, InventoryDetails, Sales, Form } from './pages/Dashboards/ManufacturerDashboard/index.js';
import { MapManufacturer, MapManufacturerDetails, OrderReturnStatus, OrderReturnStatusDetails } from './pages/Dashboards/WholesellerDashboard/index.js';
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

              <Route path="/dashboard" element={
                  // <ProtectedRoute>
                    <ManufacturerDashboard />
                  // </ProtectedRoute>
                }>
                <Route path="/dashboard/" element={<Dashboard />} />
                {/* <Route path="/dashboard/profile" element={<Profile />} /> */}
                <Route path="/dashboard/inventory" element={<Inventory />} />
                <Route path="/dashboard/inventory/:id" element={<InventoryDetails />} />
                <Route path="/dashboard/orders" element={<Orders />} />
                <Route path="/dashboard/orders/:id" element={<OrderDetails />} />
                <Route path="/dashboard/findothers" element={<MapManufacturer />} />
                <Route path="/dashboard/findothers/:id" element={<MapManufacturerDetails />} />
                {/* <Route path="/dashboard/returns" element={<Returns />} />
                <Route path="/dashboard/returns/:id" element={<ReturnDetails />} /> */}
                <Route path="/dashboard/sales" element={<Sales />} />
                <Route path="/dashboard/list-medicine" element={<Form />} />
                <Route path="/dashboard/bar" element={<Bar />} />
                <Route path="/dashboard/pie" element={<Pie />} />
                <Route path="/dashboard/line" element={<Line />} />
              </Route>

              {/* <Route path="/distributor-dashboard" element={
                  // <ProtectedRoute>
                    <DistributorDashboard />
                  // </ProtectedRoute>
                }>
                <Route path="/distributor-dashboard/" element={<Dashboard />} />
                <Route path="/distributor-dashboard/profile" element={<Profile />} />
                <Route path="/distributor-dashboard/createorder" element={<MapManufacturer />} />
                <Route path="/distributor-dashboard/createorder/:id" element={<MapManufacturerDetails />} />
                <Route path="/distributor-dashboard/inventory" element={<Inventory />} />
                <Route path="/distributor-dashboard/inventory/:id" element={<InventoryDetails />} />
                <Route path="/distributor-dashboard/order-return-status" element={<OrderReturnStatus />} />
                <Route path="/distributor-dashboard/order-return-status/:orderId" element={<OrderReturnStatusDetails />} />
                <Route path="/distributor-dashboard/orders" element={<Orders />} />
                <Route path="/distributor-dashboard/orders/:id" element={<OrderDetails />} />
                <Route path="/distributor-dashboard/returns" element={<Returns />} />
                <Route path="/distributor-dashboard/returns/:id" element={<ReturnDetails />} />
                <Route path="/distributor-dashboard/sales" element={<Sales />} />
                <Route path="/distributor-dashboard/bar" element={<Bar />} />
                <Route path="/distributor-dashboard/pie" element={<Pie />} />
                <Route path="/distributor-dashboard/line" element={<Line />} />
              </Route> */}

            </Routes>
          </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;