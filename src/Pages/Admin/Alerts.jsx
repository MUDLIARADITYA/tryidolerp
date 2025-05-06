import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";

const mockLoggedInUsers = ["John Doe", "Jane Smith", "Mark Lee"];

const Alert = () => {
  const [alerts, setAlerts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    recipient: "For All",
  });

  useEffect(() => {
    const mockAlerts = [
      {
        sentAt: "5/5/2025, 2:43:20 PM",
        sentTo: "For All",
        title: "Alert",
        message: "Sample message",
      },
    ];
    setAlerts(mockAlerts);
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateAlert = () => {
    const newAlert = {
      sentAt: new Date().toLocaleString(),
      sentTo: formData.recipient,
      title: formData.title,
      message: formData.message,
    };
    setAlerts((prev) => [...prev, newAlert]);
    setFormData({ title: "", message: "", recipient: "For All" });
    setIsModalOpen(false);
  };

  const handleDelete = (index) => {
    const updatedAlerts = [...alerts];
    updatedAlerts.splice(index, 1);
    setAlerts(updatedAlerts);
  };

  const handleEdit = (index) => {
    const alertToEdit = alerts[index];
    setFormData({
      title: alertToEdit.title,
      message: alertToEdit.message,
      recipient: alertToEdit.sentTo,
    });
    setIsModalOpen(true);
    const updatedAlerts = [...alerts];
    updatedAlerts.splice(index, 1);
    setAlerts(updatedAlerts);
  };

  return (
    <div className="min-h-screen bg-gray-200 px-4 py-6 relative">
      {/* Notifications Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Notifications</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#2e61d8] hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-full shadow flex items-center gap-2"
        >
          💬 Generate Alert
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-black">
        <table className="min-w-full bg-white rounded-md overflow-hidden shadow border border-black">
          <thead>
            <tr className="bg-[#b2d5ff] text-black font-semibold text-left border-b border-black">
              <th className="px-4 py-3 border border-black">Serial no.</th>
              <th className="px-6 py-3 border border-black">Sent at</th>
              <th className="px-6 py-3 border border-black">Sent to</th>
              <th className="px-6 py-3 border border-black">Title</th>
              <th className="px-6 py-3 border border-black">Message</th>
              <th className="px-6 py-3 border border-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-600 border border-black"
                >
                  No alerts found.
                </td>
              </tr>
            ) : (
              alerts.map((alert, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium border border-black">
                    {index + 1}
                  </td>
                  <td className="px-6 py-3 border border-black">{alert.sentAt}</td>
                  <td className="px-6 py-3 border border-black">{alert.sentTo}</td>
                  <td className="px-6 py-3 border border-black">{alert.title}</td>
                  <td className="px-6 py-3 border border-black">{alert.message}</td>
                  <td className="px-6 py-3 border border-black">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Create New Alert</h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter title"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter message"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Send To</label>
                <select
                  name="recipient"
                  value={formData.recipient}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="For All">For All</option>
                  {mockLoggedInUsers.map((user, idx) => (
                    <option key={idx} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAlert}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alert;
