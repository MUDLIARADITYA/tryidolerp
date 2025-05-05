import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserPlus,
  FaBell,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

const Usersidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar visibility on mobile
  const sidebarRef = useRef();

  const navItems = [
    { name: "All Notifications", icon: <FaTachometerAlt />, route: "/notifications" },
    { name: "Mark Attendance", icon: <FaUsers />, route: "/markattendance" },
    { name: "My Attendance", icon: <FaUserPlus />, route: "/myattendance" },
    { name: "Leave Status", icon: <FaBell />, route: "/leavestatus" },
  ];

  // Close sidebar on outside click (mobile only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <div
        className="md:hidden absolute top-4 left-4 cursor-pointer z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars className="text-2xl text-blue-600" />
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`h-screen fixed top-0 left-0 bg-white p-4 z-50 shadow-md transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-16"} md:w-64 md:block 
          ${isOpen ? "opacity-100" : "opacity-0 md:opacity-100"}
        `}
      >
        {/* Logo */}
        <div className="bg-blue-500 rounded-md p-3 mb-6 flex items-center justify-center h-16">
          <img src="img/logo.png" alt="Logo" className="max-h-full" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          {navItems.map(({ name, icon, route }) => (
            <Link
              to={route}
              key={name}
              className="flex items-center gap-3 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
            >
              <span className="text-lg">{icon}</span>
              <span
                className={`text-sm font-medium transition-all duration-200
                  ${isOpen ? "opacity-100" : "opacity-0 md:opacity-100"} 
                  ${isOpen ? "inline" : "absolute md:static"}
                `}
              >
                {name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-6">
          <button
            className="flex items-center gap-3 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 w-full transition"
            onClick={() => console.log("Logged out")}
          >
            <FaSignOutAlt className="text-lg" />
            <span
              className={`text-sm font-medium transition-all duration-200
                ${isOpen ? "opacity-100" : "opacity-0 md:opacity-100"} 
                ${isOpen ? "inline" : "absolute md:static"}
              `}
            >
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Usersidebar;
