import { useState } from "react";
// import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Profile from "./scenes/profile";
import Orders from "./scenes/orders";
import OrderDetails from "./scenes/orders/OrderDetails";
import Returns from "./scenes/returns";
import ReturnDetails from "./scenes/returns/ReturnDetails";
import Inventory from "./scenes/inventory";
import InventoryDetails from "./scenes/inventory/InventoryDetails";
import Contacts from "./scenes/sales";
import Form from "./scenes/form";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";

function ManufacturerDashboard() {
    const [isSidebar, setIsSidebar] = useState(true);

    return (
        <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Outlet />
                {/* <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/inventory/:id" element={<InventoryDetails />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/orders/:id" element={<OrderDetails />} />
                    <Route path="/returns" element={<Returns />} />
                    <Route path="/returns/:id" element={<ReturnDetails />} />
                    <Route path="/sales" element={<Contacts />} />
                    <Route path="/list-medicine" element={<Form />} />
                    <Route path="/bar" element={<Bar />} />
                    <Route path="/pie" element={<Pie />} />
                    <Route path="/line" element={<Line />} />
                </Routes> */}
            </main>
        </div>
    );
}

export default ManufacturerDashboard;