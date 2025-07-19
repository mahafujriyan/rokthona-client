import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContex';
import { sendPasswordResetEmail } from 'firebase/auth';
import auth from '../../firebase/firebase.config';
import { Link, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SocialLogIn from './SocialLogIn';

const LogIn = () => {
     const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { singInUser } = useContext(AuthContext);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      await singInUser(formData.email, formData.password);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Login failed!');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast.error('Please enter your email first');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, formData.email);
      toast.success('Password reset email sent!');
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
      console.error('Reset error:', error);
    }
  };
    return (
       <div className="max-w-md mx-auto p-4 border shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email */}
        <div>
          <label className="label-text">Email</label>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full"
            onChange={handleChange}
            value={formData.email}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="label-text">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="input input-bordered w-full pr-10"
              onChange={handleChange}
              value={formData.password}
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
            </span>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-blue-500 hover:underline text-sm"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <Link to="/singUp">
          <span className="text-red-400 hover:underline">Register</span>
        </Link>
      </p>
      <SocialLogIn></SocialLogIn>
    </div>
    );
};

export default LogIn;