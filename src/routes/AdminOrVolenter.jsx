import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../Context/AuthContex';
import Loader from '../Utilities/Loader';
import useUsers from '../Utilities/Users/useUsers';

const AdminOrVolenter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { userInfo, isLoading } = useUsers(user?.email);

  // Still loading auth or user info
  if (loading || isLoading) {
    return <Loader />;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const role = userInfo?.role;

  // Allow only if role is admin or volunteer
  if (role === 'admin' || role === 'volunteer') {
    return children;
  }

  // Unauthorized
  return <Navigate to="/unauthorized" replace />;
};

export default AdminOrVolenter;
