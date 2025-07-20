import React, { useEffect, useState } from 'react';
import useAxios from '../../../Utilities/Axios/UseAxios';
import { useNavigate, useParams } from 'react-router';


const EditRequest = () => {
 const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxios();

  const [formData, setFormData] = useState({
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    donationDate: "",
    donationTime: "",
    bloodGroup: "",
  });

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  useEffect(() => {
    // Load existing donation data
    axiosSecure.get(`/donations/${id}`).then((res) => {
      const data = res.data;
      setFormData(data);
      if (data.recipientDistrict) {
        fetchUpazilas(data.recipientDistrict);
      }
    });

    // Load districts
    axiosSecure.get("/api/districts").then((res) => setDistricts(res.data));
  }, [id]);

  const fetchUpazilas = (districtId) => {
    axiosSecure.get(`/api/upazilas/${districtId}`).then((res) =>
      setUpazilas(res.data)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "recipientDistrict") {
      setFormData((prev) => ({ ...prev, recipientUpazila: "" }));
      fetchUpazilas(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   await axiosSecure.patch(`/donation-data/${id}/status`, { status: "inprogress" });

    navigate("/dashboard"); 
  };

  return (
   <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Edit Donation Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            className="input input-bordered w-full"
            value={formData.recipientName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">District</label>
          <select
            name="recipientDistrict"
            className="select select-bordered w-full"
            value={formData.recipientDistrict}
            onChange={handleChange}
            required
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label">Upazila</label>
          <select
            name="recipientUpazila"
            className="select select-bordered w-full"
            value={formData.recipientUpazila}
            onChange={handleChange}
            required
          >
            <option value="">Select Upazila</option>
            {upazilas.map((upazila) => (
              <option key={upazila.id} value={upazila.name}>
                {upazila.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label">Donation Date</label>
          <input
            type="date"
            name="donationDate"
            className="input input-bordered w-full"
            value={formData.donationDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">Donation Time</label>
          <input
            type="time"
            name="donationTime"
            className="input input-bordered w-full"
            value={formData.donationTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">Blood Group</label>
          <select
            name="bloodGroup"
            className="select select-bordered w-full"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className=" btn btn-success w-full mt-4">
          Update Donation Request
        </button>
      </form>
    </div>
  );
};

export default EditRequest;