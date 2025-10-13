import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  if (!user) {
    // ❌ Not logged in → go to login
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role?.toLowerCase();
  if (allowedRoles && !allowedRoles.includes(user.role.toLowerCase())) {
    // ❌ Wrong role → block access
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Authorized → render child component
  return children;
};

export default ProtectedRoute;
