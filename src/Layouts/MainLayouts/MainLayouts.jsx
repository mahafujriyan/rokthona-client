import React from 'react';
import Navbar from '../../Components/Shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Shared/Footer';

const MainLayouts = () => {
    return (
        <div className="flex flex-col min-h-screen ">
      <Navbar />

      <main className=" flex-grow container mx-auto py-6 ">
        <Outlet />
      </main>

      <Footer />
    </div>
    );
};

export default MainLayouts;