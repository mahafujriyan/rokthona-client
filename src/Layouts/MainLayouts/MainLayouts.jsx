import React from 'react';
import Navbar from '../../Components/Shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Shared/Footer';

const MainLayouts = () => {
    return (
        <div className='container mx-auto'>
           <Navbar></Navbar> 
           <Outlet></Outlet>
           <Footer></Footer>
        </div>
    );
};

export default MainLayouts;