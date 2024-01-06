import React from "react";
import HomePage from "./components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/admin/Login";
import Dashboard from "./components/admin/Dashboard";
import Register from "./components/admin/Register";
import Navbar from "./components/Navbar";
import UserLogin from "./components/user/UserLogin";
import UserDashboard from "./components/user/UserDashboard";
import UserRegister from "./components/user/UserRegister";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin-login" element={<Login />} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/admin-register" element={<Register />} />

          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/user-register" element={<UserRegister />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
