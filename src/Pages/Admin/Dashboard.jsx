import React from "react";
import Sidebar from "../../Component/Sidebar";
import Navbar from "../../Component/Navbar";
import { FaProcedures, FaUserMd, FaDollarSign, FaAmbulance } from 'react-icons/fa';

const cardData = [
  {
    id: 'patients',
    icon: <FaProcedures size={24} className="text-purple-500" />,
    value: '3,256',
    label: 'Total Patients',
    bg: 'bg-purple-100',
  },
  {
    id: 'staff',
    icon: <FaUserMd size={24} className="text-blue-400" />,
    value: '394',
    label: 'Available Staff',
    bg: 'bg-blue-100',
  },
  {
    id: 'costs',
    icon: <FaDollarSign size={24} className="text-orange-400" />,
    value: '$2,536',


    label: 'Avg Treat. Costs',
    bg: 'bg-orange-100',
  },
  {
    id: 'cars',
    icon: <FaAmbulance size={24} className="text-pink-400" />,
    value: '38',
    label: 'Available Cars',
    bg: 'bg-pink-100',
  },
];

const Dashboard = () => {
  return (
    <div className="flex min-h-screen  ">
      {/* Sidebar - Stays fixed on the left */}

      
      {/* <Sidebar /> */}

      {/* Main Content */}
      <div className="flex-1 border-2 border-red-500">
        {/* <div className="mb-[70px]">
          <Navbar />
        </div> */}
        
        {/* Directly placing the Hero card content here */}
        <div className="w-full p-6 bg-white rounded-lg shadow-sm">
          <div className="flex flex-wrap gap-4 justify-between">
            {cardData.map(({ id, icon, value, label, bg }) => (
              <div
                key={id}
                className={`flex-1 min-w-[180px] flex items-center justify-between p-4 rounded-xl shadow-sm ${bg}`}
              >
                <div className="p-3 bg-white rounded-full shadow">{icon}</div>
                <div className="text-right">
                  <div className="text-xl font-semibold">{value}</div>
                  <div className="text-sm text-gray-600">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div  className="h-[100vh] bg-amber-200">dd</div>
      </div>


    </div>
  );
};

export default Dashboard;
