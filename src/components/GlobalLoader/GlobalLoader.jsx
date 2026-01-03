import React from "react";
import useLoading from "../../useLoading/useLoading/useLoading";

const GlobalLoader = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <span className="loading loading-spinner loading-lg text-white"></span>
    </div>
  );
};

export default GlobalLoader;
