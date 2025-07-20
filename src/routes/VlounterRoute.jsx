import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../Context/AuthContex';
import Loader from '../Utilities/Loader';

const VolunteerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loader />;

  if (!user || user.role !== 'volunteer') {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default VolunteerRoute;
