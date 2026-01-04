import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const BeProvider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const providerData = {
      name: data.name,
      email: user?.email,
      phone: data.phone,
      category: data.category,
      experience: data.experience,
      description: data.description,

      createdAt: new Date(),
    };

    const confirm = await Swal.fire({
      title: "Submit Provider Request?",
      text: "Your information will be reviewed by our team before approval.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.post("/providers", providerData);
      Swal.fire({
        title: "Request Submitted",
        text: "Your provider request is under review. Thank you for your patience.",
        icon: "success",
      });

      navigate("/dashboard/my-request");

      reset();
    } catch (err) {
      console.log(err);

      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-2">Become a Service Provider</h2>

      <p className="text-sm text-gray-600 mb-6">
        Share your skills with people who need them. Becoming a provider allows
        you to offer services, manage bookings, and grow through honest work.
        Every provider is reviewed carefully to ensure trust and quality for
        everyone.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm mb-1">Full Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full border px-3 py-2 rounded"
            placeholder="Your full name"
          />
          {errors.name && (
            <span className="text-xs text-red-500">Name is required</span>
          )}
        </div>

        {/* Email (readonly) */}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm mb-1">Phone Number</label>
          <input
            type="text"
            {...register("phone", { required: true })}
            className="w-full border px-3 py-2 rounded"
            placeholder="01XXXXXXXXX"
          />
          {errors.phone && (
            <span className="text-xs text-red-500">
              Phone number is required
            </span>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm mb-1">Service Category</label>
          <select
            {...register("category", { required: true })}
            className="w-full border bg-gray-400 text-white px-3 py-2 rounded">
            <option disabled value="">
              Select a category
            </option>
            <option value="Electrical">Electrical</option>
            <option value="Plumber">Plumber</option>
            <option value="Cleaner">Cleaner</option>
            <option value="Design">Design</option>
            <option value="Gardening">Gardening</option>
            <option value="Painting">Painting</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && (
            <span className="text-xs text-red-500">Category is required</span>
          )}
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm mb-1">Experience</label>
          <input
            type="text"
            {...register("experience", { required: true })}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. 2 years"
          />
          {errors.experience && (
            <span className="text-xs text-red-500">Experience is required</span>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm mb-1">Short Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full border px-3 py-2 rounded"
            rows="4"
            placeholder="Briefly describe your skills and services"
          />
          {errors.description && (
            <span className="text-xs text-red-500">
              Description is required
            </span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full border py-2 rounded font-mediu bg-primary text-white cursor-pointer">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default BeProvider;
