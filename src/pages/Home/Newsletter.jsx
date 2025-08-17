import React from 'react';

const Newsletter = () => {
    return (
       <div className='bg-red-50 p-5 rounded-2xl'>
                 <h3 className="text-xl font-semibold mb-4 text-[hsl(var(--t1))]">Newsletter</h3>
                 <p className="text-black mb-4">
                   Subscribe to Our Newsletter to receive the newest updates and info.
                 </p>
                 <div className="flex gap-2 items-center">
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
    );
};

export default Newsletter;