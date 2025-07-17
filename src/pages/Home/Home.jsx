import React from 'react';
import Hero from './Banner/Hero';
import ContactUs from './Contactus/ContactUs';


const Home = () => {
    return (
        <div className='space-y-3'>
            <Hero></Hero>
            <ContactUs></ContactUs>
        
        </div>
    );
};

export default Home;