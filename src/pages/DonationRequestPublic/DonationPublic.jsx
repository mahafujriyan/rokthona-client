import React, { useContext, useEffect, useState } from 'react';
import useAxios from '../../Utilities/Axios/UseAxios';
;
import { AuthContext } from '../../Context/AuthContex';
import { format } from 'date-fns';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

const DonationPublic = () => {
  const [requests, setRequests] = useState([]);
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const res = await axiosSecure.get('/donationValue/public', {
          params: { status: 'pending' },
        });
        setRequests(res.data);
      } catch (err) {
        console.error('Error fetching pending requests:', err);
      }
    };

    fetchPendingRequests();
  }, []);

  const handleView = (id) => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(`/publicView/${id}`);
    }
  }
  
  return (
     <div className="px-4 py-8 ">
      <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-red-700">
        🩸 Pending Blood Donation Requests
      </h1>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No pending requests found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req,index) => (
           
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: index % 2 === 0 ? -50 : 50 }}
    animate={{ opacity: 1, scale: 1, x: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
              
           

              key={req._id}
              className="bg-gradient-to-br from-red-50 via-white to-red-100 border border-red-300 shadow-lg hover:shadow-xl rounded-xl transition duration-300 flex flex-col justify-between"
            >
              <div className="p-5 space-y-3 relative">
                {/* Blood icon */}
                <div className="absolute top-3 right-3 text-2xl text-red-500">🩸</div>

                <h2 className="text-xl font-semibold text-red-700">
                  {req.recipientName}
                </h2>

                <p className="text-gray-600 text-sm">
                  📍 <strong>Location:</strong>  {req.recipientUpazila}
                </p>

                <p className="text-gray-600 text-sm">
                  🩸 <strong>Blood Group:</strong>{' '}
                  <span className="text-red-600 font-bold">{req.bloodGroup}</span>
                </p>

                <p className="text-gray-600 text-sm">
                  📅 <strong>Date:</strong>{' '}
                  {format(new Date(req.donationDate), 'PPP')}
                </p>

                <p className="text-gray-600 text-sm">
                  ⏰ <strong>Time:</strong>{' '}
                  {format(new Date(req.donationDate), 'p')}
                </p>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => handleView(req._id)}
                  className="btn btn-sm sm:btn-md w-full bg-red-600 hover:bg-red-700 text-white rounded-full"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
  }


export default DonationPublic;
