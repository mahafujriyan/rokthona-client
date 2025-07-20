import React from 'react';
import CheckOutBox from './CheckOutBox';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const CreatePayment = () => {
     const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    return (
       <div className="container mx-auto px-4 py-6 max-w-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Give Fund</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <Elements stripe={stripePromise}>
          <CheckOutBox />
        </Elements>
      </div>
    </div>
    );
};

export default CreatePayment;