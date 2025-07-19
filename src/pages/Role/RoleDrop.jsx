import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const RoleDrop = ({email, currentRole, refetch}) => {
     const [selectedRole, setSelectedRole] = useState(currentRole);
const [loading, setLoading] = useState(false);
 const handleRoleChange = async (e) => {
  const newRole = e.target.value;
  setSelectedRole(newRole);
  setLoading(true);

  try {
    const token = localStorage.getItem('access-token');
    await axios.put(
      `${import.meta.env.VITE_API_URL}/users/role/${email}`,
      { role: newRole },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(`Role updated to ${newRole}`);
    refetch && refetch();
  } catch (err) {
    toast.error("Failed to update role");
    setSelectedRole(currentRole); // Revert if failed
  } finally {
    setLoading(false);
  }
};
    return (
    <select
  className="select select-bordered select-sm"
  value={selectedRole}
  onChange={handleRoleChange}
  disabled={loading}
>
      <option value="admin">Admin 🌐</option>
      <option value="donor">Donor 🩸</option>
      <option value="volunteer">Volunteer 🤝</option>
    </select>
    );
};

export default RoleDrop;