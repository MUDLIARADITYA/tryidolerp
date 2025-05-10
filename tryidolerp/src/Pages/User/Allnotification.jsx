import React, { useState, useEffect } from 'react';
import Usersidebar from '../../Component/Usersidebar';
import { MyAlerts } from "../../api/alert.js";


const Allnotification = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      MyAlerts()
        .then((response) => {
          if (response.data.success) {
            setAlerts(response.data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching alerts:", error);
        });
    }
  }, []);

  const renderAlertMessage = (message) => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    const parts = message.split(linkRegex);
    return parts.map((part, index) =>
      linkRegex.test(part) ? (
        <a
          key={index}
          href={part}
          className="text-blue-500 underline hover:text-blue-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          {part}
        </a>
      ) : (
        <span key={index} className="text-zinc-600">
          {part}
        </span>
      )
    );
  };

  return (
    <div className="flex bg-gray-200 min-h-screen">
      {/* Sidebar */}
      <div className="w-64">
        <Usersidebar />
      </div>

      {/* Main Content */}
      <div className= "flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <div
                key={alert._id}
                className="bg-white rounded-lg px-4 py-3 shadow-lg hover:shadow-xl transition flex flex-col justify-between min-h-[150px]"
              >
                <h3 className="text-blue-800 font-bold text-md leading-tight">
                  {alert.title}
                </h3>
                <p className="text-gray-700 text-sm leading-tight">
                  {renderAlertMessage(alert.message)}
                </p>
                <p className="text-xs text-gray-500 mt-2 leading-tight">
                  {alert.targetUser ? "For You" : "For All"} -{" "}
                  {new Date(alert.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p>No alerts available.</p>
          )}
        </div>
      </div>


    </div>
  );
};

export default Allnotification;
