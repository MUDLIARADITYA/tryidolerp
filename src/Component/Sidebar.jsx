import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserPlus,
  FaBell,
  FaCalendarAlt,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef();
  const location = useLocation();
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const navItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, route: "/dashboard" },
    { name: "Attendance", icon: <FaUsers />, route: "/allattendance" },
    { name: "Employee", icon: <FaUserPlus />, route: "/reg" },
    // { name: "Download", icon: <FaDownload />, route: "/download" },
    { name: "Alerts", icon: <FaBell />, route: "/notifications" },
    { name: "Leaves", icon: <FaCalendarAlt />, route: "/employeeleaves" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleLogout = () => {
    // Add any logout logic here (e.g., clear user data or tokens)
    localStorage.removeItem("token");
    navigate("/"); // Navigate to the root route after logout
  };

  return (
    <>
      {/* Hamburger for Mobile */}
      <div
        className="md:hidden absolute top-4 left-4 cursor-pointer z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars className="text-2xl text-[#05445e]" />
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`h-screen fixed top-0 left-0 bg-[#ffffff] p-4 z-50 transition-all duration-300 ease-in-out
        ${isOpen ? "w-64" : "w-64"} md:w-64 md:block`}
      >
        {/* Logo */}
        <div className="rounded-md p-3 mb-6 flex items-center justify-center h-16">
          <img src="img/logo.png" alt="Logo" className="max-h-full" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 text-black">
          {navItems.map(({ name, icon, route }) => {
            const isActive = location.pathname === route;
            return (
              <Link
                to={route}
                key={name}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition 
                  ${isActive ? "bg-[#189ab4]" : ""}`}
              >
                <span className="text-lg">{icon}</span>
                <span className="text-sm font-medium">{name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="mt-6">
          <button
            className="flex items-center gap-3 px-4 py-2 rounded-md bg-red-600 text-white w-full transition"
            onClick={handleLogout} // Call handleLogout function on click
          >
            <FaSignOutAlt className="text-lg" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
      
    </>
  );
};

export default Sidebar;
