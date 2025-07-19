import React, { useContext, useEffect, useState } from 'react';
import useAxios from '../../Utilities/Axios/UseAxios';
;
import { AuthContext } from '../../Context/AuthContex';
import { format } from 'date-fns';
import { useNavigate } from 'react-router';

const DonationPublic = () => {
  const [requests, setRequests] = useState([]);
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const res = await axiosSecure.get('/donation-requests/all', {
          params: { status: 'pending' },
        });
        setRequests(res.data.requests);
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
      navigate(`/dashboard/view-donation-request/${id}`);
    }
  };

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-red-600">
        🩸 Pending Blood Donation Requests
      </h1>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No pending requests found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="card bg-white border shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="card-body">
                <h2 className="card-title text-lg sm:text-xl">
                  Recipient: {req.recipientName}
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  <strong>Location:</strong> {req.district}, {req.upazila}
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  <strong>Blood Group:</strong> {req.bloodGroup}
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  <strong>Date:</strong> {format(new Date(req.donationDate), 'PPP')}
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  <strong>Time:</strong> {format(new Date(req.donationDate), 'p')}
                </p>

                <div className="card-actions mt-4 justify-end">
                  <button
                    onClick={() => handleView(req._id)}
                    className="btn btn-sm sm:btn-md bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationPublic;
