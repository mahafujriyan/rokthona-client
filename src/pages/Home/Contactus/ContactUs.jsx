import emailjs from '@emailjs/browser';
import React, { useRef } from 'react';
import toast from 'react-hot-toast';
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaFacebookF, FaTwitter,  FaLinkedin } from 'react-icons/fa';

const ContactUs = () => {

     const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_wz4tuji',
      'template_27e2i1e',
      form.current,
      '7elnCipkhAcKC1BBV'
    )
    .then(
      (result) => {
        toast.success('Message sent successfully!');
        form.current.reset();
      },
      (error) => {
        toast.error('Failed to send message, please try again.');
        console.error(error.text);
      }
    );
  };
    return (

     <div className='bg-red-50 rounded-2xl'>
      <div className='my-4  '>
        <h1 className='text-5xl text-center text-red-500'>Contact Us </h1>
            <div className="grid md:grid-cols-2 gap-8 p-8  rounded-lg shadow-lg">
      
      {/* Left side - Info */}
      <div>
        <p className="text-red-600 font-medium">Get in Touch</p>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-[hsl(var(--t2))]">
          Have Questions About Blood Donation? Let's Chat!
        </h2>
        <p className="text-gray-700 mb-6">
          We're here to help you with any information about blood donation. Whether you're a first-time donor or need guidance, feel free to contact us!
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-4 bg-red-100 p-4 rounded-md w-fit">
            <FaPhoneAlt className="text-red-600 text-xl" />
            <div>
              <p className="text-sm text-gray-600">Call Us</p>
              <p className="font-semibold text-[hsl(var(--t1))]">+88 01889359904</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-red-100 p-4 rounded-md w-fit">
            <FaEnvelope className="text-red-600 text-xl" />
            <div>
              <p className="text-sm text-gray-600">Email Us</p>
              <p className="font-semibold text-[hsl(var(--t1))]">rkthona@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-2 font-medium">Find Us On:</p>
          <div className="flex gap-4 text-[hsl(var(--t1))]">
            <a href="https://www.instagram.com/mahafujhr?igsh=Y2p1MmQ1b21tMjNm" className="bg-red-600 p-2 rounded">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/share/1JJHToMdZz/" className="bg-red-600 p-2 rounded">
              <FaFacebookF />
            </a>
            <a href="https://x.com/Mhriyan87" className="bg-red-600 p-2 rounded">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com/in/mahafujriyan87/" className="bg-red-600 p-2 rounded">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

   
    {/* Right Side - Form */}
      <form ref={form} onSubmit={sendEmail} className="space-y-4 text-[hsl(var(--t1))]">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input type="text" name="user_name" placeholder="Name" className="w-full p-2 border rounded-md text-[hsl(var(--t2))] " required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" name="user_email" placeholder="Email" className="w-full p-2 border rounded-md" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Telephone</label>
            <input type="tel" name="user_phone" placeholder="Telephone" className="w-full p-2 border rounded-md" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input type="text" name="subject" placeholder="Subject" className="w-full p-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message/Question</label>
          <textarea name="message" placeholder="Ask your question here" className="w-full p-2 border rounded-md h-28 resize-none" required></textarea>
        </div>

        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
          Send Message
        </button>
      </form>
    </div>
     </div>
     </div>
    );
};

export default ContactUs;