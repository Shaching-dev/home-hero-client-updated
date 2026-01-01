import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Link } from "react-router";
import { Eye, EyeClosed, HousePlug } from "lucide-react";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth/useAuth";

const Login = () => {
  const { signInUserWithEmail } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\-=/\\]).{6,}$/;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    // console.log(data);
    signInUserWithEmail(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-base-100 rounded-2xl p-8">
        <div className="text-center mb-6">
          <div className="flex justify-center">
            <HousePlug size={80} className="text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-primary">Welcome Back</h2>
          {/* <p className="text-sm opacity-70 mt-1">
            Join <span className="font-semibold">StyleDecor</span> today
          </p> */}
        </div>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
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
                className="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 text-lg opacity-60 hover:opacity-100">
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
            New to our Platform?{" "}
            <Link
              to="/register"
              state={location.state}
              className="text-primary font-semibold hover:underline">
              Register
            </Link>
          </p>

          <button className="btn btn-primary w-full">Login</button>
        </form>

        <div className="divider my-6">OR</div>

        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
