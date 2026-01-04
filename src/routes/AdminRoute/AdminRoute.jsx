import React from "react";
import useAuth from "../../hooks/useAuth/useAuth";
import useRole from "../../hooks/useRole/useRole";
import Forbidden from "../Forbidden/Forbidden";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, isLoading } = useRole();

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  if (role !== "admin") {
    return <Forbidden />;
  }

  return children;
};

export default AdminRoute;
