import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import Container from "../../components/Container/Container";
import ServiceDetailsSkeleton from "../../Skeleton/ServiceDetailsSkeleton";

const ServiceDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [showSkeleton, setShowSkeleton] = useState(true);
  const {
    data: service,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["service-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/services/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner message="Loading service details..." />;
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500 font-semibold">
        ❌ Failed to load service details. Please try again.
      </div>
    );
  }

  const handleServiceBook = (id) => {
    console.log("bboked", id);
  };

  return (
    <div className=" py-10 min-h-screen">
      <Container>
        {/* Changed max-w-md to max-w-3xl for a better balance */}

        {showSkeleton ? (
          <div className="grid grid-cols-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <ServiceDetailsSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto  rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Image Section - Takes 40% width on desktop */}
              <div className="w-full md:w-2/5 h-64 md:h-auto">
                <img
                  src={service.imageUrl}
                  alt={service.serviceName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Section - Takes 60% width on desktop */}
              <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-primary/10 text-primary">
                      {service.category}
                    </span>
                    <div className="text-2xl font-bold text-primary">
                      ${service.price}
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold  mb-3">
                    {service.serviceName}
                  </h2>

                  <p className=" leading-relaxed text-sm md:text-base mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2 border-t pt-4">
                    <div className="flex items-center text-sm">
                      <span className=" w-20">Provider:</span>
                      <span className="font-semibold ">
                        {service.providerName}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className=" w-20">Email:</span>
                      <span className="font-semibold ">{service.email}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-8">
                  <button
                    onClick={() => handleServiceBook(service._id)}
                    className="btn btn-primary w-full md:w-auto px-12 rounded-xl shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105 active:scale-95">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="max-w-3xl mx-auto mt-12 text-center text-gray-400 text-sm">
          More details or reviews could go here...
        </div>
      </Container>
    </div>
  );
};

export default ServiceDetails;
