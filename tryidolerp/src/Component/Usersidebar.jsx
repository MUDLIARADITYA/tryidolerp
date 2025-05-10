// import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaTachometerAlt,
//   FaUsers,
//   FaUserPlus,
//   FaBell,
//   FaSignOutAlt,
//   FaBars,
// } from "react-icons/fa";

// const Usersidebar = () => {
//   const [isOpen, setIsOpen] = useState(false); // Sidebar visibility on mobile
//   const sidebarRef = useRef();

//   const navItems = [
//     { name: "All Notifications", icon: <FaTachometerAlt />, route: "/user" },
//     { name: "Mark Attendance", icon: <FaUsers />, route: "/userattendance" },
//     { name: "My Attendance", icon: <FaUserPlus />, route: "/myattendance" },
//     { name: "Leave Status", icon: <FaBell />, route: "/leave" },
//   ];

//   // Close sidebar on outside click (mobile only)
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         isOpen &&
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen]);

//   return (
//     <>
//       {/* Hamburger Icon for Mobile */}
//       <div
//         className="md:hidden absolute top-4 left-4 cursor-pointer z-50"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <FaBars className="text-2xl text-blue-600" />
//       </div>

//       {/* Sidebar */}
//       <div
//         ref={sidebarRef}
//         className={`h-screen fixed top-0 left-0 bg-white p-4 z-50 shadow-md transition-all duration-300 ease-in-out
//           ${isOpen ? "w-64" : "w-16"} md:w-64 md:block 
//           ${isOpen ? "opacity-100" : "opacity-0 md:opacity-100"}
//         `}
//       >
//         {/* Logo */}
//         <div className="bg-blue-500 rounded-md p-3 mb-6 flex items-center justify-center h-16">
//           <img src="img/logo.png" alt="Logo" className="max-h-full" />
//         </div>

//         {/* Navigation */}
//         <nav className="flex flex-col gap-3">
//           {navItems.map(({ name, icon, route }) => (
//             <Link
//               to={route}
//               key={name}
//               className="flex items-center gap-3 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
//             >
//               <span className="text-lg">{icon}</span>
//               <span
//                 className={`text-sm font-medium transition-all duration-200
//                   ${isOpen ? "opacity-100" : "opacity-0 md:opacity-100"} 
//                   ${isOpen ? "inline" : "absolute md:static"}
//                 `}
//               >
//                 {name}
//               </span>
//             </Link>
//           ))}
//         </nav>

//         {/* Logout */}
//         <div className="mt-6">
//           <button
//             className="flex items-center gap-3 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 w-full transition"
//             onClick={() => console.log("Logged out")}
//           >
//             <FaSignOutAlt className="text-lg" />
//             <span
//               className={`text-sm font-medium transition-all duration-200
//                 ${isOpen ? "opacity-100" : "opacity-0 md:opacity-100"} 
//                 ${isOpen ? "inline" : "absolute md:static"}
//               `}
//             >
//               Logout
//             </span>
//           </button>
//         </div>
//       </div>

//       {/* Overlay for mobile when sidebar is open */}
//       {isOpen && (
//         <div
//           className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20"
//           onClick={() => setIsOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default Usersidebar;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";
import logo from "../assets/logo.jpg";
import { FaBell } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BiSolidCalendarExclamation } from "react-icons/bi";
import { AiFillExclamationCircle } from "react-icons/ai";
import axios from "axios";
import { RiShieldUserLine } from "react-icons/ri";
import { TiThMenu } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
import { MyAlerts } from "../api/alert";

function Usersidebar() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleAllNotifications = () => {
    navigate("/user");
  };

  const handleLeaveStatus = () => {
    navigate("/leave");
  };

  const handleMarkAttendance = () => {
    navigate("/userattendance");
  };

  const Myattendance = () => {
    navigate("/myattendance");
  };

  return (
    <div className="poppins flex flex-col md:flex-row min-h-screen bg-zinc-200">
      {/* Sidebar */}
      {!isSidebarOpen && (
        <div className="w-full h-20 md:hidden bg-white flex items-center justify-between px-4">
          <img className="h-[8vh] w-1/2 object-cover" src={logo} alt="Logo" />

          <button
            className=" z-30 p-2 bg-white text-black rounded-full shadow-md hover:bg-blue-600 hover:text-white transition md:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <TiThMenu size={24} />
          </button>
        </div>
      )}

      <div
        className={`fixed top-0 left-0 z-10 w-64 bg-white h-screen text-black px-6 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <button
          className="lg:hidden mt-2 text-black rounded hover:bg-blue-600"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <RxCross1 className="font-thin" />
        </button>
        <div className="mr-4">
          <img className="h-[8vh] w-full object-cover" src={logo} alt="" />
        </div>
        <div className="flex flex-col gap-4 mt-16">
          <button 
          onClick={handleAllNotifications}
          className="px-1 py-2 text-center bg-blue-500 text-white rounded hover:bg-blue-600 hover:text-white duration-300 flex justify-evenly items-center">
            <FaBell className="font-bold text-xl" />
            All Notifications
          </button>
          <button
            onClick={handleMarkAttendance}
            className="px-4 py-2 text-center bg-zinc-200 text-black rounded hover:bg-zinc-300 tracking-tighter hover:text-black duration-300 flex justify-evenly items-center"
          >
            <IoMdCheckmarkCircleOutline className="font-bold text-xl" />
            Mark Attendance
          </button>
          <button
            onClick={Myattendance}
            className="px-4 py-2 text-center bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black tracking-tighter  duration-300 flex justify-evenly items-center"
          >
            <RiShieldUserLine className="text-xl" />
            My Attendances
          </button>
          <button
            onClick={handleLeaveStatus}
            className="px-4 py-2 text-center bg-zinc-200 text-black rounded hover:bg-zinc-300 hover:text-black duration-300 flex justify-evenly items-center gap-3"
          >
            <BiSolidCalendarExclamation className="font-bold text-xl" />
            Leave Status
          </button>
          <button
            onClick={handleLogOut}
            // className="px-4 py-2 mt-20 bg-red-500 text-white rounded hover:bg-red-700 flex justify-center items-center gap-3"
            className="px-4 py-2 mt-16 bg-gradient-to-r from-red-500 to-red-700 text-white rounded hover:from-red-600 hover:to-red-800 flex justify-center items-center gap-3 transition-all duration-300"
          >
            <FaPowerOff className="font-thin text-xl" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Usersidebar;
