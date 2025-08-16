import React, { useEffect, useState } from 'react';
import PartnerCard from './PartnerCard';
import { Link, useLocation } from 'react-router';

const Partners = ({ limit = false }) => {
     const [orgs, setOrgs] = useState([]);
       const location = useLocation();

  useEffect(() => {
    fetch("/partners.json") 
      .then((res) => res.json())
      .then((data) => setOrgs(data))
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);
     if (limit && location.pathname === "/") {
    return (
      <div className="py-10 px-6">
        <h1 className="text-2xl font-bold text-center mb-8">
          Our Partners Organizations
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
          {orgs.slice(0, 8).map((org, index) => (
            <PartnerCard
              key={index}
              name={org.name}
              district={org.district}
              upazila={org.upazila}
              phone={org.phone}
            />
          ))}
        </div>

   
        <div className="flex justify-center mt-8">
          <Link
            to="/partners"
            className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Show More
          </Link>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen py-10 px-6">
      <h1 className="text-2xl font-bold text-center mb-8">
        Our Partners Organizations
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {orgs.map((org, index) => (
          <PartnerCard
            key={index}
            name={org.name}
            district={org.district}
            upazila={org.upazila}
            phone={org.phone}
          />
        ))}
      </div>

     
    </div>
  );
};

export default Partners;