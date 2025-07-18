import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const RoleDrop = ({email, currentRole, refetch}) => {
     const [selectedRole, setSelectedRole] = useState(currentRole);

  const handleRoleChange = async (e) => {
    const newRole = e.target.value;
    setSelectedRole(newRole);

    try {
      const token = localStorage.getItem('access-token');
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/role/${email}`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`Role updated to ${newRole}`);
      refetch && refetch(); // to re-fetch user list if needed
    } catch (err) {
      toast.error("Failed to update role");
    }
  };
    return (
        <select
      className="select select-bordered select-sm"
      value={selectedRole}
      onChange={handleRoleChange}
    >
      <option value="admin">Admin 🌐</option>
      <option value="donor">Donor 🩸</option>
      <option value="volunteer">Volunteer 🤝</option>
    </select>
    );
};

export default RoleDrop;