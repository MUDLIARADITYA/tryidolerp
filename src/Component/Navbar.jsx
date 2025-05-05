import React from "react";
import { FaSearch, FaBell, FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className=" shadow h-16 flex items-center justify-between px-6 border-blue-600 fixed w-full bg-white z-40 pr-[5%] pl-[25%]">
      {/* Search */}
      <div className="flex items-center w-1/3">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search employees"
            className="w-full pl-10 pr-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Right-side */}
      <div className="flex items-center gap-4">
        <FaBell className="text-gray-600 text-lg" />
        <FaUser className="text-gray-600 text-lg" />
        <span className="text-gray-800 font-medium">John Doe ▾</span>
      </div>
    </header>
  );
};

export default Navbar;
