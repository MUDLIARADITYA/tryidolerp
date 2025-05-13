// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Leaves = () => {
//   const navigate = useNavigate();

//   const [leaves] = useState([
//     {
//       id: 1,
//       name: "Murlidhar",
//       subject: "Casual Leave",
//       message: "I need 1 day leave",
//     },
//     {
//       id: 2,
//       name: "Murlidhar",
//       subject: "Sick Leave",
//       message: "I am unwell and need 2 days off.",
//     },
//   ]);

//   return (
//     <div className="p-4">
//       {/* View All Button */}
      

//       <div className="overflow-x-auto rounded-md shadow-md">
//         <table className="min-w-full table-auto border-collapse">
//           <thead className="bg-blue-200 text-blue-900 font-bold">
//             <tr>
//               <th className="px-4 py-3 text-left">Applicant Name</th>
//               <th className="px-4 py-3 text-left">Subject</th>
//               <th className="px-4 py-3 text-left">Message</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white text-gray-800">
//             {leaves.map((leave) => (
//               <tr key={leave.id} className="border-t border-gray-200">
//                 <td className="px-4 py-3">{leave.name}</td>
//                 <td className="px-4 py-3 capitalize">{leave.subject}</td>
//                 <td className="px-4 py-3">{leave.message}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="flex justify-end mb-4 mt-2">
//           <button
//             onClick={() => navigate("/employeeleaves")}
//             className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition"
//           >
//             View All
//           </button>
//         </div>



//       </div>
//     </div>
//   );
// };

// export default Leaves;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HiOutlineDownload } from "react-icons/hi";
import { MdDashboardCustomize, MdMessage } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaPowerOff } from "react-icons/fa6";
import { FaUsersViewfinder } from "react-icons/fa6";
// import logo from "../assets/logo.jpg";
import { FaBell } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { TiThMenu } from "react-icons/ti";
// import { ImCross } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";
import { DoLeave, getAllLeaves } from "../../api/leave.js";

const Dashboardleaves = () => {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchLeaves();
    }
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await getAllLeaves();
      //   export const getAllLeaves = async () => {
      //     return API.get("/leave/");
      // };
      // axios.get("http://localhost:5000/api/leave/", {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      // })
      // console.log(response.data);
      setLeaves(response.data.data);
    } catch (err) {
      setError("Failed to fetch leave requests");
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // const handleNotification = () => {
  //   navigate("/notifications");
  // };

  // const handleLeave = () => {
  //   navigate("/employeeleaves");
  // };

  // const handleDashboard = () => {
  //   navigate("/dashboard");
  // };

  // const handleUserDetails = () => navigate("/reg");

  // const handleLogOut = () => {
  //   localStorage.removeItem("token");
  //   navigate("/");
  // };

  // const handleAttendance = () => navigate("/allattendance");

  // const handleDownload = () => navigate("/download");

  const handleLeaveAction = async (leaveId, action) => {
    const reason = prompt(`Please enter reason for ${action.toLowerCase()}:`)
    if (!reason) return;
    try {
      // await DoLeave(leaveId, action);
      await axios.put(
        `http://localhost:5000/api/leave/${leaveId}`,
        // `https://attendance-backend-hs02.onrender.com/api/leave/${leaveId}`,
        {
          status: action,
          reason: reason,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const updatedLeaves = leaves.map((leave) =>
        leave.id === leaveId ? { ...leave, status: action, reason } : leave
    );
    setLeaves(updatedLeaves);
    fetchLeaves();
    } catch (err) {
      console.log(err);
      setError(`Failed to ${action} leave`);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800 mt-5">Employees on leave</h1>
        
      </div>
      <div className="bg-white shadow overflow-x-auto">
        <table className="min-w-full border border-black border-collapse">
          <thead>
            <tr className="bg-blue-200 text-gray-700">
              <th className="px-4 py-3 text-left border border-black">S. No</th>
              <th className="px-4 py-3 text-left border border-black">Employee Name</th>
              <th className="px-4 py-3 text-left border border-black">Subject</th>
              <th className="px-4 py-3 text-left border border-black">Message</th>
              
            </tr>
          </thead>
          <tbody>
            {leaves.slice(0, 5).map((leave, index) => (
              <tr key={leave._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-black">{index + 1}</td>
                <td className="px-4 py-2 border border-black">{leave?.userId?.name}</td>
                <td className="px-4 py-2 border border-black capitalize">{leave.subject}</td>
                <td className="px-4 py-2 border border-black">{leave.message}</td>
                 
                
                
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mb-4 mt-2">
          <button
            onClick={() => navigate("/employeeleaves")}
            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition"
          >
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboardleaves;
