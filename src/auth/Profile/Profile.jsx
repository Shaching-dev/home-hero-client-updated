import React from "react";

import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/useAuth/useAuth";

const Profile = () => {
  const { user, userSignOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return <div className="text-center p-10">Loading Profile...</div>;

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to sign out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        userSignOut();
        navigate("/login");
      }
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6  rounded-2xl shadow-xl border border-gray-100">
      <div className="flex flex-col items-center">
        <div className="avatar mb-4">
          <div className="w-24 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
            <img src={profile.photoURL} alt="Profile" />
          </div>
        </div>

        <h2 className="text-2xl font-bold">{profile?.displayName}</h2>

        <div className="mt-4 w-full space-y-3">
          <div className="flex justify-between p-2  rounded-lg">
            <span className=" font-medium">Email:</span>
            <span className="">{profile?.email}</span>
          </div>

          <div className="flex justify-between p-2 rounded-lg">
            <span className=" font-medium">Role:</span>
            <span className="badge badge-secondary uppercase">
              {profile?.role}
            </span>
          </div>

          <div className="flex justify-between p-2  rounded-lg">
            <span className=" font-medium">Joined:</span>
            <span className="">
              {new Date(profile.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-center">
            <button onClick={handleLogout} className="btn btn-primary">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
