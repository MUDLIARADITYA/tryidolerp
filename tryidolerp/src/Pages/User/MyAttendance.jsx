import React, { useEffect, useState } from "react";
import Usersidebar from "../../Component/Usersidebar";

const MyAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from backend
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch("/api/attendance"); // replace with your real API
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setAttendanceData(data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setAttendanceData([]); // fallback to empty
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const downloadCSV = () => {
    if (attendanceData.length === 0) return;

    const headers = [
      "Date",
      "Check-In",
      "Check-Out",
      "Location",
      "Camera Image",
      "Employee ID",
      "Working Hrs.",
      "Status",
    ];
    const rows = attendanceData.map((row) =>
      [
        row.date,
        row.checkIn,
        row.checkOut,
        row.location,
        row.cameraImage,
        row.employeeId,
        row.workingHours,
        row.status,
      ].join(",")
    );
    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "attendance.csv";
    a.click();
  };

  return (
    <div className="flex">
      <Usersidebar />
      <div className=" ml-[250px] flex-1 p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-blue-700">
            User's Attendance Record
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
              {!loading && attendanceData.length === 0 ? (
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
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <button
            onClick={downloadCSV}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={attendanceData.length === 0}
          >
            Download Attendance as CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAttendance;
