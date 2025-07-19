import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../../Context/AuthContex';
import axios from 'axios';

import Loader from '../../../Utilities/Loader';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Donner = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('access-token');

        const [requesterRes, donorRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/donation-requests/user`, {
            params: { email: user?.email, type: 'requester' },
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/donation-requests/user`, {
            params: { email: user?.email, type: 'donor' },
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const combined = [...requesterRes.data, ...donorRes.data];

        // Filter unique by _id
        const unique = Array.from(
          new Map(combined.map(item => [item._id, item])).values()
        );

        // Show only the 3 most recent (you can sort by date if needed)
        setRequests(unique.slice(0, 3));
      } catch (err) {
        console.error('Failed to fetch donation and request data', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchRequests();
  }, [user?.email]);

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem('access-token');
      await axios.patch(`${import.meta.env.VITE_API_URL}/donation-requests/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(prev => prev.map(req => req._id === id ? { ...req, status } : req));
    } catch (err) {
      console.error('Status update failed', err);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete your donation request permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('access-token');
        await axios.delete(`${import.meta.env.VITE_API_URL}/donation-requests/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(prev => prev.filter(req => req._id !== id));

        Swal.fire('Deleted!', 'Your donation request has been deleted.', 'success');
      } catch (err) {
        console.error('Delete failed', err);
        Swal.fire('Error', 'Failed to delete the request.', 'error');
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
      ) : requests.length > 0 ? (
        <>
          <div className="overflow-x-auto rounded shadow-sm">
            <table className="table table-sm md:table-md lg:table-lg w-full">
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
                          <button onClick={() => handleStatusChange(req._id, 'done')} className="btn btn-xs btn-success">
                            Done
                          </button>
                          <button onClick={() => handleStatusChange(req._id, 'canceled')} className="btn btn-xs btn-error">
                            Cancel
                          </button>
                        </>
                      )}
                      <button onClick={() => navigate(`/dashboard/edit-request/${req._id}`)} className="btn btn-xs btn-info">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(req._id)} className="btn btn-xs btn-warning">
                        Delete
                      </button>
                      <button onClick={() => navigate(`/dashboard/requests/${req._id}`)} className="btn btn-xs btn-outline">
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
