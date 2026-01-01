import { House } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className="flex items-center gap-2 text-primary">
        <House className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 font-bold" />
        <h3 className="sm:text-[10px]  md:text-2xl font-bold">Home hero</h3>
      </div>
    </Link>
  );
};

export default Logo;
