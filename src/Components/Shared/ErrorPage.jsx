import React from 'react';

const ErrorPage = () => {
      const navigate=useNavigate()
    const handleGoHome=()=>{
        navigate('/')
    }
    return (
     
        <div className=' flex flex-col justify-baseline items-center text-center  '>
            <div>
                <img src="/assets/404.gif" alt="" />
                <h1 className='text-3xl text-red-500 font-bold'>404-Page-Not-Found</h1>
                <p>opps! The page  you are looking for does not exist</p>
               <div className='my-2 rounded-2xl'>
               <button onClick={handleGoHome} className='bg-emerald-400 text-white p-1 ' >Go Back Home</button> 
               </div>
            </div>
            
        </div>
            

    );
};

export default ErrorPage;