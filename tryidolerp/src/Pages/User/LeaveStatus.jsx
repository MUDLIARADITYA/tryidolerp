import React, { useState, useEffect } from "react";
import { FaPowerOff, FaPlus } from "react-icons/fa";
import Usersidebar from "../../Component/Usersidebar";
import { createLeave, Myleave } from "../../api/leave.js";
import { useNavigate } from "react-router-dom";

// ---------- Temporary Leave Store (mock backend state) ----------
// let mockLeaveStore = [
//     {
//         subject: "Sick Leave",
//         message: "Fever and rest",
//         status: "Approved",
//         reason: "Approved because you submitted a doctor's note.",
//     },
//     {
//         subject: "Emergency",
//         message: "Family issue",
//         status: "Pending",
//         reason: "",
//     },
// ];

// ----------- MOCK API (Replace with real API calls) -------------
// const createLeave = async (data) => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             mockLeaveStore.push(data);
//             resolve({ success: true });
//         }, 500);
//     });
// };

// const Myleave = async () => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve({
//                 data: {
//                     success: true,
//                     data: mockLeaveStore,
//                 },
//             });
//         }, 500);
//     });
// };
// ----------------------------------------------------------------

const UserLeaveStatus = () => {
    const navigate = useNavigate();
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [newLeaveRequest, setNewLeaveRequest] = useState({
        subject: "",
        message: "",
        status: "Pending",
        reason: "",
    });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        navigate("/"); // Redirect to login page if no token
        } else {
            fetchLeaveStatus();
        }
    }, []);

    const fetchLeaveStatus = async () => {
        try {
            const response = await Myleave(); //API CALL HUI HAI YAHA SE
        if (response.data.success) {
            const formattedLeaves = response.data.data.map((leave) => ({
                subject: leave.subject,
                message: leave.message,
                status: leave.status,
                reason: leave.reason,
            }));
            setLeaveRequests(formattedLeaves);
        }
    } catch (error) {
        console.error("Error fetching leave status:", error);
        }
    };

    const handleLogOut = () => {
        localStorage.removeItem("token");
        navigate("/");
      };    

    const handleInputChange = (field, value) => {
        setNewLeaveRequest((prev) => ({ 
            ...prev, 
            [field]: value 
        }));
    };

    const handleRequestLeave = async () => {
        if (!newLeaveRequest.subject || !newLeaveRequest.message) {
            alert("Please enter both Subject and Message.");
            return;
        }

        try {
            await createLeave(newLeaveRequest);
            fetchLeaveStatus(); // refresh data
            setNewLeaveRequest({ subject: "", message: "", status: "Pending", reason: "" });
            setShowModal(false);
        } catch (error) {
            console.error("Error sending leave request:", error);
            alert("Failed to request leave.  Please try again.");
        }
    };

    const addNewLeaveRequest = () => {
        setShowModal(true); // Open modal when "Apply for Leave" is clicked
      };

    return (
        <div className="flex">
            <Usersidebar />
            <div className="p-6 bg-zinc-100 min-h-screen flex-1 ml-[250px]">
                <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-semibold">My Leave Status</h1>
                        <button
                            onClick={addNewLeaveRequest}
                            className="bg-blue-600 text-white px-6 py-2 rounded-full flex items-center gap-2"
                        >
                            <FaPlus /> Apply for Leave
                        </button>
                    </div>

                    <table className="min-w-full table-auto text-center">
                        <thead>
                            <tr className="bg-blue-200 text-blue-900">
                                <th className="px-4 py-2">Subject</th>
                                <th className="px-4 py-2">Message</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveRequests.map((leave, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-4 py-2">{leave.subject}</td>
                                    <td className="px-4 py-2">{leave.message}</td>
                                    <td className="px-4 py-2">{leave.status}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-600">{leave.reason}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-30">
                        <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Apply for Leave</h2>
                            <input
                                type="text"
                                placeholder="Subject"
                                value={newLeaveRequest.subject}
                                onChange={(e) => handleInputChange("subject", e.target.value)}
                                className="w-full border p-2 mb-3 rounded"
                            />
                            <textarea
                                rows="3"
                                placeholder="Message"
                                value={newLeaveRequest.message}
                                onChange={(e) => handleInputChange("message", e.target.value)}
                                className="w-full border p-2 mb-3 rounded"
                            />
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleRequestLeave}
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserLeaveStatus;
