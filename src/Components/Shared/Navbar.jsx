import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContex';
import { Link, NavLink } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const{user,logout}=useContext(AuthContext)
     const navLinks = (
    <>
      <li><NavLink to="/">Donation Requests</NavLink></li>
      <li><NavLink to="/">Blog</NavLink></li>
      <li><NavLink to="/">Funding</NavLink></li>
    </>
  );

    return (
         <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      <div className="navbar-start">
        <Link to="/" className="text-xl font-bold text-red-600">BloodKotha</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">
          {navLinks}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-8 rounded-full">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="user" />
                ) : (
                  <FaUserCircle className="w-8 h-8 text-gray-500" />
                )}
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><button onClick={logout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="dropdown lg:hidden">
        <label tabIndex={0} className="btn btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </label>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          {navLinks}
          {user ? (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><button onClick={logout}>Logout</button></li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </div>
    </div>
    );
};

export default Navbar;