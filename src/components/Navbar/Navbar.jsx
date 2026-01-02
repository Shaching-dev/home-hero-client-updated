import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Logo/Logo";
import Container from "../Container/Container";
import {
  CalendarCheck2,
  ClipboardList,
  MessageCirclePlus,
  User,
  Wrench,
} from "lucide-react";
import useAuth from "../../hooks/useAuth/useAuth";

const Navbar = () => {
  const { user, userSignOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);

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
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition"
        to="/services">
        <Wrench size={22} />
        Services
      </NavLink>

      <NavLink
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition"
        to="/add-services">
        <MessageCirclePlus size={22} />
        Create Service
      </NavLink>

      <NavLink
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition"
        to="/my-bookings">
        <CalendarCheck2 size={22} />
        My Bookings
      </NavLink>

      <NavLink
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition"
        to="/my-services">
        <ClipboardList size={22} />
        My Services
      </NavLink>

      <NavLink
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition"
        to="/profile">
        <User size={22} />
        Profile
      </NavLink>
    </>
  );

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
        sticky w-full z-50 top-0 transition-all duration-500 
        ${
          scrolled
            ? "bg-gray-300 shadow-lg py-3 translate-y-2"
            : "bg-transparent py-4 translate-y-0"
        }
      `}>
      <Container>
        <div className="navbar flex flex-wrap items-center justify-between bg-white shadow-md rounded-xl  py-2">
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
              {/* <li>
                <a className="justify-between hover:bg-gray-100 rounded-md px-2 py-1">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a className="hover:bg-gray-100 rounded-md px-2 py-1">
                  Settings
                </a>
              </li> */}
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
