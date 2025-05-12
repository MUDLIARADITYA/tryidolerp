import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Leaves = () => {
  const navigate = useNavigate();

  const [leaves] = useState([
    {
      id: 1,
      name: "Murlidhar",
      subject: "Casual Leave",
      message: "I need 1 day leave",
    },
    {
      id: 2,
      name: "Murlidhar",
      subject: "Sick Leave",
      message: "I am unwell and need 2 days off.",
    },
     {
      id: 2,
      name: "Murlidhar",
      subject: "Sick Leave",
      message: "I am unwell and need 2 days off.",
    },
     {
      id: 2,
      name: "Murlidhar",
      subject: "Sick Leave",
      message: "I am unwell and need 2 days off.",
    },
     {
      id: 2,
      name: "Murlidhar",
      subject: "Sick Leave",
      message: "I am unwell and need 2 days off.",
    },
  ]);

  return (
    <div className="p-4  h-[70vh]">
     

      <div className="overflow-x-auto rounded-md shadow-md">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-blue-200 text-blue-900 font-bold">
            <tr>
              <th className="px-4 py-3 text-left">Applicant Name</th>
              <th className="px-4 py-3 text-left">Subject</th>
              <th className="px-4 py-3 text-left">Message</th>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-800">
            {leaves.map((leave) => (
              <tr key={leave.id} className="border-t border-gray-200">
                <td className="px-4 py-3">{leave.name}</td>
                <td className="px-4 py-3 capitalize">{leave.subject}</td>
                <td className="px-4 py-3">{leave.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end h-[15vh]">
           {/* View All Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/leaves")}
          className="bg-blue-600 text-white w-[130px] h-[50px]  mt-4 rounded hover:bg-blue-700 transition"
        >
          View All
        </button>
      </div>
          
        </div>
      </div>
    </div>
  );
};

export default Leaves;
