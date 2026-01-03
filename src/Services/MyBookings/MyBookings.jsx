import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  console.log(user.email);

  const {
    data: myBookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-bookings", user?.email],

    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user?.email}`);
      return res.data;
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/bookings/${id}`).then(() => {
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
    return <div className="text-center py-10">Loading your bookings...</div>;
  }

  if (myBookings.length === 0) {
    return <div className="text-center py-10">You have no bookings yet.</div>;
  }

  return (
    <div className="py-10 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        My Bookings ({myBookings.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myBookings.map((booking) => (
          <div
            key={booking._id}
            className="border rounded-lg shadow p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
            <img
              src={booking.serviceImage}
              alt={booking.serviceName}
              className="w-32 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{booking.serviceName}</h3>
              <p>
                <span className="font-semibold">Price:</span> $
                {booking.offeredPrice}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`${
                    booking.status === "pending"
                      ? "text-yellow-500"
                      : booking.status === "completed"
                      ? "text-green-500"
                      : "text-red-500"
                  } font-semibold`}>
                  {booking.status}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Booked at: {new Date(booking.bookedAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => handleCancel(booking._id)}
              className="btn btn-sm btn-error mt-2 md:mt-0">
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
