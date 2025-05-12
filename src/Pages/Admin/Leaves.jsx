// import React, { useState } from "react";

// const Leaves = () => {
//   const [leaves, setLeaves] = useState([
//     {
//       id: 1,
//       name: "murlidhar",
//       subject: "casual leave",
//       message: "I need 1 day leave",
//       status: "Pending",
//       reason: "",
//     },
//     {
//       id: 2,
//       name: "murlidhar",
//       subject: "Sick Leave",
//       message: "I am unwell and need 2 days off.",
//       status: "Rejected",
//       reason: "You have already taken enough sick leave.",
//     },
//   ]);

//   const handleAction = (id, newStatus) => {
//     const reason = prompt(`Please enter reason for ${newStatus.toLowerCase()}:`);
//     if (!reason) return;

//     const updatedLeaves = leaves.map((leave) =>
//       leave.id === id ? { ...leave, status: newStatus, reason } : leave
//     );
//     setLeaves(updatedLeaves);
//   };

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


const Leaves = () => {
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
      <div className="overflow-x-auto rounded-md shadow-md">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-blue-200 text-blue-900 font-bold">
            <tr>
              <th className="px-4 py-3 text-left">S. No</th>
              <th className="px-4 py-3 text-left">Applicant Name</th>
              <th className="px-4 py-3 text-left">Subject</th>
              <th className="px-4 py-3 text-left">Message</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Reason</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-800">
            {leaves.map((leave) => (
              <tr key={leave._id} className="border-t border-gray-200">
                <td className="px-4 py-3">{leave._id}</td>
                <td className="px-4 py-3">{leave?.userId?.name}</td>
                <td className="px-4 py-3 capitalize">{leave.subject}</td>
                <td className="px-4 py-3">{leave.message}</td>
                <td className="px-4 py-3">{leave.status}</td>
                {/* <td className="px-4 py-3 font-semibold">
                  {leave.status === "Approved" && <span className="text-green-600">{leave.status}</span>}
                  {leave.status === "Rejected" && <span className="text-red-600">{leave.status}</span>}
                  {leave.status === "Pending" && <span className="text-yellow-600">{leave.status}</span>}
                </td> */}
                <td className="px-4 py-3">
                  {leave.reason || <em className="text-gray-400">-</em>}
                </td>
                <td className="px-4 py-3">
                  {leave.status === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleLeaveAction(leave._id, "approved")
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleLeaveAction(leave._id, "rejected")
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400 italic">Action Taken</span> 
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Leaves;
