import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";

const MyRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosSecure.get("/my-request", {
          params: { email: user?.email },
        });
        setRequests(res.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchRequests();
    }
  }, [user?.email, axiosSecure]);

  // Cancel request
  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/my-request/${id}`);
        Swal.fire("Cancelled!", "Your request has been cancelled.", "success");
        setRequests(requests.filter((r) => r._id !== id));
      } catch (error) {
        console.log(error);

        Swal.fire("Error!", "Failed to cancel request.", "error");
      }
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!requests.length)
    return <div className="text-center mt-10">No requests found.</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">My Requests</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {requests.map((req) => (
          <div
            key={req._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">{req.name}</h3>
            <p>
              <span className="font-semibold">Email:</span> {req.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {req.phone}
            </p>
            <p>
              <span className="font-semibold">Category:</span> {req.category}
            </p>
            <p>
              <span className="font-semibold">Experience:</span>{" "}
              {req.experience} years
            </p>
            <p className="mt-2">{req.description}</p>
            <span
              className={`${
                req.status === "pending"
                  ? "text-yellow-600"
                  : req.status === "accepted"
                  ? "text-green-600"
                  : "text-red-600"
              } font-semibold`}>
              {req.status}
            </span>
            <div className="mt-4">
              <div>
                {req.status !== "cancelled" && (
                  <button
                    onClick={() => handleCancel(req._id)}
                    className="bg-red-500 text-white px-4 cursor-pointer py-2 rounded hover:bg-red-600 transition">
                    Cancel Request
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRequest;
