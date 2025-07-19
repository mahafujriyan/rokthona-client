import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../Context/AuthContex';

const MyDonationRequest = () => {
      const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('access-token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/donation-requests`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          email: user?.email,
          page: currentPage,
          status: statusFilter
        },
      });
      setRequests(res.data.requests);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.email) fetchRequests();
  }, [user?.email, currentPage, statusFilter]);
    return (
         <div className="p-4 md:p-6">
      <h2 className="text-xl font-bold mb-4">🩸 My Donation Requests</h2>

      {/* Filter */}
      <div className="mb-4">
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="select select-bordered"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow rounded">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>#</th><th>Recipient</th><th>Location</th><th>Date</th><th>Time</th><th>Blood</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests?.map((req, i) => (
              <tr key={req._id}>
                <td>{i + 1}</td>
                <td>{req.recipientName}</td>
                <td>{req.recipientDistrict}, {req.recipientUpazila}</td>
                <td>{req.donationDate}</td>
                <td>{req.donationTime}</td>
                <td>{req.bloodGroup}</td>
                <td>{req.status}</td>
                <td>
                  <button onClick={() => navigate(`/dashboard/edit-request/${req._id}`)} className="btn btn-xs btn-info">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        <button
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className="btn btn-sm"
        >Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className="btn btn-sm"
        >Next</button>
      </div>
    </div>
    );
};

export default MyDonationRequest;