// components/Avatar.jsx
import React from 'react';

export function Avatar({ children, className }) {
  return (
    <div className={`w-10 h-10 rounded-full overflow-hidden bg-gray-200 text-gray-600 flex items-center justify-center font-semibold ${className}`}>
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt, className }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
      onError={(e) => {
        e.target.style.display = 'none'; // hide image if it fails to load
      }}
    />
  );
}

export function AvatarFallback({ children, className }) {
  return (
    <span className={`w-full h-full flex items-center justify-center ${className}`}>
      {children}
    </span>
  );
}
