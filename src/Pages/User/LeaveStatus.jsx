import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import Usersidebar from "../../Component/Usersidebar";

// ----------- MOCK API (Replace with real API calls) -------------
const createLeave = async (data) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
};

const Myleave = async () => {
    return {
        data: {
            success: true,
            data: [
                { subject: "Sick Leave", message: "Fever and rest", status: "Approved" },
                { subject: "Emergency", message: "Family issue", status: "Pending" },
            ],
        },
    };
};
// ----------------------------------------------------------------

const UserLeaveStatus = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [newLeaveRequest, setNewLeaveRequest] = useState({ subject: "", message: "", status: "New" });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchLeaveStatus();
    }, []);

    const fetchLeaveStatus = async () => {
        try {
            const response = await Myleave();
            if (response.data.success) {
                setLeaveRequests(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching leaves:", error);
        }
    };

    const handleInputChange = (field, value) => {
        setNewLeaveRequest((prev) => ({ ...prev, [field]: value }));
    };

    const handleRequestLeave = async () => {
        if (!newLeaveRequest.subject || !newLeaveRequest.message) {
            alert("Please fill all fields.");
            return;
        }

        try {
            await createLeave(newLeaveRequest);
            fetchLeaveStatus();
            setNewLeaveRequest({ subject: "", message: "", status: "New" });
            setShowModal(false);
        } catch (error) {
            alert("Failed to request leave.");
        }
    };

    return (
        <div>   
            <div>
                <Usersidebar/>
            </div>
            <div className="p-6 bg-zinc-100 min-h-screen ml-[250px]">

                <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
                    <h1 className="text-2xl font-semibold mb-4">My Leave Status</h1>
                    <table className="min-w-full table-auto text-center">
                        <thead>
                            <tr className="bg-blue-200 text-blue-900">
                                <th className="px-4 py-2">Subject</th>
                                <th className="px-4 py-2">Message</th>
                                <th className="px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveRequests.map((leave, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-4 py-2">{leave.subject}</td>
                                    <td className="px-4 py-2">{leave.message}</td>
                                    <td className="px-4 py-2">{leave.status}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="3" className="pt-4 text-right pr-4">
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-full flex items-center gap-2"
                                    >
                                        <FaPlus /> Apply for Leave
                                    </button>
                                </td>
                            </tr>
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
                                rows="4"
                                placeholder="Message"
                                value={newLeaveRequest.message}
                                onChange={(e) => handleInputChange("message", e.target.value)}
                                className="w-full border p-2 mb-3 rounded"
                            />
                            <div className="flex justify-end gap-3">
                                <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                                    Cancel
                                </button>
                                <button onClick={handleRequestLeave} className="bg-blue-600 text-white px-4 py-2 rounded">
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
