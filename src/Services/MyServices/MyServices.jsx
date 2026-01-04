import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";

const MyServices = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // console.log(user.email);

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-services", user?.email],

    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(`/my-services?email=${user?.email}`);
      return res.data;
    },
  });

  const myServices = data || [];
  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/my-services/${id}`).then(() => {
          Swal.fire(
            "Cancelled!",
            "Your booking has been cancelled.",
            "success"
          );
          refetch();
        });
      }
    });
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading your services...</div>;
  }

  if (myServices.length === 0) {
    return <div className="text-center py-10">You have no services yet.</div>;
  }

  return (
    <div className="py-10 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        My Services ({myServices.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myServices.map((service) => (
          <div
            key={service._id}
            className="border rounded-lg shadow p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
            <img
              src={service.imageUrl}
              alt={service.serviceName}
              className="w-32 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{service.serviceName}</h3>
              <p>
                <span className="font-semibold">Price:</span> ${service.price}
              </p>
              <p>Category: {service.category} </p>
            </div>
            <button
              onClick={() => handleCancel(service._id)}
              className="btn btn-sm btn-error mt-2 md:mt-0">
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyServices;
