import React, { useContext, useEffect, useState } from 'react';
import Loader from '../../../Utilities/Loader';
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContex';
import { useNavigate, useParams } from 'react-router';

const EditRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [recipients, setRecipients] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [formData, setFormData] = useState({
    recipientName: '',
    recipientDistrict: '',
    recipientUpazila: '',
    donationDate: '',
    donationTime: '',
    bloodGroup: '',
    status: 'pending',
  });

  // Fetch recipients
  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const token = localStorage.getItem('access-token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/recipients`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecipients(res.data);
      } catch (err) {
        console.error('Failed to fetch recipients', err);
      }
    };
    fetchRecipients();
  }, []);

  // Fetch districts
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/districts`);
        setDistricts(res.data);
      } catch (err) {
        console.error('Failed to fetch districts', err);
      }
    };
    fetchDistricts();
  }, []);

  // Fetch upazilas based on selected district
  useEffect(() => {
    if (!formData.recipientDistrict) {
      setUpazilas([]);
      setFormData(prev => ({ ...prev, recipientUpazila: '' }));
      return;
    }
    const fetchUpazilas = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/upazilas/${formData.recipientDistrict}`);
        setUpazilas(res.data);
      } catch (err) {
        console.error('Failed to fetch upazilas', err);
      }
    };
    fetchUpazilas();
  }, [formData.recipientDistrict]);

  // Fetch the donation request
  useEffect(() => {
    if (!user) return;

    const fetchRequest = async () => {
      try {
        const token = localStorage.getItem('access-token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/donation-requests/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!user.email) {
          Swal.fire('Unauthorized', 'User not logged in', 'error');
          return navigate('/dashboard');
        }

        if (res.data.requesterEmail !== user.email) {
          Swal.fire('Unauthorized', 'You cannot edit this request', 'error');
          return navigate('/dashboard');
        }

        setFormData({
          recipientName: res.data.recipientName || '',
          recipientDistrict: res.data.recipientDistrict || '',
          recipientUpazila: res.data.recipientUpazila || '',
          donationDate: res.data.donationDate || '',
          donationTime: res.data.donationTime || '',
          bloodGroup: res.data.bloodGroup || '',
          status: res.data.status || 'pending',
        });

      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to fetch request data', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [user, id, navigate]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'recipientDistrict') {
      setFormData(prev => ({
        ...prev,
        recipientDistrict: value,
        recipientUpazila: '',
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Submit the update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access-token');
      await axios.put(`${import.meta.env.VITE_API_URL}/donation-requests/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire('Success', 'Donation request updated', 'success');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to update request', 'error');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Donation Request</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Recipient Name */}
        <label className="block">
          Recipient Name
          <select
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            required
            className="select select-bordered w-full"
          >
            <option value="">Select Recipient</option>
            {recipients.map(rec => (
              <option key={rec._id} value={rec.name}>
                {rec.name}
              </option>
            ))}
          </select>
        </label>

        {/* District */}
        <label className="block">
          Recipient District
          <select
            name="recipientDistrict"
            value={formData.recipientDistrict}
            onChange={handleChange}
            required
            className="select select-bordered w-full"
          >
            <option value="">Select District</option>
            {districts.map(d => (
              <option key={d._id} value={d._id}>{d.name}</option>
            ))}
          </select>
        </label>

        {/* Upazila */}
        <label className="block">
          Recipient Upazila
          <select
            name="recipientUpazila"
            value={formData.recipientUpazila}
            onChange={handleChange}
            required
            disabled={!formData.recipientDistrict}
            className="select select-bordered w-full"
          >
            <option value="">Select Upazila</option>
            {upazilas.map(u => (
              <option key={u._id} value={u.name}>{u.name}</option>
            ))}
          </select>
        </label>

        {/* Date */}
        <label className="block">
          Donation Date
          <input
            type="date"
            name="donationDate"
            value={formData.donationDate}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </label>

        {/* Time */}
        <label className="block">
          Donation Time
          <input
            type="time"
            name="donationTime"
            value={formData.donationTime}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </label>

        {/* Blood Group */}
        <label className="block">
          Blood Group
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
            className="select select-bordered w-full"
          >
            <option value="">Select Blood Group</option>
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </label>

        <button type="submit" className="btn btn-primary w-full">
          Update Donation Request
        </button>
      </form>
    </div>
  );
};

export default EditRequest;
