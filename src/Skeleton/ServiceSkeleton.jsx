import React from "react";

const ServiceSkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl border  p-3 space-y-3">
      {/* Image skeleton */}
      <div className="h-32 w-full rounded-lg bg-gray-300" />

      {/* Title */}
      <div className="h-4 w-3/4 rounded bg-gray-300" />

      {/* Price */}
      <div className="h-4 w-1/2 rounded bg-gray-300" />

      {/* Button */}
      <div className="h-8 w-full rounded bg-gray-300" />
    </div>
  );
};

export default ServiceSkeleton;
