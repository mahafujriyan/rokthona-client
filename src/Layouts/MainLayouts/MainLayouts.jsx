import React from 'react';
import Navbar from '../../Components/Shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Shared/Footer';

const MainLayouts = () => {
    return (
         <div className="container mx-auto min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow ">
        <Outlet />
      </div>

      <Footer />
    </div>
    );
};

export default MainLayouts;