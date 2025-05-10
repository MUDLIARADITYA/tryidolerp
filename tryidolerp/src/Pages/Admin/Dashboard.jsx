import React from "react";
import Sidebar from "../../Component/Sidebar";
import Navbar from "../../Component/Navbar";
import { FaProcedures, FaUserMd, FaDollarSign,FaAmbulance } from 'react-icons/fa';
import { FaUser } from "react-icons/fa";
import AddUser from "./Adduser";
import Leaves from "./Leaves";
import Dashboarduser from "./Dashboarduser";
import Dashboardleaves from "./Dashboardleaves";



const cardData = [
  {
    id: 'patients',
    
    icon: <FaUser size={24} className="text-purple-500" />,
    value: '8',
    label: 'Total Employees',
    bg: 'bg-purple-100',
  },
  {
    id: 'staff',
    icon: <FaUser size={24} className="text-blue-400" />,
    value: '5',
    label: 'Available Employees',
    bg: 'bg-blue-100',
  },
  {
    id: 'costs',
    icon: <FaUser size={24} className="text-orange-400" />,
    value: '3',


    label: 'Employees on leave',
    bg: 'bg-orange-100',
  },
  {
    id: 'cars',
    icon: <FaUser size={24} className="text-pink-400" />,
    value: '2',
    label: 'Number of Admins',
    bg: 'bg-pink-100',
  },
];

const Dashboard = () => {








  return (
    <div className="flex min-h-screen">

      {/* Main Content */}
      <div className="flex-1">
        
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
                  <div className="text-bold text-gray-800">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-amber-300 h-[100vh]">
          <div className="h-[50vh]">
            <Dashboarduser/>
            
          </div>
          
          <div className=" h-[50vh]">
            <Dashboardleaves/>
          </div>
        </div>

        
      </div>
      

    </div>
  );
};

export default Dashboard;
