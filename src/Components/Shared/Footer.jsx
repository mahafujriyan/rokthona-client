import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import Logo from '../Logo';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        {/* Logo & Description */}
        <Logo></Logo>


        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <Link to='about' className="hover:text-white cursor-pointer">About Us</Link>
            <li className="hover:text-white cursor-pointer">Events</li>
            <Link to='/contact' className="hover:text-white cursor-pointer">Contact Us</Link>
            <li className="hover:text-white cursor-pointer">Volunteers</li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-red-600" />
              +880 1889359904
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-red-600" />
              rokthona@gmail.com
            </li>
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-red-600 mt-1" />
              Khulna, Dhaka ,Bangladesh
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
          <p className="text-gray-400 mb-4">
            Subscribe to Our Newsletter to receive the newest updates and info.
          </p>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered rounded-r-none w-full bg-white text-black"
            />
            <button className="btn bg-red-600 border-none rounded-l-none text-white">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Social & Bottom */}
      <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
        <div className="flex gap-4 text-white text-xl">
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaYoutube /></a>
        </div>
        <p className="text-center">
          Copyright © 2025 Donors, All rights reserved. Present by
          <span className="text-white"> CreedCreatives</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
