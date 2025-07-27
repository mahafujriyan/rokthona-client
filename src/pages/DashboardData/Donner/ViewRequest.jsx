import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxios from '../../../Utilities/Axios/UseAxios';
import Loader from '../../../Utilities/Loader';

const ViewRequest = () => {
      const { id } = useParams();
  const axiosSecure = useAxios();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axiosSecure.get(`/donations/${id}`);
        setRequest(res.data);
      } catch (error) {
        console.error('❌ Error fetching request:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRequest();
  }, [id]);

  if (loading) return <Loader />;

  if (!request) {
    return <p className="text-center text-red-500">Request not found.</p>;
  }
    return (
       <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-primary">
        Donation Request Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p><span className="font-semibold">Recipient Name:</span> {request.recipientName}</p>
          <p><span className="font-semibold">Blood Group:</span> {request.bloodGroup}</p>
          <p><span className="font-semibold">Date:</span> {request.donationDate}</p>
          <p><span className="font-semibold">Time:</span> {request.donationTime}</p>
          <p><span className="font-semibold">Location:</span> {request.recipientDistrict}, {request.recipientUpazila}</p>
        </div>

        <div>
          <p><span className="font-semibold">Status:</span> {request.status}</p>
          {request.status === 'inprogress' && (
            <>
              <p><span className="font-semibold">Donor Name:</span> {request.donorName}</p>
              <p><span className="font-semibold">Donor Email:</span> {request.donorEmail}</p>
            </>
          )}
          <p><span className="font-semibold">Additional Info:</span></p>
          <p className="text-sm text-gray-600">{request.notes || 'N/A'}</p>
        </div>
      </div>
    </div>
    );
};

export default ViewRequest ;