import React from "react";
import useAuth from "../../hooks/useAuth/useAuth";
import useRole from "../../hooks/useRole/useRole";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import Forbidden from "../../routes/Forbidden/Forbidden";

const ProviderRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, isLoading } = useRole();

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  if (role !== "provider") {
    return <Forbidden />;
  }

  return children;
};

export default ProviderRoute;
