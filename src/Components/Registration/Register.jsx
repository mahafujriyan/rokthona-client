
import React, { useEffect, useState } from 'react';

const Register = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    avatar: '',
    bloodGroup: '',
    district: '',
    upazila: '',
    password: '',
    confirmPassword: '',
  });

  // Load districts
  useEffect(() => {
    fetch('/district.json')
      .then(res => res.json())
      .then(data => setDistricts(data));
  }, []);

  // Load all upazilas once
  useEffect(() => {
    fetch('/upzila.json')
      .then(res => res.json())
      .then(data => setUpazilas(data));
  }, []);

 

 useEffect(() => {
  if (formData.district) {
    const upazilasForDistrict = upazilas.filter(
      u => String(u.district_id) === String(formData.district)
    );
    setFilteredUpazilas(upazilasForDistrict);
  } else {
    setFilteredUpazilas([]);
  }
}, [formData.district, upazilas]);

   console.log(setFilteredUpazilas)
  // Handle input change
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle avatar upload to imageBB
  const handleImageUpload = async e => {
    const image = e.target.files[0];
    const form = new FormData();
    form.append('image', image);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=YOUR_IMAGEBB_API_KEY`, {
      method: 'POST',
      body: form,
    });

    const data = await res.json();
    if (data.success) {
      setFormData(prev => ({ ...prev, avatar: data.data.url }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    const user = {
      ...formData,
      role: 'donor',
      status: 'active',
    };

    console.log('Submitting user:', user);
    // 🔒 Submit user to backend here
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" placeholder="Email" required className="input input-bordered w-full" onChange={handleChange} />
        <input type="text" name="name" placeholder="Name" required className="input input-bordered w-full" onChange={handleChange} />

        {/* Avatar */}
        <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input file-input-bordered w-full" />
        {formData.avatar && <img src={formData.avatar} alt="avatar" className="h-16 w-16 rounded-full mt-2" />}

        {/* Blood Group */}
        <select name="bloodGroup" className="select select-bordered w-full" required onChange={handleChange}>
          <option value="">Select blood group</option>
          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>

        {/* District */}
        
      <select
  name="district"
  className="select select-bordered w-full"
  required
  value={formData.district}
  onChange={handleChange}
>
  <option value="">Select district</option>
  {districts.map(d => (
    <option key={d.id} value={d.id}>{d.name}</option> 
  ))}
</select>


        {/* Upazila */}
      <select
        name="upazila"
        className="select select-bordered w-full"
        required
        value={formData.upazila}
        onChange={handleChange}
      >
        <option value="">Select upazila</option>
        {filteredUpazilas.map(u => (
       
          <option key={u.id} value={u.name}>{u.name}</option>
        ))}
        </select>


        <input type="password" name="password" placeholder="Password" required className="input input-bordered w-full" onChange={handleChange} />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" required className="input input-bordered w-full" onChange={handleChange} />

        <button type="submit" className="btn btn-primary w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;
