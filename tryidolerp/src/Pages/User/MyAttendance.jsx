// import React, { useEffect, useState } from "react";
// import Usersidebar from "../../Component/Usersidebar";

// const MyAttendance = () => {
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch data from backend
//   useEffect(() => {
//     const fetchAttendance = async () => {
//       try {
//         const response = await fetch("/api/attendance"); // replace with your real API
//         if (!response.ok) throw new Error("Network response was not ok");
//         const data = await response.json();
//         setAttendanceData(data);
//       } catch (error) {
//         console.error("Error fetching attendance data:", error);
//         setAttendanceData([]); // fallback to empty
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAttendance();
//   }, []);

//   const downloadCSV = () => {
//     if (attendanceData.length === 0) return;

//     const headers = [
//       "Date",
//       "Check-In",
//       "Check-Out",
//       "Location",
//       "Camera Image",
//       "Employee ID",
//       "Working Hrs.",
//       "Status",
//     ];
//     const rows = attendanceData.map((row) =>
//       [
//         row.date,
//         row.checkIn,
//         row.checkOut,
//         row.location,
//         row.cameraImage,
//         row.employeeId,
//         row.workingHours,
//         row.status,
//       ].join(",")
//     );
//     const csvContent = [headers.join(","), ...rows].join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const a = document.createElement("a");
//     a.href = URL.createObjectURL(blob);
//     a.download = "attendance.csv";
//     a.click();
//   };


import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { RiShieldUserLine } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
import logo from "../../assets/logo.jpg";
import { BiSolidCalendarExclamation } from "react-icons/bi";
import { FaBell } from "react-icons/fa";
import Usersidebar from "../../Component/Usersidebar";

