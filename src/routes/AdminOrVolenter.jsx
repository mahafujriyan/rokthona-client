import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContex';
import Loader from '../Utilities/Loader';
import { Navigate } from 'react-router';
import useUsers from '../Utilities/Users/useUsers';

const AdminOrVolenter = ({children}) => {
const { user, loading } =useContext(AuthContext)
  const { userInfo, isLoading } = useUsers(user?.email);

  if (loading || isLoading) {
    return <Loader></Loader>
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const role = userInfo?.role;
  if (role === 'admin' || role === 'volunteer') {
    return children;
  }

  return <Navigate to="/unauthorized" replace />;
};



export default AdminOrVolenter;