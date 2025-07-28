import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const Empty = ({ message = "No data found", className = "" }) => {
    return (
         <div className={`flex flex-col items-center justify-center text-center text-gray-500 py-10 ${className}`}>
      <FaExclamationCircle className="text-4xl mb-2 text-red-400" />
      <p className="text-lg">{message}</p>
    </div>
  );
    
};

export default Empty;