const MyAttendance = () => {
  const navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      //check of thoken
      navigate("/");
    } else {
      fetchProfile(token);
    }
  }, [navigate]);

  //const fetchData = async ()=>{
  // const response = await axios.get("").then((response)=>response.data).catch((err)=>console.log(err))
  //  }
  const fetchProfile = async (token) => {
    try {
      const response = await axios.get(
        // "https://attendancebackend-5j69.onrender.com/api/auth/profile",
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = response.data?.user;
      console.log(userData, "userdata");
      if (userData?._id) {
        setUserData(userData);
        fetchAttendanceData(userData._id, token);
      } else {
        console.error("User ID not found in response.");
        alert("User ID not found. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
      alert("Error fetching user profile");
    }
  };

  const fetchAttendanceData = async (id, token) => {
    try {
      const response = await axios.get(
        // `https://attendancebackend-5j69.onrender.com/api/attendance/${id}`,
        `http://localhost:5000/api/attendance/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // const data = response.data?.userAttendance || [];
      // console.log(data,"data");
      // setAttendanceData(data);
      const data = response.data?.userAttendance || [];
      console.log(data, "data");

      const reversedData = [...data].reverse();

      setAttendanceData(reversedData);
    } catch (error) {
      console.error("Error fetching attendance data:", error.message);
      alert("Failed to fetch attendance data. Please try again.");
    }
  };

    const handleDownload = () => {
    if (attendanceData.length === 0) {
      alert("No attendance records to download.");
      return;
    }

    // Define the CSV header
    const csvHeader =
      "Date,Check-In,Check-Out,Latitude,Longitude,Camera Image,Employee ID,Working Hrs.,Status\n";

    // Map attendance data to CSV rows
    const csvRows = attendanceData
      .map((record) => {
        // Format date
        const date = record.checkin
          ? new Date(record.checkin).toLocaleDateString()
          : "N/A";

        // Format check-in time
        const checkInTime = record.checkin
          ? new Date(record.checkin).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "N/A";

        // Format check-out time
        const checkOutTime = record.checkout
          ? new Date(record.checkout).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          : "N/A";

        // Format location
        const location =
          typeof record.location === "string" ? record.location : "N/A";

        // Format camera image link
        const cameraImage = record.image ? `View Image` : "N/A";

        // Format employee ID
        const employeeId = userData?.employeeId || "N/A";

        // Format total working hours
        const totalWorkHours = record.totalWorkHours || "N/A";

        // Format status
        const status = record.attendanceStatus || "N/A";

        // Return the CSV row
        return `${date},${checkInTime},${checkOutTime},${location},${cameraImage},${employeeId},${totalWorkHours},${status}`;
      })
      .join("\n");

    // Combine header and rows
    const csvData = csvHeader + csvRows;

    // Create and download the CSV file
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "attendance_data.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleNavigation = (path) => {
    setIsSidebarOpen(false);
    navigate(path);
  };


  return (
    <div className="flex">
      <Usersidebar />
      <div className=" ml-[250px] flex-1 p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-blue-700">
            {userData
              ? `${userData.name}'s Attendance Record`
              : "User's Attendance Record"}
          </h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Total Attendance {attendanceData.length}
          </button>
        </div>

        <div className="bg-white shadow rounded-md overflow-x-auto">
          <table className="min-w-full text-sm text-left border-collapse border border-gray-300">
            <thead className="bg-blue-100 text-black-900 font-semibold ">
              <tr>
                <th className="border border-white px-4 py-2">Date</th>
                <th className="border border-white px-4 py-2">Check-In</th>
                <th className="border border-white px-4 py-2">Check-Out</th>
                <th className="border border-white px-4 py-2">Location</th>
                <th className="border border-white px-4 py-2">Camera Image</th>
                <th className="border border-white px-4 py-2">Employee ID</th>
                <th className="border border-white px-4 py-2">Working Hrs.</th>
                <th className="border border-white px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* {!loading && attendanceData.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-4 text-gray-600"
                  >
                    No attendance records found.
                  </td>
                </tr>
              ) : ( 
                attendanceData.map((record, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">{record.date}</td>
                    <td className="px-4 py-2">{record.checkIn}</td>
                    <td className="px-4 py-2">{record.checkOut}</td>
                    <td className="px-4 py-2">{record.location}</td>
                    <td className="px-4 py-2">
                      <img
                        src={record.cameraImage}
                        alt="camera"
                        className="w-10 h-10 object-cover border rounded"
                      />
                    </td>
                    <td className="px-4 py-2">{record.employeeId}</td>
                    <td className="px-4 py-2">{record.workingHours}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          record.status === "Present"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}  */}
              
              {attendanceData.length > 0 ? (
                attendanceData.map((record, index) => {
                  const checkinDate = record.checkin
                    ? new Date(record.checkin)
                    : null;
                  const checkoutDate = record.checkout
                    ? new Date(record.checkout)
                    : null;

                  return (
                    <tr key={index}>
                      <td className="border px-4 py-2">
                        {checkinDate ? checkinDate.toLocaleDateString() : "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {checkinDate
                          ? checkinDate.toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {checkoutDate
                          ? checkoutDate.toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {typeof record.location === "string"
                          ? record.location
                          : "N/A"}
                      </td>

                      <td className="border px-4 py-2">
                        <a
                          href={`http://localhost:5000/uploads/${record.image}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-yellow-500 hover:underline"
                        >
                          View Image
                        </a>
                      </td>
                      {console.log(record.image)}
                      <td className="border px-4 py-2">
                        {userData.employeeId}
                      </td>

                      <td className="border px-4 py-2">
                        <h1>{record.totalWorkHours}</h1>
                      </td>

                      <td className="border px-4 py-2">
                        <h1
                          className={`
      ${
        record.attendanceStatus.toLowerCase() === "present"
          ? "text-green-500"
          : record.attendanceStatus.toLowerCase() === "absent"
          ? "text-red-500 "
          : "text-yellow-500"
      }
    `}
                        >
                          {/*   */}
                          {record.attendanceStatus}
                        </h1>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="border text-center py-4 text-gray-600">
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            // disabled={attendanceData.length === 0}
          >
            Download Attendance as CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAttendance;
