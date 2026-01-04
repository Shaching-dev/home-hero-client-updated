import React, { useEffect, useState } from "react";
import { FaHistory, FaHome } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { NavLink, Outlet } from "react-router";

import { CgProfile } from "react-icons/cg";
import { AiFillCheckCircle } from "react-icons/ai";
import { FiTrendingUp } from "react-icons/fi";
import { MdPayment, MdPayments, MdRequestQuote } from "react-icons/md";
import Container from "../../components/Container/Container";
import { ClipboardList, ShieldUser } from "lucide-react";
import useRole from "../../hooks/useRole/useRole";

const DashboardLayout = () => {
  const { role } = useRole();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    const getHTML = document.querySelector("html");
    getHTML.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  console.log(role);

  return (
    <Container>
      <div className="min-h-screen  w-full">
        <div className="drawer lg:drawer-open">
          <input
            id="dashboard-drawer"
            type="checkbox"
            className="drawer-toggle"
          />

          <div className="drawer-content flex flex-col">
            <nav className="navbar  px-4 shadow-sm sticky top-0 z-40 w-full">
              <div className="flex-1 flex items-center">
                <label
                  htmlFor="dashboard-drawer"
                  className="btn btn-square btn-ghost lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </label>
                <span className="text-xl font-bold ml-2">Dashboard</span>
                <div className="mx-auto flex items-center">
                  <h3 className="text-3xl font-bold">Change Theme</h3>
                  <input
                    onChange={(e) => handleTheme(e.target.checked)}
                    type="checkbox"
                    defaultChecked={localStorage.getItem("theme") === "dark"}
                    className="toggle"
                  />
                </div>
              </div>
            </nav>

            <main className="flex-1 p-4 lg:p-8">
              <Outlet />
            </main>
          </div>

          <div className="drawer-side z-50">
            <label
              htmlFor="dashboard-drawer"
              className="drawer-overlay"
              aria-label="close sidebar"></label>

            <aside className="bg-base-200 w-64 min-h-screen p-4 flex flex-col">
              <div className="text-lg font-semibold mb-6 mt-2 px-2">
                Dashboard Menu
              </div>

              <ul className="menu flex-1 gap-2 p-0">
                <li>
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-100 text-blue-700 font-semibold"
                          : "hover:bg-gray-700 hover:text-white"
                      }`
                    }>
                    <FaHome size={20} />
                    <span>Home</span>
                  </NavLink>
                </li>

                <>
                  <li>
                    <NavLink
                      to="/dashboard/my-bookings"
                      className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          isActive
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : "hover:bg-gray-700 hover:text-white"
                        }`
                      }>
                      <TbBrandBooking size={20} />
                      <span>My Bookings</span>
                    </NavLink>
                  </li>
                </>

                <>
                  <li>
                    <NavLink
                      to="/dashboard/my-services"
                      className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          isActive
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : "hover:bg-gray-700 hover:text-white"
                        }`
                      }>
                      <FaHistory size={20} />
                      <span>My Services</span>
                    </NavLink>
                  </li>
                </>

                <>
                  <li>
                    <NavLink
                      to="/dashboard/my-request"
                      className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          isActive
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : "hover:bg-gray-700 hover:text-white"
                        }`
                      }>
                      <ClipboardList />
                      <span>My Request</span>
                    </NavLink>
                  </li>
                </>

                {role === "admin" && (
                  <>
                    <li>
                      <NavLink
                        to="/dashboard/all-applications"
                        className={({ isActive }) =>
                          `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                            isActive
                              ? "bg-blue-100 text-blue-700 font-semibold"
                              : "hover:bg-gray-700 hover:text-white"
                          }`
                        }>
                        <MdRequestQuote size={22} />
                        <span>All Applications</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/users-management"
                        className={({ isActive }) =>
                          `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                            isActive
                              ? "bg-blue-100 text-blue-700 font-semibold"
                              : "hover:bg-gray-700 hover:text-white"
                          }`
                        }>
                        <ShieldUser size={22} />

                        <span>Users Management</span>
                      </NavLink>
                    </li>
                  </>
                )}

                <li>
                  <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-100 text-blue-700 font-semibold"
                          : "hover:bg-gray-700 hover:text-white"
                      }`
                    }>
                    <CgProfile size={20} />
                    <span>Profile</span>
                  </NavLink>
                </li>

                <>
                  <li></li>

                  <li></li>

                  <li></li>

                  <li></li>

                  <li></li>
                </>

                {/* Decorator Links */}

                <>
                  <li></li>

                  <li></li>

                  <li></li>
                </>
              </ul>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-gray-300">
                <div className="text-sm text-gray-500 text-center">
                  © 2025 Your Company
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DashboardLayout;
