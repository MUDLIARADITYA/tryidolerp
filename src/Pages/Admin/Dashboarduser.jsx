import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboarduser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [viewUser, setViewUser] = useState(null);

  // Simulated data for 5 employees
  const mockEmployees = [
    {
      employeeID: 'EMP001',
      fullName: 'Alice Johnson',
      email: 'alice@example.com',
      position: 'Software Engineer',
      userType: 'User'
    },
    {
      employeeID: 'EMP002',
      fullName: 'Bob Smith',
      email: 'bob@example.com',
      position: 'UI/UX Designer',
      userType: 'User'
    },
    {
      employeeID: 'EMP003',
      fullName: 'Carol White',
      email: 'carol@example.com',
      position: 'Product Manager',
      userType: 'Admin'
    },
    {
      employeeID: 'EMP004',
      fullName: 'David Brown',
      email: 'david@example.com',
      position: 'QA Tester',
      userType: 'User'
    },
    {
      employeeID: 'EMP005',
      fullName: 'Eve Green',
      email: 'eve@example.com',
      position: 'DevOps Engineer',
      userType: 'Admin'
    }
  ];

  useEffect(() => {
    // Load mock data into state
    setUsers(mockEmployees);
  }, []);

  const handleView = (user) => setViewUser(user);
  const handleEdit = (index) => {};
  const handleDelete = (index) => {};

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Table */}
          {/* View All Button */}
      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition"
          onClick={() => navigate('/add-user')}
        >
          View All
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-blue-200 text-gray-700">
              <th className="px-4 py-3 text-left border border-white">EmployeeID</th>
              <th className="px-4 py-3 text-left border border-white">Name</th>
              <th className="px-4 py-3 text-left border border-white">Email</th>
              <th className="px-4 py-3 text-left border border-white">Position</th>
              <th className="px-4 py-3 text-left border border-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">No employee data available.</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{user.employeeID}</td>
                  <td className="px-4 py-2">{user.fullName}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.position}</td>
                  <td className="px-4 py-2 flex gap-3">
                    <button onClick={() => handleView(user)} title="View">👁</button>
                    {/* <button onClick={() => handleEdit(index)} title="Edit">✏️</button>
                    <button onClick={() => handleDelete(index)} title="Delete">🗑</button> */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

     

      {/* View Modal */}
      {viewUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Employee Details</h2>
            <p><strong>Name:</strong> {viewUser.fullName}</p>
            <p><strong>Email:</strong> {viewUser.email}</p>
            <p><strong>Employee ID:</strong> {viewUser.employeeID}</p>
            <p><strong>Position:</strong> {viewUser.position}</p>
            <p><strong>User Type:</strong> {viewUser.userType}</p>
            <div className="text-right mt-4">
              <button
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                onClick={() => setViewUser(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboarduser;
