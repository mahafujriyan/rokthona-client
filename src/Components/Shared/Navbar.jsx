import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContex';
import { Link, NavLink } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';
import Logo from '../Logo';


const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);


  const navLinks = (
    <>
      <li><NavLink to="/" >Donation Requests</NavLink></li>
      <li><NavLink to="/blogs">Blog</NavLink></li>
      <li><NavLink to="/create-payment">Funding</NavLink></li>
      <li><NavLink to="/dashboard">Dashboard</NavLink></li>
    </>
  );

    return (
       <div className=" navbar bg-[#f5bdbd] shadow-md sticky top-0 z-50 rounded-xl">
      <div className="navbar-start">
      <Logo></Logo>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          {navLinks}
        </ul>
      </div>

      {/* User Info or Login */}
      <div className="navbar-end ">
       {user ? (
  <div className="dropdown dropdown-end">
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
      <div className="w-8 rounded-full">
        {user.photoURL ? (
          <img src={user.photoURL} alt="user avatar" />
        ) : (
          <FaUserCircle className="w-8 h-8 text-gray-500" />
        )}
      </div>
    </label>
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
    >
      <li className="font-semibold text-center border-b pb-2">
        {user.displayName || 'Anonymous User'}
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <button onClick={signOutUser}>Logout</button>
      </li>
    </ul>
  </div>
) : (
  <Link to="/logIn" className="btn btn-outline btn-sm">
    Login
  </Link>
)}


      </div>
      {/* Mobile Menu */}
<div className="dropdown dropdown-end lg:hidden">
  <label tabIndex={0} className="btn btn-ghost btn-circle">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
      viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </label>
  <ul tabIndex={0}
    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
  >
    {navLinks}
  </ul>
</div>




    </div>
    );
};

export default Navbar;