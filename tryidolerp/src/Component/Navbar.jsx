import React, { useState, useEffect } from "react";
import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Navbar = () => {

  
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);



  useEffect(() => {
      const token = localStorage.getItem("token");
      // console.log(token);
      
      if (!token) {
        //check of thoken
        navigate("/");
      } else {
        fetchProfile(token);
      }
    }, [navigate]);
  
    //const fetchData = async ()=>{
    // const response = await axios.get("").then((response)=>response.data).catch((err)=>console.log(err))
    //  }
    const fetchProfile = async (token) => {
      try {
        const response = await axios.get(
          // "https://attendancebackend-5j69.onrender.com/api/auth/profile",
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = response.data?.user;
        // console.log("userdata", userData.name);
        if (userData?._id) {
          setUserData(userData);
        } else {
          console.error("User ID not found in response.");
          alert("User ID not found. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
        console.log("Error fetching user profile");
      }
    };


  return (
    <header className=" shadow h-16 flex items-center justify-between px-6 border-blue-600 fixed w-full bg-white z-40 pr-[5%] pl-[25%]">
      {/* Search */}
      <div className="flex items-center w-1/3">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search employees"
            className="w-full pl-10 pr-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Right-side */}
      <div className="flex items-center gap-4">
        <FaBell className="text-gray-600 text-lg" />
        <FaUser className="text-gray-600 text-lg" />
        <span className="text-gray-800 font-medium">{`${userData.name}`}</span>
      </div>
    </header>
  );
};

export default Navbar;
