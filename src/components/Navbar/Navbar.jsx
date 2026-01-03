import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Logo/Logo";
import Container from "../Container/Container";
import {
  LayoutDashboard,
  MessageCirclePlus,
  Store,
  User,
  Wrench,
} from "lucide-react";
import useAuth from "../../hooks/useAuth/useAuth";

const Navbar = () => {
  const { user, userSignOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const getHTML = document.querySelector("html");
    getHTML.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = (
    <>
      <NavLink
        className="flex items-center text-black gap-2 px-3 py-2 rounded-md  transition"
        to="/services">
        <Wrench size={22} />
        Services
      </NavLink>

      <NavLink
        className="flex items-center gap-2 px-3 py-2 text-black rounded-md  transition"
        to="/add-services">
        <MessageCirclePlus size={22} />
        Create Service
      </NavLink>

      <NavLink
        className="flex items-center gap-2 px-3 py-2 text-black rounded-md  transition"
        to="/about-us">
        <Store size={22} />
        About us
      </NavLink>

      <NavLink
        className="flex items-center gap-2 px-3 text-black py-2 rounded-md  transition"
        to="/dashboard/my-bookings">
        <LayoutDashboard />
        Dashboard
      </NavLink>
    </>
  );

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const handleSignOut = () => {
    userSignOut()
      .then(() => {
        console.log("log out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className={`
        sticky w-full z-50 top-0 bg-gray-200 transition-all duration-500 
        ${
          scrolled
            ? `shadow-2xs py-3 translate-y-2 `
            : "py-4 translate-y-0 bg-transparent dark:bg-transparent"
        }
      `}>
      <Container>
        <div className="navbar flex flex-wrap items-center justify-between shadow-md rounded-xl  py-2">
          {/* START */}
          <div className="flex items-center gap-2">
            {/* Mobile menu */}
            <div className="dropdown md:hidden">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 space-y-2">
                {links}
              </ul>
            </div>

            {/* Logo */}
            <div className="flex items-center">
              <Logo />
            </div>

            <div>
              <input
                onChange={(e) => handleTheme(e.target.checked)}
                type="checkbox"
                defaultChecked={localStorage.getItem("theme") === "dark"}
                className="toggle"
              />
            </div>
          </div>

          {/* CENTER - Desktop Links */}
          <div className="hidden md:flex items-center gap-4">{links}</div>

          {/* END - Avatar */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar border border-gray-200">
              <div className="w-20 rounded-full">
                {user ? (
                  <img src={user?.photoURL} alt="user image" />
                ) : (
                  <p className="text-red-400">No User</p>
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 px-5 py-3 shadow bg-base-100 rounded-box w-40  flex justify-center items-center">
              <li>
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="btn btn-sm bg-red-600 text-white">
                    Sign out
                  </button>
                ) : (
                  <Link to={"/login"}>
                    <button className="btn btn-sm bg-primary text-white">
                      Sign in
                    </button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
