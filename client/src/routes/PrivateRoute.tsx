import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuth = localStorage.getItem("user");
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
