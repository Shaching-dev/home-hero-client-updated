import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { Link } from "react-router";
import { Eye, EyeClosed } from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const fileRef = useRef();

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\-=/\\]).{6,}$/;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-primary">Create an Account</h2>
          <p className="text-sm opacity-70 mt-1">
            Join <span className="font-semibold">StyleDecor</span> today
          </p>
        </div>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          <div className="flex flex-col items-center">
            {/* <div
              onClick={() => fileRef.current.click()}
              className="w-24 h-24 rounded-full border-2 border-dashed border-primary flex items-center justify-center cursor-pointer hover:bg-base-200 transition overflow-hidden">
              <img src={userImg} alt="Upload" className="w-10 opacity-70" />
            </div> */}

            <p className="text-xs mt-2 opacity-60">Upload profile photo</p>

            <input
              {...register("photo", { required: true })}
              type="file"
              className="hidden"
              ref={(e) => {
                fileRef.current = e;
                register("photo").ref(e);
              }}
            />

            {errors.photo && (
              <p className="text-error text-sm mt-1">
                Profile photo is required
              </p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Name</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Your full name"
              className="input input-bordered w-full focus:border-primary"
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">Name is required</p>
            )}
          </div>

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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-lg opacity-60 hover:opacity-100">
                {showPassword ? <EyeClosed /> : <Eye />}
              </button>
            </div>

            {errors.password && (
              <p className="text-error text-sm mt-1">
                Password must be strong & at least 6 characters
              </p>
            )}
          </div>

          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              state={location.state}
              className="text-primary font-semibold hover:underline">
              Login
            </Link>
          </p>

          {/* <button
            disabled={loading}
            className={`btn btn-primary w-full rounded-full text-base ${
              loading ? "loading" : ""
            }`}>
            {loading ? "Registering..." : "Register"}
          </button> */}
        </form>

        <div className="divider my-6">OR</div>
      </div>
    </div>
  );
};

export default Register;
