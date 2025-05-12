import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <Navbar />

      <main className="pt-16 md:ml-64 p-4 bg-gray-50 min-h-screen pb-16">
        {/* Add padding-bottom to prevent content from being hidden behind fixed footer */}
        {children}
      </main>

      <div className="fixed bottom-0 left-0 w-full bg-gray-200 text-center text-sm text-gray-600 py-2 z-50">
        © 2025 Attendance Manager. Developed by{" "}
        <a
          href="https://tryidoltech.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-medium hover:underline"
        >
          Trydol Technologies
        </a>
      </div>

    </div>
  );
};

export default Layout;
