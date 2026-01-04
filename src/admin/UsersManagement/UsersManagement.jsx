import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { FaUserMinus, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    const roleInfo = { role: "admin" };
    Swal.fire({
      title: "Approve as Admin?",
      text: "This user will get admin access.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a", // green
      cancelButtonColor: "#6b7280", // gray
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`users/${user._id}`, roleInfo).then((res) => {
          if (res.data.modifiedCount) {
            Swal.fire({
              title: "Approved!",
              text: `${user?.displayName} been promoted to admin.`,
              icon: "success",
              confirmButtonColor: "#16a34a",
            });
            refetch();
          }
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    const roleInfo = { role: "user" };

    Swal.fire({
      title: "Remove as Admin?",
      text: "This user will get remove admin access.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a", // green
      cancelButtonColor: "#6b7280", // gray
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`users/${user._id}`, roleInfo).then((res) => {
          if (res.data.modifiedCount) {
            Swal.fire({
              title: "Removed!",
              text: `${user?.displayName} been removed from admin access.`,
              icon: "success",
              confirmButtonColor: "#16a34a",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div>
      <h3>User management {users.length} </h3>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {users.map((user, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={user?.photoURL} alt="users" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user?.displayName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user?.email}</td>
                  <td>{user?.role}</td>
                  <th className="space-x-4">
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRemoveAdmin(user)}
                        className="btn btn-sm bg-red-400">
                        <FaUserMinus />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-sm bg-green-600">
                        <FaUserShield />
                      </button>
                    )}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
