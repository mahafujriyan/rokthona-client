import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../../Context/AuthContex';


import Loader from '../../../Utilities/Loader';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxios from '../../../Utilities/Axios/UseAxios';

const Donner = () => {
   const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const [res] = await Promise.all([
          axiosSecure.get('/donationValue/public', {
            params: { email: user?.email, type: 'requester' },
          }),
        ]);

        const unique = Array.from(
          new Map(res.data.map((item) => [item._id, item])).values()
        );

        setRequests(unique.slice(0, 3));
      } catch (err) {
        console.error('❌ Failed to fetch requests:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchRequests();
  }, [axiosSecure, user?.email]);

  const handleStatusChange = async (id, status) => {
    try {
      await axiosSecure.patch(`/donation-requests/${id}/status`, { status });
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status } : req))
      );
    } catch (err) {
      console.error('❌ Failed to update status:', err);
    }
  };

  const handleDelete = async (id) => {
  const confirm = await Swal.fire({
    title: 'Are you sure?',
    text: 'This will permanently delete the donation request.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  });

  if (confirm.isConfirmed) {
    try {
    
      await axiosSecure.delete(`/donation-requests/${id}`);

      
      setRequests(prev => prev.filter(req => req._id !== id));

      Swal.fire('Deleted!', 'Your request has been removed.', 'success');
    } catch (err) {
      console.error('❌ Delete failed:', err);
      Swal.fire('Error', 'Failed to delete request.', 'error');
    }
  }
};


  return (
   <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-4">
        Welcome, <span className="text-primary">{user?.displayName || user?.email}</span>
      </h1>

      {loading ? (
        <Loader />
      ) : requests.length ? (
        <>
          <div className="overflow-x-auto rounded shadow-sm">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood</th>
                  <th>Status</th>
                  <th className="hidden md:table-cell">Donor Info</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, idx) => (
                  <tr key={req._id}>
                    <td>{idx + 1}</td>
                    <td>{req.recipientName}</td>
                    <td>{req.recipientDistrict}, {req.recipientUpazila}</td>
                    <td>{req.donationDate}</td>
                    <td>{req.donationTime}</td>
                    <td>{req.bloodGroup}</td>
                    <td className="capitalize">{req.status}</td>
                    <td className="hidden md:table-cell">
                      {req.status === 'inprogress' ? (
                        <>
                          <p>{req.donorName}</p>
                          <p className="text-xs text-gray-500">{req.donorEmail}</p>
                        </>
                      ) : '—'}
                    </td>
                    <td className="flex flex-col md:flex-row flex-wrap gap-1">
                      {req.status === 'inprogress' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(req._id, 'done')}
                            className="btn btn-xs btn-success"
                          >
                            Done
                          </button>
                          <button
                            onClick={() => handleStatusChange(req._id, 'canceled')}
                            className="btn btn-xs btn-error"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => navigate(`/dashboard/edit-request/${req._id}`)}
                        className="btn btn-xs btn-info"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="btn btn-xs btn-warning"
                      >
                        Delete
                      </button>
                     <button
                      onClick={() => navigate(`/dashboard/request/${req._id}`)}
                      className="btn btn-xs btn-outline"
                    >
                      View
                    </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <Link to="/dashboard/my-donation-requests" className="btn btn-primary btn-sm md:btn-md">
              View My All Requests
            </Link>
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-center mt-8">
          🩸 You don't have any donation requests yet.
        </p>
      )}
    </div>
  );
};

export default Donner;
