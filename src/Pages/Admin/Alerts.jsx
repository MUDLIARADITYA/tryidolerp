// // import React, { useState, useEffect } from "react";

// // const mockLoggedInUsers = ["John Doe", "Jane Smith", "Mark Lee"];

// // const Alert = () => {
// //   const [alerts, setAlerts] = useState([]);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [formData, setFormData] = useState({
// //     title: "",
// //     message: "",
// //     recipient: "For All",
// //   });

// //   // Load initial mock alerts
// //   useEffect(() => {
// //     const mockAlerts = [
// //       {
// //         sentAt: "5/5/2025, 2:43:20 PM",
// //         sentTo: "For All",
// //         title: "alert",
// //         message: "gbuds",
// //       },
// //     ];
// //     setAlerts(mockAlerts);
// //   }, []);

// //   const handleInputChange = (e) => {
// //     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
// //   };

// //   const handleCreateAlert = () => {
// //     const newAlert = {
// //       sentAt: new Date().toLocaleString(),
// //       sentTo: formData.recipient,
// //       title: formData.title,
// //       message: formData.message,
// //     };
// //     setAlerts((prev) => [...prev, newAlert]);
// //     setFormData({ title: "", message: "", recipient: "For All" });
// //     setIsModalOpen(false);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-200 px-4 py-6 relative">
// //       {/* Table */}
// //       <div className="overflow-x-auto">
// //         <table className="min-w-full bg-white rounded-md overflow-hidden shadow">
// //           <thead>
// //             <tr className="bg-[#b2d5ff] text-black font-semibold text-left">
// //               <th className="px-6 py-3">Sent at</th>
// //               <th className="px-6 py-3">Sent to</th>
// //               <th className="px-6 py-3">Title</th>
// //               <th className="px-6 py-3">Message</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {alerts.length === 0 ? (
// //               <tr>
// //                 <td colSpan="4" className="text-center py-6 text-gray-600">
// //                   No alerts found.
// //                 </td>
// //               </tr>
// //             ) : (
// //               alerts.map((alert, index) => (
// //                 <tr key={index} className="border-t hover:bg-gray-50">
// //                   <td className="px-6 py-3">{alert.sentAt}</td>
// //                   <td className="px-6 py-3">{alert.sentTo}</td>
// //                   <td className="px-6 py-3">{alert.title}</td>
// //                   <td className="px-6 py-3">{alert.message}</td>
// //                 </tr>
// //               ))
// //             )}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Floating Button */}
// //       <button
// //         onClick={() => setIsModalOpen(true)}
// //         className="fixed bottom-6 right-6 bg-[#2e61d8] hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-full shadow flex items-center gap-2"
// //       >
// //         <span>💬</span> Generate Alert
// //       </button>

// //       {/* Modal */}
// //       {isModalOpen && (
// //         <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
// //           <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
// //             <h2 className="text-xl font-semibold mb-4">Create New Alert</h2>

// //             <div className="space-y-4">
// //               <div>
// //                 <label className="block mb-1 font-medium">Title</label>
// //                 <input
// //                   type="text"
// //                   name="title"
// //                   value={formData.title}
// //                   onChange={handleInputChange}
// //                   className="w-full border rounded px-3 py-2"
// //                   placeholder="Enter title"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block mb-1 font-medium">Message</label>
// //                 <textarea
// //                   name="message"
// //                   value={formData.message}
// //                   onChange={handleInputChange}
// //                   className="w-full border rounded px-3 py-2"
// //                   placeholder="Enter message"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block mb-1 font-medium">Send To</label>
// //                 <select
// //                   name="recipient"
// //                   value={formData.recipient}
// //                   onChange={handleInputChange}
// //                   className="w-full border rounded px-3 py-2"
// //                 >
// //                   <option value="For All">For All</option>
// //                   {mockLoggedInUsers.map((user, idx) => (
// //                     <option key={idx} value={user}>
// //                       {user}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>
// //             </div>

// //             <div className="mt-6 flex justify-end gap-3">
// //               <button
// //                 onClick={() => setIsModalOpen(false)}
// //                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={handleCreateAlert}
// //                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
// //               >
// //                 Create
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Alert;


// import React, { useState, useEffect } from "react";

// const mockLoggedInUsers = ["John Doe", "Jane Smith", "Mark Lee"];

// const Alert = () => {
//   const [alerts, setAlerts] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     message: "",
//     recipient: "For All",
//   });
//   const [editIndex, setEditIndex] = useState(null);

//   // Load initial mock alerts
//   useEffect(() => {
//     const mockAlerts = [
//       {
//         sentAt: "5/5/2025, 2:43:20 PM",
//         sentTo: "For All",
//         title: "alert",
//         message: "gbuds",
//       },
//     ];
//     setAlerts(mockAlerts);
//   }, []);

