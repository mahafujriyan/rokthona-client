import React, { useContext, useState } from 'react';

import {
  FaBars,
  FaDonate,
  FaHeart,
  FaSignOutAlt,
  FaTachometerAlt,
  FaTimes,
  FaUser,
} from 'react-icons/fa';
import { AuthContext } from '../../Context/AuthContex';
import { Link, Outlet, useNavigate } from 'react-router';

const DashboardLayout = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    signOutUser().then(() => {
      navigate('/');
    });
  };

  return (
    <div className="min-h-screen flex bg-red-50 font-sans relative">
      {/* Mobile & Tablet toggle button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden absolute top-4 left-4 z-50 text-red-700 text-2xl"
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay for mobile & tablet when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed  top-0 left-0 h-full w-64 bg-red-700 text-white p-5 flex flex-col space-y-4 z-40 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">🩸 RokthoNa</h2>

        <Link to="/dashboard/profile" className="flex items-center gap-2 hover:text-yellow-300">
          <FaUser /> Profile
        </Link>
        <Link to="/dashboard/my-donation-requests" className="flex items-center gap-2 hover:text-yellow-300">
          <FaDonate /> My Donation
        </Link>
        <Link to="/dashboard/create-donation-request" className="flex items-center gap-2 hover:text-yellow-300">
          <FaHeart /> Requests
        </Link>
        {user?.role === 'admin' && (
          <Link to="/dashboard/role-management" className="flex items-center gap-2 hover:text-yellow-300">
            <FaUser />
            Role Managements
          </Link>
        )}
        <Link to="/" className="flex items-center gap-2 hover:text-yellow-300">
          <FaTachometerAlt /> Home
        </Link>

        <button onClick={handleLogout} className="mt-auto flex items-center gap-2 hover:text-yellow-300">
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5 md:ml-64 w-full overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
