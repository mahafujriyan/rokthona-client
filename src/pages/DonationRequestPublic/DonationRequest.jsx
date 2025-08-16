import React, { useEffect, useState } from 'react';
import useAxios from '../../Utilities/Axios/UseAxios';
import { useNavigate } from 'react-router';

const DonationRequest = () => {
     const axiosSecure = useAxios();
  const navigate = useNavigate();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [formData, setFormData] = useState({});

  // ✅ Load user status & district list
  useEffect(() => {
    const fetchData = async () => {
    

      const [ { data: districtList }] = await Promise.all([
  
        axiosSecure.get('/api/districts'),
      ]);


      setDistricts(districtList);
    };

    fetchData().catch(console.error);
  }, []);


  const handleDistrictChange = async (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    setFormData({ ...formData, recipientDistrict: districtId, recipientUpazila: '' });

    const { data } = await axiosSecure.get(`/api/upazilas/${districtId}`);
    setUpazilas(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.post('/donation-requests', {
        ...formData,
      });

      navigate('/dashboard/my-donation-requests');
    } catch (err) {
      console.error('❌ Submission failed:', err);
    }
  };
    return (
        <div className="bg-red-50 p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">🆕 Create Donation Request</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
    
        <input
          type="text"
          placeholder="Recipient Name"
          name="recipientName"
          required
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <select value={selectedDistrict} onChange={handleDistrictChange} className="select select-bordered w-full">
          <option value="">Select District</option>
          {districts.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>

        <select
          value={formData.recipientUpazila || ''}
          name="recipientUpazila"
          onChange={handleChange}
          className="select select-bordered w-full"
          disabled={!upazilas.length}
        >
          <option value="">Select Upazila</option>
          {upazilas.map(u => (
            <option key={u.id} value={u.name}>{u.name}</option>
          ))}
        </select>

        <input
          type="text"
          name="hospitalName"
          placeholder="Hospital Name"
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="address"
          placeholder="Full Address"
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <select
          name="bloodGroup"
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="">Select Blood Group</option>
          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>

        <input
          type="date"
          name="donationDate"
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="time"
          name="donationTime"
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <textarea
          name="requestMessage"
          placeholder="Why do you need the blood?"
          onChange={handleChange}
          className="textarea textarea-bordered w-full md:col-span-2"
        />

        <button type="submit" className="btn btn-primary w-full md:col-span-2">Submit Request</button>
      </form>
    </div>
    );
};

export default DonationRequest;