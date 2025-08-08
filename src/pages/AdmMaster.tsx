import React from "react";
import { Navigate } from "react-router-dom";
import LoginPage from "./Login";

const AdminMasterPage: React.FC = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    return <Navigate to="/AdmMaster/inquiries/list" replace />;
  }
  return <LoginPage />;
};

export default AdminMasterPage;
