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

              <Route path="/distributor-dashboard" element={
                  <ProtectedRoute>
                    <DistributorDashboard />
                  </ProtectedRoute>
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
              </Route>

            </Routes>
          </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;