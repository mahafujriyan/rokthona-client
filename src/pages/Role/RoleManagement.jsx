import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RoleDrop from './RoleDrop';

const RoleManagement = () => {
      const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('access-token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
    return (
        <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">👥 User Role Management</h2>
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="table table-zebra">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Change Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name || 'N/A'}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge badge-lg ${
                      user.role === 'admin'
                        ? 'badge-primary'
                        : user.role === 'donor'
                        ? 'badge-error'
                        : 'badge-warning'
                    }`}
                  >
                    {user.role === 'admin'
                      ? 'Admin 🌐'
                      : user.role === 'donor'
                      ? 'Donor 🩸'
                      : 'Volunteer 🤝'}
                  </span>
                </td>
                <td>
                  <RoleDrop
                    email={user.email}
                    currentRole={user.role}
                    refetch={fetchUsers}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default RoleManagement;