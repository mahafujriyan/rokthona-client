import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxios from '../../../Utilities/Axios/UseAxios';

const Volunteers = () => {
    const axiosSecure = useAxios();

  const [donations, setDonations] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch donations with pagination & filtering
  const fetchDonations = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      if (filterStatus !== 'all') params.status = filterStatus;

      const res = await axiosSecure.get('/donation-requests/all', { params });
      setDonations(res.data.requests || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch donations:', error);
      toast.error('Failed to load donation requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [filterStatus, page]);

  // Volunteer can only update status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/donation-requests/${id}/status`, { status: newStatus });
      toast.success('Status updated');
      fetchDonations();
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update status');
    }
  };

    return (
        <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Volunteer Tasks - Blood Donation Requests</h2>

      {/* Filter */}
      <div className="mb-4 flex items-center gap-4">
        <label htmlFor="statusFilter" className="font-medium">Filter by Status:</label>
        <select
          id="statusFilter"
          className="select select-bordered w-48"
          value={filterStatus}
          onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading donation requests...</div>
      ) : donations.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No donation requests found.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
          <table className="table w-full">
            <thead className="bg-red-700 text-white">
              <tr>
                <th>#</th>
                <th>Recipient</th>
                <th>Blood Group</th>
                <th>District</th>
                <th>Upazila</th>
                <th>Donation Date</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, idx) => (
                <tr key={donation._id}>
                  <th>{(page - 1) * 10 + idx + 1}</th>
                  <td>{donation.recipientName || 'N/A'}</td>
                  <td>{donation.bloodGroup || 'N/A'}</td>
                  <td>{donation.district || 'N/A'}</td>
                  <td>{donation.upazila || 'N/A'}</td>
                  <td>{new Date(donation.donationDate).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        donation.status === 'pending'
                          ? 'badge-warning'
                          : donation.status === 'inprogress'
                          ? 'badge-info'
                          : donation.status === 'done'
                          ? 'badge-success'
                          : 'badge-error'
                      }`}
                    >
                      {donation.status}
                    </span>
                  </td>
                  <td>
                    <select
                      className="select select-bordered select-sm w-full"
                      value={donation.status}
                      onChange={(e) => handleStatusChange(donation._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="inprogress">In Progress</option>
                      <option value="done">Done</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="btn-group justify-center flex mt-4">
              <button
                className="btn btn-outline"
                onClick={() => setPage(p => Math.max(p - 1, 1))}
                disabled={page === 1}
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`btn btn-outline ${page === i + 1 ? 'btn-active' : ''}`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="btn btn-outline"
                onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
    );
};

export default Volunteers;