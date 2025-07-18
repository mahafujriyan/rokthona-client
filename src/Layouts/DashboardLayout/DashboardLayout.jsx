import React from 'react';
import Sidebar from '../../pages/Dashboard/Sidebar';
import { Link, Outlet } from 'react-router';
import { FaHeart, FaSignOutAlt, FaTachometerAlt, FaUser } from 'react-icons/fa';

const DashboardLayout = () => {
    return (
         <div className="min-h-screen flex bg-red-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-red-700 text-white p-5 flex flex-col space-y-4">
        <h2 className="text-2xl font-bold mb-4">🩸 RokthoNa</h2>
        <Link to="/dashboard/profile" className="flex items-center gap-2 hover:text-yellow-300">
          <FaUser /> Profile
        </Link>
        <Link to="/dashboard/requests" className="flex items-center gap-2 hover:text-yellow-300">
          <FaHeart /> Requests
        </Link>
        <Link to="/" className="flex items-center gap-2 hover:text-yellow-300">
          <FaTachometerAlt /> Home
        </Link>
        <button className="mt-auto flex items-center gap-2 hover:text-yellow-300">
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5">
        <Outlet />
      </main>
    </div>
    );
};

export default DashboardLayout;