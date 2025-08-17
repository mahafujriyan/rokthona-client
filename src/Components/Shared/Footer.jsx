import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
} from 'react-icons/fa';
import Logo from '../Logo';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className=" bg-[#f5bdbd] text-white py-10 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        {/* Logo & Description */}
        <Logo></Logo>


        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-black">
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
          <ul className="space-y-4 text-black">
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

       
        
      </div>

      {/* Social & Bottom */}
      <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
        <div className="flex gap-4 text-white text-xl">
          <a href="https://www.instagram.com/mahafujhr?igsh=Y2p1MmQ1b21tMjNm"><FaInstagram /></a>
          <a href="https://www.facebook.com/share/1JJHToMdZz/"><FaFacebookF /></a>
          <a href="https://x.com/Mhriyan87"><FaTwitter /></a>
          <a href="https://www.linkedin.com/in/mahafujriyan87/"><FaLinkedin /></a>
        </div>
        <p className="text-center text-black">
          Copyright © 2025 Donors, All rights reserved. Present by
          <span className="text-white"> CreedCreatives</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
