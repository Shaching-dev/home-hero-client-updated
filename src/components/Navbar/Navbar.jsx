import React from "react";
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

const Navbar = () => {
  const links = (
    <>
      <div>
        <NavLink className="flex items-center" to="/services">
          <Wrench size={25} />
          Services
        </NavLink>
      </div>
      <div>
        <NavLink className={`flex items-center`} to="/add-services">
          <MessageCirclePlus size={25} />
          Create Service
        </NavLink>
      </div>
      <div>
        <NavLink className={`flex items-center`} to="/my-bookings">
          <CalendarCheck2 size={25} />
          My Bookings
        </NavLink>
      </div>
      <div>
        <NavLink className={`flex items-center`} to="/my-services">
          <ClipboardList size={25} />
          My Services
        </NavLink>
      </div>

      <div>
        <NavLink className={`flex items-center`} to="/profile">
          <User size={25} />
          Profile
        </NavLink>
      </div>
    </>
  );

  return (
    <div className="bg-stone-200 py-5">
      <Container>
        <div className="navbar shadow-sm bg-white shadow-2xl rounded-2xl px-4">
          {/* START */}
          <div className="navbar-start gap-2">
            {/* Mobile menu */}
            <div className="dropdown md:hidden">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content gap-5 mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                {links}
              </ul>
            </div>

            {/* Logo (always here) */}
            <Logo />
          </div>

          {/* CENTER (Desktop only) */}
          <div className="navbar-center hidden md:flex gap-3">{links}</div>

          {/* END */}
          <div className="navbar-end gap-2">
            <Link to={"/login"}>
              <button className="btn btn-primary btn-sm">Sign in</button>
            </Link>
            <Link to={"/register"}>
              <button className="btn btn-outline btn-sm">Sign out</button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
