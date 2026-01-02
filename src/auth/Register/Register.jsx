import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { Eye, EyeClosed } from "lucide-react";
import axios from "axios";
import { HashLoader } from "react-spinners";

import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth/useAuth";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\-=/\\]).{6,}$/;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const photoFile = watch("profilePhoto");

  /* ---------- Image Preview ---------- */
  useEffect(() => {
    if (photoFile && photoFile[0]) {
      const url = URL.createObjectURL(photoFile[0]);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [photoFile]);

  /* ---------- Register Handler ---------- */
  const handleRegister = (data) => {
    setBtnLoading(true);

    const imageFile = data.profilePhoto[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    const imageAPI = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_api_key
    }`;

    registerUser(data.email, data.password)
      .then(() => axios.post(imageAPI, formData))
      .then((res) => {
        const photoURL = res.data.data.url;
        return updateUserProfile({
          displayName: data.name,
          photoURL,
        });
      })

      .then(() => {
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.error("Registration Error:", error);
      })
      .finally(() => {
        setBtnLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Fullscreen Loader */}
      {btnLoading && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="flex items-center">
            <span className="text-3xl text-primary font-bold">Loading...</span>
            <HashLoader size={70} color="#3b82f6" />
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-primary">Create an Account</h2>
          <p className="text-sm opacity-70">
            Join <span className="font-semibold">StyleDecor</span> today
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleRegister)}
          className={`space-y-4 ${
            btnLoading ? "opacity-60 pointer-events-none" : ""
          }`}>
          {/* Profile Photo */}
          <div className="flex flex-col items-center">
            <label className="cursor-pointer">
              <div className="w-32 h-32 rounded-full bg-gray-200 border overflow-hidden flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-gray-500">Select Photo</span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                {...register("profilePhoto", { required: true })}
                className="hidden"
              />
            </label>
            {errors.profilePhoto && (
              <p className="text-error text-sm mt-1">Photo is required</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="label-text font-medium">Name</label>
            <input
              {...register("name", { required: true })}
              className="input input-bordered w-full"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-error text-sm">Name is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label-text font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-error text-sm">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label-text font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  pattern: passwordPattern,
                })}
                className="input input-bordered w-full pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60">
                {showPassword ? <EyeClosed /> : <Eye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-error text-sm">Strong password required</p>
            )}
          </div>

          {/* Login Link */}
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              state={location.state}
              className="text-primary font-semibold">
              Login
            </Link>
          </p>

          {/* Submit */}

          <button className="btn btn-primary w-full">Register</button>
        </form>

        <div className="divider my-6">OR</div>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
