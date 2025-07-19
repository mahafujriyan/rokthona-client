import React, { useContext, useEffect, useState } from 'react';


import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../../Context/AuthContex';
import axios from 'axios';
import Loader from '../../../Utilities/Loader';


const Donner = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('access-token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/donation-requests/by-requester`, {
          params: { email: user?.email, limit: 3 },
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(res.data);
      } catch (err) {
        console.error('Failed to fetch donation requests', err);
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
    if (!confirm("Are you sure you want to delete this request?")) return;
    try {
      const token = localStorage.getItem('access-token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/donation-requests/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(prev => prev.filter(req => req._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
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
          <table className="table table-sm md:table-md lg:table-lg">
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
                        <button onClick={() => handleStatusChange(req._id, 'done')} className="btn btn-xs btn-success">Done</button>
                        <button onClick={() => handleStatusChange(req._id, 'canceled')} className="btn btn-xs btn-error">Cancel</button>
                      </>
                    )}
                    <button onClick={() => navigate(`/dashboard/edit-request/${req._id}`)} className="btn btn-xs btn-info">Edit</button>
                    <button onClick={() => handleDelete(req._id)} className="btn btn-xs btn-warning">Delete</button>
                    <button onClick={() => navigate(`/dashboard/requests/${req._id}`)} className="btn btn-xs btn-outline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center">
          <Link to="/dashboard/requests" className="btn btn-primary btn-sm md:btn-md">
            View My All Requests
          </Link>
        </div>
      </>
    ) : (
      <p className="text-gray-500 text-center mt-8">🩸 You don't have any donation requests yet.</p>
    )}
  </div>
  );
};

export default Donner;