//   const handleInputChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleCreateAlert = () => {
//     const newAlert = {
//       sentAt: new Date().toLocaleString(),
//       sentTo: formData.recipient,
//       title: formData.title,
//       message: formData.message,
//     };

//     if (editIndex !== null) {
//       const updatedAlerts = [...alerts];
//       updatedAlerts[editIndex] = newAlert;
//       setAlerts(updatedAlerts);
//       setEditIndex(null);
//     } else {
//       setAlerts((prev) => [...prev, newAlert]);
//     }

//     setFormData({ title: "", message: "", recipient: "For All" });
//     setIsModalOpen(false);
//   };

//   const handleEdit = (index) => {
//     const alertToEdit = alerts[index];
//     setFormData({
//       title: alertToEdit.title,
//       message: alertToEdit.message,
//       recipient: alertToEdit.sentTo,
//     });
//     setEditIndex(index);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (index) => {
//     if (window.confirm("Are you sure you want to delete this alert?")) {
//       setAlerts(alerts.filter((_, i) => i !== index));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-200 px-4 py-6 relative">
//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded-md overflow-hidden shadow">
//           <thead>
//             <tr className="bg-[#b2d5ff] text-black font-semibold text-left">
//               <th className="px-6 py-3">Sent at</th>
//               <th className="px-6 py-3">Sent to</th>
//               <th className="px-6 py-3">Title</th>
//               <th className="px-6 py-3">Message</th>
//               <th className="px-6 py-3">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {alerts.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="text-center py-6 text-gray-600">
//                   No alerts found.
//                 </td>
//               </tr>
//             ) : (
//               alerts.map((alert, index) => (
//                 <tr key={index} className="border-t hover:bg-gray-50">
//                   <td className="px-6 py-3">{alert.sentAt}</td>
//                   <td className="px-6 py-3">{alert.sentTo}</td>
//                   <td className="px-6 py-3">{alert.title}</td>
//                   <td className="px-6 py-3">{alert.message}</td>
//                   <td className="px-6 py-3 flex gap-2">
//                     <button
//                       onClick={() => handleEdit(index)}
//                       className="text-blue-600 hover:underline"
//                       title="Edit"
//                     >
//                       ✏️
//                     </button>
//                     <button
//                       onClick={() => handleDelete(index)}
//                       className="text-red-600 hover:underline"
//                       title="Delete"
//                     >
//                       🗑️
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Floating Button */}
//       <button
//         onClick={() => {
//           setIsModalOpen(true);
//           setFormData({ title: "", message: "", recipient: "For All" });
//           setEditIndex(null);
//         }}
//         className="fixed bottom-6 right-6 bg-[#2e61d8] hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-full shadow flex items-center gap-2"
//       >
//         <span>💬</span> Generate Alert
//       </button>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
//             <h2 className="text-xl font-semibold mb-4">
//               {editIndex !== null ? "Edit Alert" : "Create New Alert"}
//             </h2>

//             <div className="space-y-4">
//               <div>
//                 <label className="block mb-1 font-medium">Title</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleInputChange}
//                   className="w-full border rounded px-3 py-2"
//                   placeholder="Enter title"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 font-medium">Message</label>
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleInputChange}
//                   className="w-full border rounded px-3 py-2"
//                   placeholder="Enter message"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-1 font-medium">Send To</label>
//                 <select
//                   name="recipient"
//                   value={formData.recipient}
//                   onChange={handleInputChange}
//                   className="w-full border rounded px-3 py-2"
//                 >
//                   <option value="For All">For All</option>
//                   {mockLoggedInUsers.map((user, idx) => (
//                     <option key={idx} value={user}>
//                       {user}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="mt-6 flex justify-end gap-3">
//               <button
//                 onClick={() => {
//                   setIsModalOpen(false);
//                   setEditIndex(null);
//                 }}
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleCreateAlert}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//               >
//                 {editIndex !== null ? "Update" : "Create"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Alert;

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
    // Optional: remove edited alert from list until it's re-added
    const updatedAlerts = [...alerts];
    updatedAlerts.splice(index, 1);
    setAlerts(updatedAlerts);
  };

  return (
    <div className="min-h-screen bg-gray-200 px-4 py-6 relative">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-md overflow-hidden shadow">
          <thead>
            <tr className="bg-[#b2d5ff] text-black font-semibold text-left border-b border-white">
              <th className="px-6 py-3">Sent at</th>
              <th className="px-6 py-3">Sent to</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Message</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-600">
                  No alerts found.
                </td>
              </tr>
            ) : (
              alerts.map((alert, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3">{alert.sentAt}</td>
                  <td className="px-6 py-3">{alert.sentTo}</td>
                  <td className="px-6 py-3">{alert.title}</td>
                  <td className="px-6 py-3">{alert.message}</td>
                  <td className="px-6 py-3 flex gap-3">
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
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-[#2e61d8] hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-full shadow flex items-center gap-2"
      >
        💬 Generate Alert
      </button>

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
