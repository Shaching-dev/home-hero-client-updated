import React from "react";
import { Outlet } from "react-router";
import Container from "../../components/Container/Container";
import Logo from "../../components/Logo/Logo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <Container>
        <div className="py-5">
          <Logo />
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          {/* LEFT CONTENT */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <h3 className="text-2xl md:text-4xl font-bold text-slate-800">
              Welcome to <span className="text-primary">Home Hero</span>
            </h3>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-md mx-auto md:mx-0">
              Home Hero connects you with trusted professionals for all your
              household needs — from cleaning and repairs to maintenance and
              emergency services. Reliable help, right when you need it.
            </p>
          </div>

          {/* RIGHT CONTENT (AUTH FORM) */}
          <div className="flex-1 max-w-md">
            <Outlet />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AuthLayout;
