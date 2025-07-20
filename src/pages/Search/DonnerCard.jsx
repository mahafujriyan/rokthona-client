import React from 'react';

const bloodTypeIcons = {
  'A+': '🅰️➕',
  'A-': '🅰️➖',
  'B+': '🅱️➕',
  'B-': '🅱️➖',
  'AB+': '🆎➕',
  'AB-': '🆎➖',
  'O+': '🅾️➕',
  'O-': '🅾️➖',
};

const DonorCard = React.memo(({ donor }) => {

  const initials = donor.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow p-4 flex flex-col items-center text-center hover:shadow-lg transition">
 
      <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-3xl font-bold text-red-600 mb-3">
    
        {donor.avatarUrl ? (
          <img
            src={donor.avatarUrl}
            alt={donor.name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          initials
        )}
      </div>

      {/* Donor Info */}
      <h3 className="text-xl font-semibold text-red-700">{donor.name}</h3>

      {/* Blood Group with icon */}
      <p className="text-red-600 font-bold text-lg mt-1 flex items-center justify-center gap-2">
        <span>{bloodTypeIcons[donor.bloodGroup] || '❓'}</span>
        <span>{donor.bloodGroup}</span>
      </p>

      <p className="text-gray-700 mt-2">
        <strong>District:</strong> {donor.districtName || donor.district}
      </p>

      <p className="text-gray-700">
        <strong>Upazila:</strong> {donor.upazila}
      </p>

      <p className="text-gray-700">
        <strong>Phone:</strong> {donor.phone}
      </p>
    </div>
  );
});

export default DonorCard;
