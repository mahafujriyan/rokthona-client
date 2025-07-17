import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router';
import Slider from 'react-slick';

const testimonials = [
  {
    name: 'Samizdah Azmi',
    bloodGroup: 'B+',
    district: 'Sirajganj',
    photo: 'https://i.ibb.co/JjRTKNbR/01-4-Qes-CJS.jpg',
    comment:
      'Everything is nicely organized and digitally attractive. It is very easy to find donors from this site. Many people are getting regular help through this platform. I am happy to be part of it.',
  },
  {
    name: 'Nahid Hasan',
    bloodGroup: 'O+',
    district: 'Dhaka',
    photo: 'https://i.ibb.co/BKT4hCdC/e.jpg',
    comment:
      'Great initiative! I found a donor within 15 minutes of my request. This platform is truly life-saving.',
  },
  {
    name: ' Ivy Islam',
    bloodGroup: 'A-',
    district: 'Khulna',
    photo: 'https://i.ibb.co/FkbrBf96/companyinvite.jpg',
    comment:
      'The system is fast and reliable. As a regular donor, I love how easy it is to stay connected with people in need.',
  },
];

const Comment = () => {
 const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

    
    return (
         <div className="grid md:grid-cols-2 my-5 gap-10 p-10 bg-red-50 rounded-lg">
      {/* Left Side */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Donors' Opinions:
        </h2>
        <p className="text-gray-600 mb-6">
          Share your experience or opinion about the blood donation platform.
        </p>
        <Link to='/comments' className="btn p-4 rounded-2xl bg-red-600 text-white px-4 py-2  flex items-center gap-2 hover:bg-red-700">
          Give Your Opinion <FaArrowRight />
        </Link>
      </div>

      {/* Right Side - Carousel */}
      <div>
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div key={index} className="bg-white p-10 rounded-lg shadow text-center">
              <img
                src={item.photo}
                alt={item.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-2xl font-semibold">{item.name}, {item.bloodGroup}</h3>
              <p className="text-md text-gray-500 mb-2">{item.district}</p>
              <p className="text-gray-700 text-sm">{item.comment}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
    );
};

export default Comment;