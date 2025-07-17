import React from 'react';
import Hero from './Banner/Hero';
import ContactUs from './Contactus/ContactUs';
import Comment from './Comment/Comment';


const Home = () => {
    return (
        <div className='space-y-3'>
            <Hero></Hero>
            <Comment></Comment>
            <ContactUs></ContactUs>
        
        </div>
    );
};

export default Home;