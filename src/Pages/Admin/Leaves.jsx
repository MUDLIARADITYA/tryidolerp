import React, { useState } from "react";

  const Leaves = () => {
  const [leaves, setLeaves] = useState([
    {
      id: 1,
      name: "murlidhar",
      subject: "casual leave",
      message: "I need 1 day leave",
      status: "Pending",
      reason: "",
    },
    {
      id: 2,
      name: "murlidhar",
      subject: "Sick Leave",
      message: "I am unwell and need 2 days off.",
      status: "Rejected",
      reason: "You have already taken enough sick leave.",
    },
  ]);

  const handleAction = (id, newStatus) => {
    const reason = prompt(`Please enter reason for ${newStatus.toLowerCase()}:`);
    if (!reason) return;

   const updatedLeaves = leaves.map((leave) =>
      leave.id === id  ? { ...leave, status: newStatus, reason } : leave
    );
    setLeaves(updatedLeaves);
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto rounded-md shadow-md">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-blue-200 text-blue-900 font-bold">
            <tr>
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
              <tr key={leave.id} className="border-t border-gray-200">
                <td className="px-4 py-3">{leave.name}</td>
                <td className="px-4 py-3 capitalize">{leave.subject}</td>
                <td className="px-4 py-3">{leave.message}</td>
                <td className="px-4 py-3 font-semibold">
                  {leave.status === "Approved" && <span className="text-green-600">{leave.status}</span>}
                  {leave.status === "Rejected" && <span className="text-red-600">{leave.status}</span>}
                  {leave.status === "Pending" && <span className="text-yellow-600">{leave.status}</span>}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {leave.reason || <em className="text-gray-400">-</em>}
                </td>
                <td className="px-4 py-3">
                  {leave.status === "Pending" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAction(leave.id, "Approved")}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(leave.id, "Rejected")}
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
      </div>
    </div>
  );
};

export default Leaves;
