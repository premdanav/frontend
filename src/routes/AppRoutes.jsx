import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SignUp from "../components/SignUp";
import AdminDashboard from "../components/admin/AdminDashboard";
import UserDashboard from "../components/user/UserDashboard";
import SignIn from "../components/SignIn";
import AddUser from "../components/admin/AddUser";
import { useSelector } from "react-redux";
import PageNotFound from "../components/PageNotFound";

const AdminRoute = ({ element, path }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userRole = useSelector((state) => state.user.role);

  return isAuthenticated && userRole === "admin" ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: path }} />
  );
};

const UserRoute = ({ element, path }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userRole = useSelector((state) => state.user.role);

  return isAuthenticated && userRole === "user" ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: path }} />
  );
};

const AuthRoute = ({ element, path }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userRole = useSelector((state) => state.user.role);

  return isAuthenticated ? (
    userRole === "admin" ? (
      <Navigate to="/admin-dashboard" replace />
    ) : (
      <Navigate to="/user-dashboard" replace />
    )
  ) : (
    element
  );
};

function AppRoutes() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<AuthRoute element={<SignUp />} />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" replace /> : <SignIn />}
          />
          <Route
            path="/admin-dashboard"
            element={<AdminRoute element={<AdminDashboard />} />}
          />
          <Route
            path="/user-dashboard"
            element={<UserRoute element={<UserDashboard />} />}
          />
          <Route
            path="/adduser"
            element={<AdminRoute element={<AddUser />} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default AppRoutes;
