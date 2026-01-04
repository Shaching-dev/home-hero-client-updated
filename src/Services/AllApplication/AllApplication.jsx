import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const AllApplication = () => {
  const axiosSecure = useAxiosSecure();

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-request");
      return res.data;
    },
  });

  const handleAction = async (id, action) => {
    try {
      await axiosSecure.patch(`/update-request/${id}`, { status: action });
      Swal.fire(
        "Success!",
        `Request has been ${action.toLowerCase()}.`,
        "success"
      );
      refetch();
    } catch (error) {
      Swal.fire("Error!", "Something went wrong.", "error");
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/all-request/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: " deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Total Applications: {applications.length}
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((app) => (
          <div
            key={app._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">{app.name}</h3>
            <p>
              <span className="font-semibold">Email:</span> {app.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {app.phone}
            </p>
            <p>
              <span className="font-semibold">Category:</span> {app.category}
            </p>
            <p className="mt-2">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`${
                  app.status === "pending"
                    ? "text-yellow-600"
                    : app.status === "accepted"
                    ? "text-green-600"
                    : "text-red-600"
                } font-semibold`}>
                {app.status}
              </span>
            </p>
            <div className="flex gap-5 items-center mt-3">
              <div>
                {app.status === "pending" && (
                  <div className=" flex gap-2">
                    <button
                      onClick={() => handleAction(app._id, "accepted")}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(app._id, "rejected")}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                      Reject
                    </button>
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => handleDelete(app._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllApplication;
