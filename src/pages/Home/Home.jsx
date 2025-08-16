import React from 'react';
import Hero from './Banner/Hero';
import ContactUs from './Contactus/ContactUs';
import Comment from './Comment/Comment';
import SearchDonner from '../Search/SearchDonner';
import DonationPublic from '../DonationRequestPublic/DonationPublic';
import Partners from '../../Partners/Partners';


const Home = () => {
    return (
        <div className='space-y-3'>
            <Hero></Hero>
            <SearchDonner></SearchDonner>
            <DonationPublic></DonationPublic>
            <Comment></Comment>
            <Partners limit={true}></Partners>
            <ContactUs></ContactUs>
        
        </div>
    );
};

export default Home;