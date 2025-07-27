import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxios from '../../Utilities/Axios/UseAxios';
import { AuthContext } from '../../Context/AuthContex';
import Swal from 'sweetalert2';
import { format } from 'date-fns';

const ViewDonation = () => {
   const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxios();

  const [request, setRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axiosSecure.get(`/donations/${id}`);
        setRequest(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRequest();
  }, [id, axiosSecure]);

  const handleConfirm = async () => {
    try {
      const res = await axiosSecure.patch(`/donationRequest/${id}/confirm`);
      if (res.data.message) {
        Swal.fire('Success', res.data.message, 'success');
        setIsModalOpen(false);
        setRequest(prev => ({ ...prev, status: 'inprogress' }));
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', err.response?.data?.message || 'Something went wrong', 'error');
    }
  };

  if (!request) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

 
    return (
        <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl  font-bold mb-4">Donation Request Details</h1>

      <div className="bg-gradient-to-br from-red-50 via-white to-red-100 border border-red-300 p-4 rounded-lg shadow-md space-y-2 object-cover max-w-[300px]  ">
        <p><strong>Recipient:</strong> {request.recipientName}</p>
        <p><strong>Location:</strong> {request.district}, {request.upazila}</p>
        <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
        <p><strong>Date:</strong> {format(new Date(request.donationDate), 'PPP')}</p>
        <p><strong>Time:</strong> {format(new Date(request.donationDate), 'p')}</p>
        <p><strong>Status:</strong> {request.status}</p>
        {request.donorName && <p><strong>Donor:</strong> {request.donorName} ({request.donorEmail})</p>}
      </div>

      {request.status === 'pending' && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Donate Now
        </button>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
            <h2 className="text-xl font-semibold mb-4">Confirm Donation</h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Donor Name</label>
                <input
                  type="text"
                  value={user?.displayName || user?.name || ''}
                  readOnly
                  className="w-full border rounded px-3 py-1.5 bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Donor Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  readOnly
                  className="w-full border rounded px-3 py-1.5 bg-gray-100"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-1.5 rounded border"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    );
};

export default ViewDonation;