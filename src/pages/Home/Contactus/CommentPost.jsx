import React, { useRef } from 'react';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
const CommentPost = () => {
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
        <div className='bg-red-100 p-2 flex flex-col  items-center justify-center my-5'>
            <form ref={form} onSubmit={sendEmail} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input type="text" name="user_name" placeholder="Name" className="w-full p-2 border rounded-md" required />
        </div>

       
         
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input type="tel" name="user_phone" placeholder="Phone" className="w-full p-2 border rounded-md" />
          </div>
    

       

        <div>
          <label className="block text-sm font-medium mb-1">Opinion</label>
          <textarea name="message" placeholder="Send your opinion here" className="w-full p-2 border rounded-md h-28 resize-none " required></textarea>
        </div>

        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
          Send Comment
        </button>
      </form>
        </div>
    );
};

export default CommentPost;