import React, { useEffect, useState } from 'react';
import useAxios from '../../Utilities/Axios/UseAxios';
import { format } from 'date-fns';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContex';
import { useContext } from 'react';

const PaymentHistory = () => {
  const axiosSecure = useAxios();
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Protect route: only allow admin or volunteer
  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'volunteer')) {
      navigate('/unauthorized');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axiosSecure.get(`/payments?page=${page}&limit=${limit}`);
        setPayments(res.data.payments || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      }
    };

    fetchPayments();
  }, [axiosSecure, page]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Funding History</h2>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="table w-full min-w-[700px]">
          <thead className="bg-gray-100">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Amount (৳)</th>
              <th>Date</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No payments found.
                </td>
              </tr>
            ) : (
              payments.map((pay) => (
                <tr key={pay._id}>
                  <td>{pay.name || 'N/A'}</td>
                  <td>{pay.email || 'N/A'}</td>
                  <td>৳{pay.amount}</td>
                  <td>{format(new Date(pay.date), 'PPP')}</td>
                  <td>{pay.transactionId}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(totalPages).keys()].map((n) => (
            <button
              key={n}
              onClick={() => setPage(n + 1)}
              className={`btn btn-sm ${page === n + 1 ? 'btn-primary' : 'btn-outline'}`}
            >
              {n + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
