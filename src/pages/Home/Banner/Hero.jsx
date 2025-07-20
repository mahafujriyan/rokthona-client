

import React from 'react';
import { FaTint } from 'react-icons/fa';
import { Link } from 'react-router';

const Hero = () => {
  return (
    <div
      className="min-h-[500px] bg-[url('/assets/rokthona-1.png')] my-0.5 rounded-xl  bg-cover bg-center relative "
    >
      {/* Optional overlay for contrast */}
      <div className="absolute inset-0 bg-white/60 md:bg-white/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center px-8 py-20">
       
        <div className="max-w-lg text-center md:text-left">
           <FaTint className="text-red-500 animate-bounce w-6 h-auto" />
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-800">
            DONATE <span className="text-red-600">BLOOD</span>
          </h1>
           <FaTint className="text-red-500 animate-bounce w-8 h-auto" />
          <h2 className="text-3xl md:text-4xl font-semibold mt-2 text-red-500">
            SAVE LIVES
          </h2>
          <p className="mt-4 text-lg font-medium text-gray-700">BE A LIFESAVER</p>
           <FaTint className="text-red-500 animate-bounce w-10 h-auto" />
         <div className='flex gap-2'>
           <Link to='/singUp' className="btn mt-6 px-6 py-3 bg-red-300 text-white font-bold rounded-full shadow hover:bg-red-700 transition duration-200 hover:text-white">
            Join as a donor
          </Link>
           <Link to='/search'  className="btn mt-6 px-6 py-3 bg-red-600 text-white font-bold rounded-full shadow hover:bg-red-700 transition duration-200">
            Search Donor
          </Link>

         </div>
        </div>

        <div className="mt-5 md:mt-0 flex ">
          <FaTint className="text-red-500 animate-bounce w-10 h-auto" />
        
        </div>
       
       
      </div>
    </div>
  );
};

export default Hero;
