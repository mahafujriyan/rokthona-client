import React from 'react';
import Hero from './Banner/Hero';
import ContactUs from './Contactus/ContactUs';
import Comment from './Comment/Comment';
import SearchDonner from '../Search/SearchDonner';
import DonationPublic from '../DonationRequestPublic/DonationPublic';


const Home = () => {
    return (
        <div className='space-y-3'>
            <Hero></Hero>
            <SearchDonner></SearchDonner>
            <DonationPublic></DonationPublic>
            <Comment></Comment>
            <ContactUs></ContactUs>
        
        </div>
    );
};

export default Home;