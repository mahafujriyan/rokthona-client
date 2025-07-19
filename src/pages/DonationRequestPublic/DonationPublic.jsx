import React, { useContext, useEffect, useState } from 'react';
import useAxios from '../../Utilities/Axios/UseAxios';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContex';
import { format } from 'date-fns';

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
        <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Pending Blood Donation Requests
      </h1>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No pending requests found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="border rounded-xl p-4 shadow-md bg-white"
            >
              <h2 className="text-lg font-semibold mb-2">
                Recipient: {req.recipientName}
              </h2>
              <p className="text-sm text-gray-600">
                Location: {req.district}, {req.upazila}
              </p>
              <p className="text-sm text-gray-600">
                Blood Group: <strong>{req.bloodGroup}</strong>
              </p>
              <p className="text-sm text-gray-600">
                Date: {format(new Date(req.donationDate), 'PPP')}
              </p>
              <p className="text-sm text-gray-600">
                Time: {format(new Date(req.donationDate), 'p')}
              </p>
              <button
                onClick={() => handleView(req._id)}
                className="mt-3 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    );
};

export default DonationPublic;