import React, { useState } from 'react';

const AddUser = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(initialForm());
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewUser, setViewUser] = useState(null);

  function initialForm() {
    return {
      fullName: '',
      email: '',
      password: '',
      employeeID: '',
      position: '',
      userType: 'User',
    };
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = formData;
      setUsers(updatedUsers);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setUsers(prev => [...prev, formData]);
    }
    setFormData(initialForm());
    setShowForm(false);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setUsers(users.filter((_, i) => i !== index));
    }
  };

  const handleEdit = (index) => {
    setFormData(users[index]);
    setIsEditing(true);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleView = (user) => {
    setViewUser(user);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Table */}
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
                    <button onClick={() => handleEdit(index)} title="Edit">✏️</button>
                    <button onClick={() => handleDelete(index)} title="Delete">🗑</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Register Button */}
      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition"
          onClick={() => {
            setShowForm(!showForm);
            setFormData(initialForm());
            setIsEditing(false);
          }}
        >
          {showForm ? 'Close Form' : 'Register New Employee'}
        </button>
      </div>

      {/* Register/Edit Form */}
      {showForm && (
        <form
          className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-md space-y-4"
          onSubmit={handleRegister}
        >
          <h2 className="text-xl font-semibold text-center">{isEditing ? 'Edit User' : 'Register'}</h2>
          <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} className="w-full px-3 py-2 border rounded" required />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border rounded" required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} className="w-full px-3 py-2 border rounded" required />
          <input type="text" name="employeeID" placeholder="Employee ID" value={formData.employeeID} onChange={handleInputChange} className="w-full px-3 py-2 border rounded" required />
          <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleInputChange} className="w-full px-3 py-2 border rounded" required />
          <select name="userType" value={formData.userType} onChange={handleInputChange} className="w-full px-3 py-2 border rounded" required>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            {isEditing ? 'Update' : 'Register'}
          </button>
        </form>
      )}

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

export default AddUser;
