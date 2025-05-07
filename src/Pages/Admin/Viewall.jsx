import React, { useState } from 'react';

const Viewall = () => {
  const [selectedMonth, setSelectedMonth] = useState('All Months');

  const attendanceData = [
    {
      employeeId: 'E124',
      date: '2025-05-07',
      checkIn: '11:50 am',
      checkOut: '11:50 am',
      location: '23.25522, 77.4251735',
      image: '#',
      description: 'dghrjt',
      workingHrs: 'N/A',
      status: 'Absent',
    },
    {
      employeeId: 'E124',
      date: '2025-05-05',
      checkIn: '02:48 pm',
      checkOut: '02:48 pm',
      location: '23.2551972, 77.4251373',
      image: '#',
      description: 'task done',
      workingHrs: '0.01',
      status: 'Absent',
    },
  ];

  const months = [
    'All Months', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getMonthNumber = (monthName) => {
    return months.indexOf(monthName); // returns 1-based index for months
  };

  const filteredData = selectedMonth === 'All Months'
    ? attendanceData
    : attendanceData.filter((record) => {
        const [year, month] = record.date.split('-');
        const recordMonth = parseInt(month, 10); // convert '05' -> 5
        return recordMonth === getMonthNumber(selectedMonth);
      });

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-center text-2xl font-bold text-blue-700 mb-6">All Attendance Records</h2>

      <div className="mb-4">
        <select
          className="border p-2 rounded"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-100 text-blue-700 font-semibold">
            <tr>
              <th className="p-3">EmployeeID</th>
              <th className="p-3">Date</th>
              <th className="p-3">Check-in</th>
              <th className="p-3">Check-out</th>
              <th className="p-3">Location</th>
              <th className="p-3">Image</th>
              <th className="p-3">Description</th>
              <th className="p-3">Working Hrs</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((record, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{record.employeeId}</td>
                  <td className="p-3">{record.date}</td>
                  <td className="p-3">{record.checkIn}</td>
                  <td className="p-3">{record.checkOut}</td>
                  <td className="p-3">{record.location}</td>
                  <td className="p-3 text-yellow-600 hover:underline cursor-pointer">
                    <a href={record.image} target="_blank" rel="noopener noreferrer">View Image</a>
                  </td>
                  <td className="p-3">{record.description}</td>
                  <td className="p-3">{record.workingHrs}</td>
                  <td className="p-3 text-red-500">{record.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3 text-center" colSpan="9">No records found for selected month.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Previous</button>
        <span className="px-4 py-2 bg-gray-200 rounded">1</span>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Next</button>
      </div>
    </div>
  );
};

export default Viewall;
