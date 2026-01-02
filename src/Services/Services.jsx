import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Link } from "react-router";
import Container from "../components/Container/Container";
import ServiceSkeleton from "../Skeleton/ServiceSkeleton";

const Services = () => {
  const axiosSecure = useAxiosSecure();
  const [showSkeleton, setShowSkeleton] = useState(true);
  const {
    data: services = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = axiosSecure.get("/services");
      return (await res).data;
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // 🔄 Loading State
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // ❌ Error State
  if (isError) {
    return <p className="text-red-500 text-center">{error.message}</p>;
  }

  return (
    <div>
      <Container>
        <section className="my-10">
          <div>
            <h3 className="text-3xl font-bold mb-4 text-center">
              Popular Services
            </h3>
          </div>

          {showSkeleton ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {Array.from({ length: 10 }).map((_, index) => (
                <ServiceSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {services.map((service) => (
                <div
                  key={service._id}
                  // Added 'flex flex-col' to the main card container
                  className="rounded-xl border p-3 flex flex-col h-full">
                  <img
                    src={service.imageUrl}
                    alt={service.serviceName}
                    className="h-30 w-full object-cover rounded-lg"
                  />

                  {/* This wrapper now grows to fill space, pushing the button down */}
                  <div className="flex flex-col flex-grow justify-center items-center text-center">
                    <h4 className="font-semibold mt-2">
                      {service.serviceName}
                    </h4>
                    <p className="text-primary font-bold">${service.price}</p>
                  </div>

                  {/* mt-auto ensures this stays at the very bottom */}
                  <Link
                    className="w-full btn btn-sm btn-primary mt-auto"
                    to={`/services/${service._id}`}>
                    See Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </Container>
    </div>
  );
};

export default Services;
