import React from "react";
import useAuth from "../../hooks/useAuth/useAuth";
import { Navigate, useLocation } from "react-router";
import { RotateLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Loading state with RotateLoader
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <RotateLoader color="#6366F1" size={30} />
      </div>
    );
  }

  if (!user) {
    return <Navigate state={location?.pathname} to={"/login"}></Navigate>;
  }

  return children;
};

export default PrivateRoute;
