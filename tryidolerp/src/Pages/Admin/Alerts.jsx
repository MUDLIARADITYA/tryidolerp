import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios"; // Import axios

const mockLoggedInUsers = ["John Doe", "Jane Smith", "Mark Lee"];

const Alert = () => {
  const [alerts, setAlerts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    recipient: "For All",
  });
  const [users, setUsers] = useState([]);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/auth",
    // baseURL: "https://attendance-backend-hs02.onrender.com/api/auth",
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Load users from MongoDB
  useEffect(() => {
    axiosInstance
      .get("http://localhost:5000/api/auth/all")
      // .get("https://attendance-backend-hs02.onrender.com/api/auth/all")
      .then((res) => {
        // console.log("GET /all response:", res.data);
        const users = Array.isArray(res.data.users) ? res.data.users : res.data;
        setUsers(users);
        // console.log(res.data.users[1].name);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setUsers([]); // fallback to empty array
      });
  }, []);

  // Load alerts from the backend on mount
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const token = localStorage.getItem("token");
        // console.log(token);

        const response = await axios.get(
          "http://localhost:5000/api/alert/all",
          // "https://attendance-backend-hs02.onrender.com/api/alert/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data);
        // setAlerts(response.data.data);
        const alertsData = response.data.data || [];
        setAlerts(Array.isArray(alertsData) ? alertsData : []);
      } catch (error) {
        console.error("Error fetching alerts", error);
      }
    };

    fetchAlerts();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Create or update alert
  const handleCreateAlert = async () => {
    if (isEditMode) {
      const updatedAlert = {
        ...alerts[editIndex],
        title: formData.title,
        message: formData.message,
        targetUser: formData.recipient,
      };

      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `http://localhost:5000/api/alert/${alerts[editIndex]._id}`,
          // `https://attendance-backend-hs02.onrender.com/api/alert/${alerts[editIndex]._id}`,
          updatedAlert,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); // PUT request to update alert
        const updatedAlerts = [...alerts];
        updatedAlerts[editIndex] = updatedAlert;
        setAlerts(updatedAlerts);
      } catch (error) {
        console.error("Error updating alert", error);
      }

      setIsEditMode(false); // Reset edit mode
      setEditIndex(null); // Reset edit index
    } else {
      const newAlert = {
        sentAt: new Date().toLocaleString(),
        targetUser: formData.recipient === "For All" ? null : formData.recipient,
        title: formData.title,
        message: formData.message,
      };

      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:5000/api/alert/",
          // "https://attendance-backend-hs02.onrender.com/api/alert/",
          newAlert,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); // POST request to create alert
        setAlerts((prevAlerts) => [...prevAlerts, response.data.data]);
      } catch (error) {
        console.error("Error creating alert", error);
      }
    }

    setFormData({ title: "", message: "", recipient: "For All" });
    setIsModalOpen(false);
  };

  // Handle delete alert
  const handleDelete = async (index) => {
    const token = localStorage.getItem("token");
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this alert?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:5000/api/alert/${alerts[index]._id}`,
          // `https://attendance-backend-hs02.onrender.com/api/alert/${alerts[index]._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); // DELETE request to remove alert
        const updatedAlerts = alerts.filter((_, i) => i !== index);
        setAlerts(updatedAlerts);
      } catch (error) {
        console.error("Error deleting alert", error);
      }
    }
  };

  // Handle edit alert
  const handleEdit = (index) => {
    const alertToEdit = alerts[index];
    setFormData({
      title: alertToEdit.title,
      message: alertToEdit.message,
      recipient: alertToEdit.sentTo,
    });
    setIsModalOpen(true);
    setIsEditMode(true);
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-200 px-4 py-6 relative">
      {/* Notifications Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Notifications</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition"
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
              alerts.map((alert, index) => {
                // Move the logic for targetEmployee and targetName here
                const targetEmployee = users.find(
                  (emp) => emp._id === alert.targetUser
                ); // Find the employee by _id
                const targetName = targetEmployee
                  ? targetEmployee.name
                  : "For All";

                return (
                  <tr key={alert._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium border border-black">
                      {index + 1}
                    </td>
                    <td className="px-6 py-3 border border-black">
                      {new Date(alert.createdAt).toLocaleString()}
                      {/* {alert.createdAt} */}
                    </td>
                    <td className="px-6 py-3 border border-black">
                      {targetName}
                    </td>
                    {/* Use targetName here */}
                    <td className="px-6 py-3 border border-black">
                      {alert.title}
                    </td>
                    <td className="px-6 py-3 border border-black">
                      {alert.message}
                    </td>
                    <td className="px-6 py-3 border border-black">
                      <div className="flex gap-3">
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
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              {isEditMode ? "Edit Alert" : "Create New Alert"}
            </h2>

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
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
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
                {isEditMode ? "Save Changes" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alert;
