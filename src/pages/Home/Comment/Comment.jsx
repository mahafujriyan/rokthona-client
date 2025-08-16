import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import TypeAni from '../../../Components/Animation/TypeAni';
import { Link } from 'react-router';

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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="flex flex-col md:grid md:grid-cols-2 gap-10 p-5 md:p-10 bg-red-50"
    >
      {/* Left Side */}
      <div className="flex flex-col justify-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Donors' Opinions:
        </h2>

        <TypeAni
          text="Share your opinion about the blood donation platform."
          className="text-lg sm:text-xl md:text-2xl font-medium text-gray-600 mb-6"
        />

        <Link
          to="/comments"
          className="btn bg-red-600 text-white rounded-xl px-5 py-3 w-fit flex items-center gap-2 hover:bg-red-700 transition"
        >
          Give Your Opinion <FaArrowRight />
        </Link>
      </div>

      {/* Right Side - Carousel */}
      <div className="w-full">
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-md text-center"
            >
              <img
                src={item.photo}
                alt={item.name}
                className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-lg sm:text-xl font-semibold">
                {item.name}, {item.bloodGroup}
              </h3>
              <p className="text-sm text-gray-500">{item.district}</p>
              <p className="text-sm text-gray-700 mt-2">{item.comment}</p>
            </div>
          ))}
        </Slider>
      </div>
    </motion.div>
  );
};

export default Comment;
