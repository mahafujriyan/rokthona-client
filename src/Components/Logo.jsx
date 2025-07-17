import React from 'react';
import { FaTint } from 'react-icons/fa';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to='/' className="flex items-center gap-2 text-red-600 font-bold text-2xl md:text-3xl">
      <FaTint className="text-red-500 animate-pulse" />
      <span className="font-semibold tracking-wide">Rokthona</span>
    </Link>
    );
};

export default Logo;