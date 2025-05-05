// src/Components/Layout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <main className="pt-16 md:ml-64 p-4 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;
