// import React, { useState } from 'react';

// const Viewall = () => {
//   const [selectedMonth, setSelectedMonth] = useState('All Months');

//   const attendanceData = [
//     {
//       employeeId: 'E124',
//       date: '2025-05-07',
//       checkIn: '11:50 am',
//       checkOut: '11:50 am',
//       location: '23.25522, 77.4251735',
//       image: '#',
//       description: 'dghrjt',
//       workingHrs: 'N/A',
//       status: 'Absent',
//     },
//     {
//       employeeId: 'E124',
//       date: '2025-05-05',
//       checkIn: '02:48 pm',
//       checkOut: '02:48 pm',
//       location: '23.2551972, 77.4251373',
//       image: '#',
//       description: 'task done',
//       workingHrs: '0.01',
//       status: 'Absent',
//     },
//   ];

//   const months = [
//     'All Months', 'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   const getMonthNumber = (monthName) => {
//     return months.indexOf(monthName); // returns 1-based index for months
//   };

//   const filteredData = selectedMonth === 'All Months'
//     ? attendanceData
//     : attendanceData.filter((record) => {
//         const [year, month] = record.date.split('-');
//         const recordMonth = parseInt(month, 10); // convert '05' -> 5
//         return recordMonth === getMonthNumber(selectedMonth);
//       });

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen">
//       <h2 className="text-center text-2xl font-bold text-blue-700 mb-6">All Attendance Records</h2>

//       <div className="mb-4">
//         <select
//           className="border p-2 rounded"
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(e.target.value)}
//         >
//           {months.map((month) => (
//             <option key={month} value={month}>{month}</option>
//           ))}
//         </select>
//       </div>

//       <div className="overflow-x-auto bg-white rounded-lg shadow">
//         <table className="min-w-full text-sm text-left">
//           <thead className="bg-blue-100 text-blue-700 font-semibold">
//             <tr>
//               <th className="p-3">EmployeeID</th>
//               <th className="p-3">Date</th>
//               <th className="p-3">Check-in</th>
//               <th className="p-3">Check-out</th>
//               <th className="p-3">Location</th>
//               <th className="p-3">Image</th>
//               <th className="p-3">Description</th>
//               <th className="p-3">Working Hrs</th>
//               <th className="p-3">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.length > 0 ? (
//               filteredData.map((record, index) => (
//                 <tr key={index} className="border-b">
//                   <td className="p-3">{record.employeeId}</td>
//                   <td className="p-3">{record.date}</td>
//                   <td className="p-3">{record.checkIn}</td>
//                   <td className="p-3">{record.checkOut}</td>
//                   <td className="p-3">{record.location}</td>
//                   <td className="p-3 text-yellow-600 hover:underline cursor-pointer">
//                     <a href={record.image} target="_blank" rel="noopener noreferrer">View Image</a>
//                   </td>
//                   <td className="p-3">{record.description}</td>
//                   <td className="p-3">{record.workingHrs}</td>
//                   <td className="p-3 text-red-500">{record.status}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td className="p-3 text-center" colSpan="9">No records found for selected month.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-center mt-4 gap-2">
//         <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Previous</button>
//         <span className="px-4 py-2 bg-gray-200 rounded">1</span>
//         <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Next</button>
//       </div>
//     </div>
//   );
// };

// export default Viewall;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineDownload } from "react-icons/hi";
import { MdDashboardCustomize } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaPowerOff } from "react-icons/fa6";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdMessage } from "react-icons/md";
import logo from "../../assets/logo.jpg";
import { FaBell } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { TiThMenu } from "react-icons/ti";
import { RxCross1 } from "react-icons/rx";
import { AttendanceData, getAllAttendance } from "../../api/attendance";
import ReactPaginate from "react-paginate";

