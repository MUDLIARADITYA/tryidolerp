import React, { useState, useEffect } from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

// Attach token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const AddUser = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(initialForm());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewUser, setViewUser] = useState(null);

  function initialForm() {
    return {
      name: '',
      email: '',
      password: '',
      employeeId: '',
      position: '',
      userType: 'user',
    };
  }

  // Load users from MongoDB
  useEffect(() => {
    axiosInstance.get("http://localhost:5000/api/auth/all")
  .then(res => {
    // console.log("GET /all response:", res.data);  
    const users = Array.isArray(res.data.users) ? res.data.users : res.data;
    setUsers(users);
  })
  .catch(err => {
    console.error("Error fetching users:", err);
    setUsers([]);  // fallback to empty array
  });

  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add or update user
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const res = await axiosInstance.put(`/update/${editId}`, formData);
        // setUsers(users.map(user => (user._id === editId ? res.data : user)));
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user._id === editId ? res.data : user))
        );

        setIsEditing(false);
        setEditId(null);
      } else {
        const res = await axiosInstance.post('/register', formData);
        setUsers(prev => [...prev, res.data]);
      }
      setFormData(initialForm());
      setShowForm(false);

      // Reload users from backend
      const res = await axiosInstance.get('/all');
      const users = Array.isArray(res.data.users) ? res.data.users : res.data;
      setUsers(users);
    } catch (err) {
      console.error('Failed to save user', err);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axiosInstance.delete(`/delete/${id}`);
        setUsers(users.filter(user => user._id !== id));
      } catch (err) {
        console.error('Failed to delete user', err);
      }
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setFormData(user);
    setIsEditing(true);
    setEditId(user._id);
    setShowForm(true);
  };

  const handleView = (user) => {
    setViewUser(user);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">All Employees</h1>
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

      {/* Table */}
      <div className="bg-white shadow overflow-x-auto">
        <table className="min-w-full border border-black border-collapse">
          <thead>
            <tr className="bg-blue-200 text-gray-700">
              <th className="px-4 py-3 text-left border border-black">S.No.</th>
              <th className="px-4 py-3 text-left border border-black">EmployeeId</th>
              <th className="px-4 py-3 text-left border border-black">Name</th>
              <th className="px-4 py-3 text-left border border-black">Email</th>
              <th className="px-4 py-3 text-left border border-black">Position</th>
              <th className="px-4 py-3 text-left border border-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400 border border-black">
                  No employee data available.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id || index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-black">{index + 1}</td>
                  <td className="px-4 py-2 border border-black">{user.employeeId}</td>
                  <td className="px-4 py-2 border border-black">{user.name}</td>
                  <td className="px-4 py-2 border border-black">{user.email}</td>
                  <td className="px-4 py-2 border border-black">{user.position}</td>
                  <td className="px-4 py-2 border border-black gap-3">
                    <button
                      onClick={() => handleView(user)}
                      title="View"
                      className="text-blue-500 hover:text-blue-700 transition transform hover:scale-110"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleEdit(user)}
                      title="Edit"
                      className="text-green-600 hover:text-green-800 transition transform hover:scale-110"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      title="Delete"
                      className="text-red-600 hover:text-red-800 transition transform hover:scale-110"
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

      {/* Register/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 relative"
            onSubmit={handleRegister}
          >
            <h2 className="text-xl font-semibold text-center">{isEditing ? 'Edit User' : 'Register New Employee'}</h2>
            <input 
              type="text" 
              name="name" 
              placeholder="Full Name" 
              value={formData.name} 
              onChange={handleInputChange} 
              className="w-full px-3 py-2 border rounded" required 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email Address" 
              value={formData.email} 
              onChange={handleInputChange} 
              className="w-full px-3 py-2 border rounded" required 
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={formData.password} 
              onChange={handleInputChange} 
              className="w-full px-3 py-2 border rounded" 
              required 
            />
            <input 
              type="text" 
              name="employeeId" 
              placeholder="Employee ID" 
              value={formData.employeeId || ''} 
              onChange={handleInputChange} 
              className="w-full px-3 py-2 border rounded" required 
            />
            <input 
              type="text" 
              name="position" 
              placeholder="Position" 
              value={formData.position} 
              onChange={handleInputChange} 
              className="w-full px-3 py-2 border rounded" required 
            />
            <select 
              name="userType" 
              value={formData.userType} 
              onChange={handleInputChange} 
              className="w-full px-3 py-2 border rounded" required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {isEditing ? 'Update' : 'Register'}
            </button>
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setShowForm(false)}
            >
              ✖
            </button>
          </form>
        </div>
      )}

      {/* View Modal */}
      {viewUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Employee Details</h2>
            <p><strong>Name:</strong> {viewUser.name}</p>
            <p><strong>Email:</strong> {viewUser.email}</p>
            <p><strong>Employee ID:</strong> {viewUser.employeeId}</p>
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
