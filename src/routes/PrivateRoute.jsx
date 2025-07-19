import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContex';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-red-500"></span>
      </div>
    );
  }

  if (!user) {
    // Not logged in: redirect to login, saving the current location
    return <Navigate to="/logIn" state={{ from: location }} replace />;
  }
    return children;
   
};

export default PrivateRoute;