const Viewall = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const navigate = useNavigate();
  const [filterDays, setFilterDays] = useState("all");
  const [filterMonth, setFilterMonth] = useState("all");
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const recordsPerPage = 10;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await getAllAttendance();
        if (response.data.status === "success") {
          const reversedRecords = [
            ...response.data.attendanceRecords,
          ].reverse();
          console.log(response.data, 123);
          setAttendanceRecords(reversedRecords);
          setFilteredRecords(reversedRecords);
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    fetchAttendance();
  }, []);
  // console.log(1234 )

  useEffect(() => {
    const filterRecords = () => {
      let filteredData = [...attendanceRecords];

      if (filterDays !== "all") {
        const currentDate = new Date();
        const pastDate = new Date();
        pastDate.setDate(currentDate.getDate() - parseInt(filterDays));

        filteredData = filteredData.filter((record) => {
          const recordDate = new Date(record.checkin);
          return recordDate >= pastDate && recordDate <= currentDate;
        });
      }

      if (filterMonth !== "all") {
        filteredData = filteredData.filter((record) => {
          const recordDate = new Date(record.checkin);
          return recordDate.getMonth() + 1 === parseInt(filterMonth); // Months are 0-indexed in JavaScript
        });
      }

      setFilteredRecords(filteredData);
    };

    filterRecords();
  }, [filterDays, filterMonth, attendanceRecords]);

  const handleFilterChange = (days) => {
    setFilterDays(days);
    setCurrentPage(0);
  };

  const handleMonthFilterChange = (month) => {
    setFilterMonth(month);
    setCurrentPage(0);
  };

  const handleDownload = () => {
    const csvHeader =
      "EmployeeId,Date,Check-in Time,Check-out Time,Location,Image,Description,Working Hours,Status\n"; // Added "Working Hours" column

    const csvRows = filteredRecords
      .map((user) => {
        // Format check-in time
        const checkinTime = user?.checkin
          ? new Date(user.checkin).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
              timeZone: "Asia/Kolkata",
            })
          : "N/A";

        // Format check-out time
        const checkoutTime = user?.checkout
          ? new Date(user.checkout).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
              timeZone: "Asia/Kolkata",
            })
          : "N/A";

        return (
          `${user.userId?.employeeId || "Unknown"},` +
          `${user?.checkin ? user.checkin.split("T")[0] : "N/A"},` +
          `${checkinTime},` + // Use formatted check-in time
          `${checkoutTime},` + // Use formatted check-out time
          `"${user.location || "N/A"}",` +
          `${user.image || "N/A"},` +
          `${user.description || "N/A"},` +
          `${user.totalWorkHours || "N/A"},` + // Added Working Hours
          `${user.attendanceStatus || "N/A"}` // Status is now in the correct column
        );
      })
      .join("\n");

    const csvData = csvHeader + csvRows;
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "attendance_records.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleStatusChange = async (id, attendanceStatus) => {
    try {
      const response = await AttendanceData(id, attendanceStatus);
      if (response.data.status === "success") {
        const updatedRecords = attendanceRecords.map((record) =>
          record._id === id
            ? { ...record, attendanceStatus: attendanceStatus }
            : record
        );

        setAttendanceRecords(updatedRecords);
        setFilteredRecords(updatedRecords);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const pageCount = Math.ceil(filteredRecords.length / recordsPerPage);
  const offset = currentPage * recordsPerPage;
  const currentRecords = filteredRecords.slice(offset, offset + recordsPerPage);

  return (
    <div className="min-h-screen flex max-md:flex-col items-center bg-gradient-to-r poppins from-zinc-200 to-zinc-100 poppins">
      

      <div className="ml-10 w-full p-6 overflow-y-auto max-md:ml-0 ">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          All Attendance Records
        </h2>
        <div className="flex gap-4 mb-4">
          {/* <select
            onChange={(e) => handleFilterChange(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All Records</option>
            <option value="10">Last 10 Days</option>
            <option value="15">Last 15 Days</option>
            <option value="30">Last 1 Month</option>
            <option value="90">Last 3 Months</option>
          </select> */}
          <select
            onChange={(e) => handleMonthFilterChange(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All Months</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        {filteredRecords.length === 0 ? (
          <p className="text-center text-red-500">
            No data available for the selected filter.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-black border-collapse">
              <thead>
                <tr className="bg-blue-200 text-gray-700">
                  <th className="px-4 py-3 text-left border border-black">EmployeeID</th>
                  <th className="px-4 py-3 text-left border border-black">Date</th>
                  <th className="px-4 py-3 text-left border border-black">Check-in</th>
                  <th className="px-4 py-3 text-left border border-black">Check-out</th>
                  <th className="px-4 py-3 text-left border border-black">Location</th>
                  <th className="px-4 py-3 text-left border border-black">Image</th>
                  <th className="px-4 py-3 text-left border border-black">Description</th>
                  <th className="px-4 py-3 text-left border border-black">Working Hrs</th>
                  <th className="px-4 py-3 text-left border border-black">Status</th>
                  {/* <th className="px-4 py-3 text-left border border-black">Action</th> */}
                </tr>
              </thead>

              <tbody className="text-center text-sm">
                {currentRecords.map((record) => (
                  <tr key={record._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border border-black">{record.userId?.employeeId}</td>
                    <td className="px-4 py-2 border border-black">
                      {record.checkin ? record.checkin.split("T")[0] : "N/A"}
                    </td>
                    {/* <td className="px-4 py-2 border border-black">
                      {record.checkin
                        ? new Date(record.checkin).toLocaleTimeString("en-IN", {
                            hour12: false,
                            timeZone: "Asia/Kolkata",
                          })
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 border border-black">
                      {record.checkout
                        ? new Date(record.checkout).toLocaleTimeString("en-IN", {
                            hour12: false,
                            timeZone: "Asia/Kolkata",
                          })
                        : "N/A"}
                    </td> */}
                    {/* <td className="px-4 py-2 border border-black">
  {record.checkin
    ? new Date(record.checkin).toLocaleTimeString("en-IN", {
        hour12: true, // Set to true for 12-hour format
        timeZone: "Asia/Kolkata",
      })
    : "N/A"}
</td>
<td className="px-4 py-2 border border-black">
  {record.checkout
    ? new Date(record.checkout).toLocaleTimeString("en-IN", {
        hour12: true, // Set to true for 12-hour format
        timeZone: "Asia/Kolkata",
      })
    : "N/A"}
</td> */}
                    <td className="px-4 py-2 border border-black">
                      {record.checkin
                        ? new Date(record.checkin).toLocaleTimeString("en-IN", {
                            hour: "2-digit", // Show only hours
                            minute: "2-digit", // Show only minutes
                            hour12: true, // 12-hour format
                            timeZone: "Asia/Kolkata",
                          })
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 border border-black">
                      {record.checkout
                        ? new Date(record.checkout).toLocaleTimeString(
                            "en-IN",
                            {
                              hour: "2-digit", // Show only hours
                              minute: "2-digit", // Show only minutes
                              hour12: true, // 12-hour format
                              timeZone: "Asia/Kolkata",
                            }
                          )
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 border border-black">{record.location || "N/A"}</td>

                    <td className="px-4 py-2 border border-black">
                      {record.image ? (
                        <a
                          className="text-yellow-600 hover:underline"
                          href={`http://localhost:5000/uploads/${record.image}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Image
                        </a>
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="px-4 py-2 border border-black">
                      {record.description || "N/A"}
                    </td>
                    <td className="px-4 py-2 border border-black">{record.totalWorkHours || "N/A"}</td>
                    {/* <td className="px-4 py-2 border border-black">{record.attendanceStatus || null}</td> */}
                    <td
                      className={`px-4 py-2 border border-black ${
                        record.attendanceStatus === "Absent"
                          ? " text-red-500"
                          : record.attendanceStatus === "Present"
                          ? " text-green-500"
                          : " text-yellow-500"
                      }`}
                    >
                      {record.attendanceStatus || "Unknown"}
                    </td>

                    {/* <td className="px-4 py-2 border border-black">
                      <select
                        onChange={(e) =>
                          handleStatusChange(record._id, e.target.value)
                        }
                        defaultValue={record.attendanceStatus || null}
                      >
                        <option value="Absent">Absent</option>
                        <option value="Present">Present</option>
                        <option value="Halfday">Halfday</option>
                      </select>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex justify-center mt-4">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"flex gap-2"}
            previousClassName={
              "px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
            }
            nextClassName={
              "px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
            }
            activeClassName={"bg-blue-700 text-blue-500 px-4 py-2 rounded"}
            pageClassName={"px-3 py-2 bg-gray-200 rounded cursor-pointer"}
          />
        </div>
      </div>
    </div>
  );
};

export default Viewall;
