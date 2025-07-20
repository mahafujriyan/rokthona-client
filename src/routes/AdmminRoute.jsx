import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../Context/AuthContex';
import Loader from '../Utilities/Loader';


const AdminRoute = ({ children }) => {
  const {user,loading}=useContext(AuthContext)
if(loading) return <Loader></Loader>
  if (!user || user.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }
  

  return children;
};

export default AdminRoute;
