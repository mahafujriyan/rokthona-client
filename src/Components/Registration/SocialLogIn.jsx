import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContex';
import useAxios from '../../Utilities/Axios/UseAxios';

const SocialLogIn = () => {
           const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const axiosSecure = useAxios();

  const handleGoogleSignIn = () => {
    googleLogin()
      .then(async (result) => {
        const user = result.user;
        const token = await user.getIdToken();
        localStorage.setItem('access-token', token); // ensures axiosSecure uses it

        const userInfo = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: 'donor', 
        };
        console.log('📤 Sending user info to DB:', userInfo);


        try {
          // Save user to backend
          await axiosSecure.post('/users', userInfo);
          console.log('User saved to DB');
        } catch (err) {
          if (err.response?.status === 409) {
            console.log('User already exists in DB');
          } else {
            console.error('Error saving user to DB:', err);
          }
        }

        navigate(from);
      })
      .catch(error => {
        console.error('Google Login Error:', error);
      });
  };

 
    return (
        <div className='text-center'>
            <p className='mb-4'>OR</p>
            <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogIn;