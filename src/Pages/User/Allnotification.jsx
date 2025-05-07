import React from 'react';
import Usersidebar from '../../Component/Usersidebar';

const Allnotification = () => {
  const notifications = [
    { title: 'hgb', message: 'C x V', date: '5/5/2025', target: 'For All' },
    { title: 'alert', message: 'gbuds', date: '5/5/2025', target: 'For All' },
    { title: 'hgb', message: 'C x V', date: '5/5/2025', target: 'For All' },
    { title: 'alert', message: 'gbuds', date: '5/5/2025', target: 'For All' },
  ];

  return (
    <div className="flex bg-gray-200 min-h-screen">
      {/* Sidebar */}
      <div className="w-64">
        <Usersidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {notifications.map((note, index) => (
            <div
              key={index}
              className="bg-white rounded-lg px-4 py-3 shadow-lg hover:shadow-xl transition flex flex-col justify-between min-h-[150px]"
            >
              <h3 className="text-blue-800 font-bold text-md leading-tight">{note.title}</h3>
              <p className="text-gray-700 text-sm leading-tight">{note.message}</p>
              <p className="text-xs text-gray-500 mt-2 leading-tight">
                {note.target} - {note.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Allnotification;
