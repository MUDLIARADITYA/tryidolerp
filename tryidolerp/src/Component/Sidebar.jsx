// import React, { useState, useRef, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   FaTachometerAlt,
//   FaUsers,
//   FaUserPlus,
//   FaBell,
//   FaCalendarAlt,
//   FaSignOutAlt,
//   FaBars,
// } from "react-icons/fa";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const sidebarRef = useRef();
//   const location = useLocation();
//   const navigate = useNavigate(); // Initialize the useNavigate hook

//   const navItems = [
//     { name: "Dashboard", icon: <FaTachometerAlt />, route: "/dashboard" },
//     { name: "Attendance", icon: <FaUsers />, route: "/allattendance" },
//     { name: "Employee", icon: <FaUserPlus />, route: "/reg" },
//     // { name: "Download", icon: <FaDownload />, route: "/download" },
//     { name: "Alerts", icon: <FaBell />, route: "/notifications" },
//     { name: "Leaves", icon: <FaCalendarAlt />, route: "/employeeleaves" },
//   ];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen]);

//   const handleLogout = () => {
//     // Add any logout logic here (e.g., clear user data or tokens)
//     localStorage.removeItem("token");
//     navigate("/"); // Navigate to the root route after logout
//   };

//   return (
//     <>
//       {/* Hamburger for Mobile */}
//       <div
//         className="md:hidden absolute top-4 left-4 cursor-pointer z-50"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <FaBars className="text-2xl text-[#05445e]" />
//       </div>

//       {/* Sidebar */}
//       <div
//         ref={sidebarRef}
//         className={`h-screen fixed top-0 left-0 bg-[#ffffff] p-4 z-50 transition-all duration-300 ease-in-out
//         ${isOpen ? "w-64" : "w-64"} md:w-64 md:block`}
//       >
//         {/* Logo */}
//         <div className="rounded-md p-3 mb-6 flex items-center justify-center h-16">
//           <img src="img/logo.png" alt="Logo" className="max-h-full" />
//         </div>

//         {/* Navigation */}
//         <nav className="flex flex-col gap-3 text-black">
//           {navItems.map(({ name, icon, route }) => {
//             const isActive = location.pathname === route;
//             return (
//               <Link
//                 to={route}
//                 key={name}
//                 className={`flex items-center gap-3 px-4 py-2 rounded-md transition 
//                   ${isActive ? "bg-[#189ab4]" : ""}`}
//               >
//                 <span className="text-lg">{icon}</span>
//                 <span className="text-sm font-medium">{name}</span>
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Logout */}
//         <div className="mt-6">
//           <button
//             className="flex items-center gap-3 px-4 py-2 rounded-md bg-red-600 text-white w-full transition"
//             onClick={handleLogout} // Call handleLogout function on click
//           >
//             <FaSignOutAlt className="text-lg" />
//             <span className="text-sm font-medium">Logout</span>
//           </button>
//         </div>
//       </div>

//       {/* Overlay for Mobile */}
//       {isOpen && (
//         <div
//           className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20"
//           onClick={() => setIsOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default Sidebar;


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
  FaTimes,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, route: "/dashboard" },
    { name: "Attendance", icon: <FaUsers />, route: "/allattendance" },
    { name: "Employee", icon: <FaUserPlus />, route: "/reg" },
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
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {/* Hamburger Icon (Mobile) */}
      <div
        className="md:hidden fixed top-4 left-4 z-50 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <FaBars className="text-2xl text-[#05445e]" />
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"} md:translate-x-0 md:w-64`}
      >
        {/* Close Button (Mobile) */}
        <div className="flex justify-end md:hidden p-4">
          <button onClick={() => setIsOpen(false)} className="text-[#05445e]">
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Logo */}
        <div className="rounded-md p-3 mb-6 flex items-center justify-center h-16">
          <img src="img/logo.png" alt="Logo" className="max-h-full" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 text-black px-2">
          {navItems.map(({ name, icon, route }) => {
            const isActive = location.pathname === route;
            return (
              <Link
                to={route}
                key={name}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition
                  ${isActive ? "bg-[#189ab4] text-white" : "hover:bg-gray-200"}`}
              >
                <span className="text-lg">{icon}</span>
                <span className="text-sm font-medium">{name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="mt-6 px-2">
          <button
            className="flex items-center gap-3 px-4 py-2 rounded-md bg-red-600 text-white w-full transition"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="text-lg" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;