import React, { useContext, useEffect, useState } from 'react';

import Swal from 'sweetalert2';
import { AuthContext } from '../../../Context/AuthContex';
import useAxios from '../../../Utilities/Axios/UseAxios';
import { format } from 'date-fns';
import { Link } from 'react-router';

const statusOptions = ['all', 'pending', 'inprogress', 'done', 'canceled'];
const updateStatusOptions = ['pending', 'inprogress', 'done', 'canceled'];

const AllRequest = () => {
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { user } = useContext(AuthContext);
  const axiosSecure = useAxios();
  const [userRole, setUserRole] = useState('donor');

  useEffect(() => {
    const role = localStorage.getItem('user-role');
    if (role) setUserRole(role);
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosSecure.get('/admin/all', {
          params: {
            status: status !== 'all' ? status : undefined,
            page,
            limit: 10,
          },
        });
        setRequests(res.data.requests);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error('Failed to fetch requests:', err);
      }
    };

    fetchRequests();
  }, [status, page]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/donation-requests/${id}`);
        setRequests((prev) => prev.filter((r) => r._id !== id));
        Swal.fire('Deleted!', 'Request has been deleted.', 'success');
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to delete request', 'error');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/admin/all/${id}/status`, { status: newStatus });
      const updated = requests.map((r) =>
        r._id === id ? { ...r, status: newStatus } : r
      );
      setRequests(updated);
      Swal.fire('Updated!', 'Donation status updated.', 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to update status', 'error');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">All Blood Donation Requests</h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {statusOptions.map((opt) => (
          <button
            key={opt}
            className={`px-4 py-1 rounded-full text-sm border ${
              status === opt ? 'bg-red-500 text-white' : 'border-gray-300'
            }`}
            onClick={() => {
              setStatus(opt);
              setPage(1);
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-[800px] w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-left">Recipient</th>
              <th className="px-3 py-2 text-left">Location</th>
              <th className="px-3 py-2 text-left">Date & Time</th>
              <th className="px-3 py-2 text-left">Blood Group</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="border-t">
                <td className="px-3 py-2">{req.recipientName}</td>
                <td className="px-3 py-2">
                  {req.district}, {req.upazila}
                </td>
                <td className="px-3 py-2">
                  {format(new Date(req.donationDate), 'PPPp')}
                </td>
                <td className="px-3 py-2">{req.bloodGroup}</td>
                <td className="px-3 py-2 capitalize">
                  {userRole === 'volunteer' ? (
                    <select
                      className="select select-bordered select-sm w-full max-w-xs"
                      value={req.status}
                      onChange={(e) =>
                        handleStatusChange(req._id, e.target.value)
                      }
                    >
                      {updateStatusOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  ) : (
                    req.status
                  )}
                </td>
                <td className="px-3 py-2 space-x-2 whitespace-nowrap">
                  <Link
                    to={`/dashboard/request/${req._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </Link>

                
                  {userRole === 'admin' && (
                    <>
                      <Link
                        to={`/dashboard/edit-donation-request/${req._id}`}
                        className="text-yellow-500 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4 text-gray-500"
                >
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <div className="flex gap-1">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 border rounded ${
                page === i + 1 ? 'bg-red-500 text-white' : ''
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
      </div>
    </div>
  );
};

export default AllRequest;
