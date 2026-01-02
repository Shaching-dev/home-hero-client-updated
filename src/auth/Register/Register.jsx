import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router";
import { Drama, Eye, EyeClosed } from "lucide-react";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth/useAuth";
import axios from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\-=/\\]).{6,}$/;

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  // Profile photo preview
  const [preview, setPreview] = useState(null);
  const file = watch("profilePhoto");

  useEffect(() => {
    if (file && file[0]) {
      const objectUrl = URL.createObjectURL(file[0]);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  const handleRegister = (data) => {
    const profileImg = data.profilePhoto[0];

    // const payload = {
    //   ...data,
    //   imageName: profileImg.name,
    // };

    // console.log(payload);

    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        const formData = new FormData();
        formData.append("image", profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_api_key
        }`;
        axios.post(image_API_URL, formData).then((res) => {
          // console.log("after image upload", res.data.data.url);
          const photoURL = res.data.data.url;
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          // update user profile

          updateUserProfile(userProfile)
            .then(() => {
              console.log("updated");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center px-4 py-10 min-h-screen">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-primary">Create an Account</h2>
          <p className="text-sm opacity-70 mt-1">
            Join <span className="font-semibold">StyleDecor</span> today
          </p>
        </div>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          {/* Profile Photo */}
          <div className="flex flex-col items-center">
            <label className="cursor-pointer">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border border-gray-300">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">Select Photo</span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                {...register("profilePhoto")}
                className="hidden"
              />
            </label>

            {errors.profilePhoto && (
              <p className="text-error text-sm mt-1">Photo is required</p>
            )}
          </div>

          {/* name  */}

          <div>
            <label className="label">
              <span className="label-text font-medium">Name</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="@shaching...."
              className="input input-bordered w-full focus:border-primary"
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">Name is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full focus:border-primary"
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <input
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: passwordPattern,
                })}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="input input-bordered w-full pr-12 focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 text-lg opacity-60 hover:opacity-100">
                {showPassword ? <EyeClosed /> : <Eye />}
              </button>
            </div>
            {errors.password?.type === "required" && (
              <p className="text-error text-sm mt-1">Password is required</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-error text-sm mt-1">
                Password must be at least 6 characters, contain uppercase,
                lowercase, number, and a special character
              </p>
            )}
          </div>

          {/* Login Link */}
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              state={location.state}
              className="text-primary font-semibold hover:underline">
              Login
            </Link>
          </p>

          {/* Register Button */}
          <button className="btn btn-primary w-full">Register</button>
        </form>

        {/* Social Login */}
        <div className="divider my-6">OR</div>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
