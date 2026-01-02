import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import ServiceSkeleton from "../../Skeleton/ServiceSkeleton";
import Container from "../../components/Container/Container";
import { Link } from "react-router";

const PopularServices = () => {
  const axiosSecure = useAxiosSecure();
  const [showSkeleton, setShowSkeleton] = useState(true);

  const { data: services = [] } = useQuery({
    queryKey: ["popular-services"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services?popular=true&limit=10");
      return res.data;
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Container>
        <section className="my-10">
          <h3 className="text-3xl font-bold mb-4 text-center">
            Popular Services
          </h3>

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
                  className="rounded-xl border p-3  flex flex-col h-full">
                  <img
                    src={service.imageUrl}
                    alt={service.serviceName}
                    className="h-30 w-full object-cover rounded-lg"
                  />

                  <div className="flex flex-col flex-grow justify-center items-center text-center">
                    <h4 className="font-semibold ">{service.serviceName}</h4>
                    <p className="text-primary font-bold ">${service.price}</p>
                  </div>

                  <Link
                    className="w-full btn btn-sm btn-primary mt-auto"
                    to={`/services/${service._id}`}>
                    See Details
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="text-center my-5 ">
            <Link to={"/services"}>
              <button className="btn btn-sm btn-secondary hover:bg-amber-600 duration-500 hover:outline-amber-400">
                See more..
              </button>
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default PopularServices;
