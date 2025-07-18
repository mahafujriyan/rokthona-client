import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxios from '../../Utilities/Axios/UseAxios';
import { AuthContext } from '../../Context/AuthContex';
import Loader from '../../Utilities/Loader';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxios();

  const [formData, setFormData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  // Fetch user info
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then(res => {
        setFormData(res.data);
      });
    }
  }, [user]);

  // Load districts
  useEffect(() => {
    axiosSecure.get("/api/districts").then(res => setDistricts(res.data));
  }, []);

  // Load all upazilas
  useEffect(() => {
    axiosSecure.get("/api/upazilas").then(res => setUpazilas(res.data));
  }, []);

  // Filter upazilas based on district
  useEffect(() => {
    if (formData?.district) {
      const filtered = upazilas.filter(
        u => String(u.district_id) === String(formData.district)
      );
      setFilteredUpazilas(filtered);
    }
  }, [formData?.district, upazilas]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Image upload
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const form = new FormData();
    form.append('image', image);

    try {
      const res = await axiosSecure.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
        form
      );

      if (res.data.success) {
        setFormData(prev => ({ ...prev, avatar: res.data.data.display_url }));
      }
    } catch (err) {
      toast.error("Image upload failed");
    }
  };

  // Save updated data
  const handleSave = async () => {
    try {
      await axiosSecure.put(`/users/${user.email}`, formData);
      toast.success("Profile updated successfully!");
      setEditMode(false);
   
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  // ✅ Show loader while data is not loaded
  if (!formData) return <Loader />;

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Profile</h2>
        {!editMode ? (
          <button onClick={() => setEditMode(true)} className="btn btn-primary btn-sm">
            Edit
          </button>
        ) : (
          <button onClick={handleSave} className="btn btn-success btn-sm">
            Save
          </button>
        )}
      </div>

      <form className="space-y-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          {formData?.avatar && (
            <img
              src={formData.avatar}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover border"
            />
          )}
          {editMode && (
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          )}
        </div>

        <div>
          <label className="label">Name</label>
          <input
            className="input input-bordered w-full"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div>
          <label className="label">Email</label>
          <input
            className="input input-bordered w-full"
            name="email"
            value={formData.email || ''}
            disabled
          />
        </div>

        <div>
          <label className="label">Blood Group</label>
          <select
            className="select select-bordered w-full"
            name="bloodGroup"
            value={formData.bloodGroup || ''}
            onChange={handleChange}
            disabled={!editMode}
          >
            <option value="">Select</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">District</label>
          <select
            className="select select-bordered w-full"
            name="district"
            value={formData.district || ''}
            onChange={handleChange}
            disabled={!editMode}
          >
            <option value="">Select</option>
            {districts.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Upazila</label>
          <select
            className="select select-bordered w-full"
            name="upazila"
            value={formData.upazila || ''}
            onChange={handleChange}
            disabled={!editMode}
          >
            <option value="">Select</option>
            {filteredUpazilas.map(u => (
              <option key={u.id} value={u.name}>{u.name}</option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default Profile;
