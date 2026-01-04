import { Link } from "react-router";
import { ShieldAlert } from "lucide-react";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <ShieldAlert size={80} className="text-red-500 mb-6" />

      <h1 className="text-5xl font-bold text-gray-800 mb-4">403</h1>

      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Access Forbidden
      </h2>

      <p className="text-gray-500 max-w-md mb-6">
        You don’t have permission to access this page. Please contact an
        administrator if you believe this is a mistake.
      </p>

      <Link
        to="/"
        className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
        Go Back Home
      </Link>
    </div>
  );
};

export default Forbidden;
