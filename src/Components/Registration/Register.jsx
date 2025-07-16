
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContex';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { updateProfile } from 'firebase/auth';

const Register = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
const {createUser}=useContext(AuthContext)
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
const navigate=useNavigate()

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

  
  // Handle input change
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle avatar upload to imageBB
const handleImageUpload = async (e) => {
  const image = e.target.files[0];
  const form = new FormData();
  form.append('image', image);

  try {
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
      form
    );

    const data = res.data;
    if (data.success) {
      setFormData(prev => ({ ...prev, avatar: data.data.display_url }));
    } else {
      alert("Failed to upload image");
    }
  } catch (err) {
    console.error("Image upload failed", err);
  }
};



const handleSubmit = async (e) => {
  e.preventDefault();

  const { password, confirmPassword, name, avatar, email } = formData;

  if (password !== confirmPassword) {
    return alert("Passwords do not match");
  }

  const minLength = /.{6,}/;
  const hasUppercase = /[A-Z]/;
  const hasLowercase = /[a-z]/;
  const hasNumber = /[0-9]/;

  if (
    !minLength.test(password) ||
    !hasUppercase.test(password) ||
    !hasLowercase.test(password) ||
    !hasNumber.test(password)
  ) {
    return toast.error('Password must be 6+ characters, include uppercase, lowercase and number.');
  }

  try {
    const res = await createUser(email, password);

    // ✅ Ensure avatar is available
    if (avatar) {
      await updateProfile(res.user, {
        displayName: name,
        photoURL: avatar,
      });
    }

    const newUser = {
      ...formData,
      role: "donor",
      status: "active",
    };

    toast.success('Registration successful!');
    navigate('/');
    console.log("User registered successfully:", newUser);

  } catch (error) {
    console.error("Error creating user:", error);
    toast.error(error.message || 'Registration failed.');
  }
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
{/* Password */}
<label className="form-control">
  <span className="label-text">Password</span>
  <div className="relative">
    <input
      type={showPassword ? 'text' : 'password'}
      name="password"
      value={formData.password}
      onChange={handleChange}
      className="input input-bordered w-full pr-10"
      required
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute top-3 right-3 text-xl"
    >
      {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
    </button>
  </div>
</label>

{/* Confirm Password */}
<label className="form-control">
  <span className="label-text">Confirm Password</span>
  <div className="relative">
    <input
      type={showConfirmPassword ? 'text' : 'password'}
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={handleChange}
      className="input input-bordered w-full pr-10"
      required
    />
    <button
      type="button"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      className="absolute top-3 right-3 text-xl"
    >
      {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
    </button>
  </div>
</label>


       
        <button type="submit" className="btn btn-primary w-full">Register</button>
      </form>
        <p>Do you already have an account? Please <Link  to='/logIn'><span className='text-red-400'>LogIn</span></Link> </p>
    </div>
  );
};

export default Register;
