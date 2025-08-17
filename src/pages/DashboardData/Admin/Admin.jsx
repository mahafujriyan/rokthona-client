import React from 'react';
import useAxios from '../../../Utilities/Axios/UseAxios';
import { useQuery } from '@tanstack/react-query';
import { FaHandHoldingUsd, FaTint, FaUserFriends } from 'react-icons/fa';
import DonorPieChart from '../../PieChart/DonorPieChart';



const Admin = () => {
     const axiosSecure = useAxios();

  const { data: stats = {} } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/stats');
      return res.data;
    }
  });
      return (
   <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Welcome Admin 🎉</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <FaUserFriends className="text-4xl text-blue-500 mx-auto" />
          <h3 className="text-2xl font-bold mt-2">{stats.totalUsers || 0}</h3>
          <p className="text-gray-600">Total Donors</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <FaHandHoldingUsd className="text-4xl text-green-500 mx-auto" />
          <h3 className="text-2xl font-bold mt-2">{stats.totalFunding?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h3>
          <p className="text-gray-600">Total Funding</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <FaTint className="text-4xl text-red-500 mx-auto" />
          <h3 className="text-2xl font-bold mt-2">{stats.totalRequests || 0}</h3>
          <p className="text-gray-600">Blood Requests</p>
        </div>
      </div>
   <div className='my-7'>
   <DonorPieChart></DonorPieChart>
   </div>
    </div>
  );
};

export default Admin;