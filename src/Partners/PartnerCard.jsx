import React from 'react';
import { FaTint } from 'react-icons/fa';

const PartnerCard = ({ name, district, upazila, phone }) => {
    return (
         <div className="w-72 p-6 rounded-2xl shadow-md bg-red-50 border border-red-200 flex flex-col items-center text-center hover:shadow-xl transition">
     
      <div className="bg-red-500 p-4 rounded-full mb-4">
        <FaTint className="text-red-500 animate-pulse" />
  
      </div>

      <h2 className="text-lg font-bold text-gray-800">{name}</h2>

     
      <p className="text-gray-600 mt-1">
        {upazila}, {district}
      </p>

     
      <p className="text-red-600 font-semibold mt-2">{phone}</p>
    </div>
    );
};

export default PartnerCard;