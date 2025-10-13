import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ViewDetails from "./pages/ViewDetails";
import Agents from "./pages/Agents";
import AddProperty from "./pages/AddProperty";
import Account from "./pages/Account";
import PropertyDetails from "./pages/PropertyDetails";
import Unauthorized from "./pages/Unauthorized"; // create this simple page

// ✅ Auth check
const getActiveUser = () => {
  return JSON.parse(localStorage.getItem("activeUser"));
};

const isAuthenticated = () => {
  const user = getActiveUser();
  const token = localStorage.getItem("activeToken");
  return !!(user && token);
};

// ✅ Role-based ProtectedRoute wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = getActiveUser();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role?.toLowerCase())) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      {/* 🌐 Public Routes */}
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 🧭 Protected Routes */}
      <Route
  path="/home"
  element={
    <ProtectedRoute allowedRoles={["user"]}>
      <Home />
    </ProtectedRoute>
  }
/>
      <Route
  path="/agent"
  element={
    <ProtectedRoute allowedRoles={["agent"]}>
      <Agents />
    </ProtectedRoute>
  }
/>

      <Route
        path="/add-property"
        element={
          <ProtectedRoute allowedRoles={["agent"]}>
            <AddProperty />
          </ProtectedRoute>
        }
      />

      <Route
        path="/account"
        element={
          <ProtectedRoute allowedRoles={["user", "agent"]}>
            <Account />
          </ProtectedRoute>
        }
      />

      <Route
        path="/viewdetails/:id"
        element={
          <ProtectedRoute allowedRoles={["user", "agent"]}>
            <ViewDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/property/:id"
        element={
          <ProtectedRoute allowedRoles={["agent"]}>
            <PropertyDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/property/:id/edit"
        element={
          <ProtectedRoute allowedRoles={["agent"]}>
            <PropertyDetails />
          </ProtectedRoute>
        }
      />

      {/* 🚫 Unauthorized Page */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* 🌍 Default Route */}
      <Route
        path="*"
        element={
          isAuthenticated() ? (
            <Navigate
              to={
                getActiveUser()?.role?.toLowerCase() === "agent"
                  ? "/agent"
                  : "/home"
              }
              replace
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  </BrowserRouter>
);
